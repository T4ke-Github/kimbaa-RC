import dotenv from "dotenv";
dotenv.config(); // read ".env"

import http from "http";
import https from "https";
import { readFile } from "fs/promises";
import mongoose from 'mongoose';
import app from "./app";
import { configureCORS } from './configCORS';

async function setup() {
    let mongodURI = process.env.DB_CONNECTION_STRING;
    if (!mongodURI) {
        console.error(`Cannot start, no database configured. Set environment variable DB_CONNECTION_STRING. Use "memory" for MongoMemoryServer`);
        process.exit(1);
    }
    if (mongodURI === "memory") {
        console.info("Start MongoMemoryServer");
        const MMS = await import('mongodb-memory-server');
        const mongo = await MMS.MongoMemoryServer.create();
        mongodURI = mongo.getUri();
    }

    console.info(`Connect to mongod at ${mongodURI}`);
    await mongoose.connect(mongodURI);

    configureCORS(app);

    const useSSL = process.env.USE_SSL === 'true';
    const httpsPort = process.env.HTTPS_PORT ? parseInt(process.env.HTTPS_PORT) : 3443;
    const httpPort = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3000;

    if (useSSL) {
        if (!process.env.SSL_KEY_FILE || !process.env.SSL_CRT_FILE) {
            console.error('SSL key or certificate file path is not set. Please set SSL_KEY_FILE and SSL_CRT_FILE environment variables.');
            process.exit(1);
        }

        try {
            const [privateSSLKey, publicSSLCert] = await Promise.all([
                readFile(process.env.SSL_KEY_FILE),
                readFile(process.env.SSL_CRT_FILE)
            ]);

            const httpsServer = https.createServer({ key: privateSSLKey, cert: publicSSLCert }, app);
            httpsServer.listen(httpsPort, () => {
                console.log(`Listening for HTTPS at https://localhost:${httpsPort}`);
            });
        } catch (error) {
            console.error('Failed to read SSL key or certificate file:', error);
            process.exit(1);
        }
    } else {
        const httpServer = http.createServer(app);
        httpServer.listen(httpPort, () => {
            console.log(`Listening for HTTP at http://localhost:${httpPort}`);
        });
    }
}

setup().catch(error => {
    console.error('Failed to set up the server:', error);
    process.exit(1);
});
