/* istanbul ignore file */

import dotenv from "dotenv";
dotenv.config() // read ".env"

import http from "http";
import mongoose from 'mongoose';
import app from "./app";
import sdk from "./instrumentation"
import { logger } from "./logger"
import { prefillDB } from "./prefill";
//import { prefillDB } from "./prefill";

async function setup() {

    let mongodURI = (process.env.DB_CONNECTION_STRING || "memory");
    if (mongodURI = "memory"){
        logger.info("Start MongoMemoryServer")
        const MMS = await import('mongodb-memory-server')
        const mongo = await MMS.MongoMemoryServer.create();
        mongodURI = mongo.getUri();
    }

    logger.info(`Connect to mongod at ${mongodURI}`)
    await mongoose.connect(mongodURI);

    if (process.env.DB_PREFILL==="true") {
        await prefillDB();
    }

    const port = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3000;
    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        logger.info(`Listening for HTTP at http://localhost:${port}`);
    });

    sdk.start();
};

setup();