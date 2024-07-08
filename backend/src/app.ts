// app.ts
import express from 'express';
import "express-async-errors"; // needs to be imported before routers and other stuff!
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { loginRouter } from './routes/loginRoute';
import { modulRouter } from './routes/modulRoute';
import { userDetailsRouter } from './routes/userDetailsRoute';
import { userRouter } from './routes/userRoute';
import { antragZulassungRouter } from './routes/antragZulassungRoute';
import { healthRouter } from './routes/healthRoute';
import { logger } from './logger/serviceLogger';
import { configureCORS } from './configCORS';

// Laden der Umgebungsvariablen aus der .env Datei
dotenv.config();

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const FPORT = process.env.FRONTEND_PORT || '3000';

export const FRONTEND_URL = 'http://' + HOSTNAME + ':' + FPORT;

logger.info('Using ' + FRONTEND_URL);

const app = express();

// CORS muss ganz oben:
configureCORS(app);

// Middleware:
app.use('*', express.json());
app.use(cookieParser());

// Testroute zum Setzen und Lesen von Cookies
app.get('/test', (req, res) => {
    res.cookie('test_cookie', 'cookie_value', { httpOnly: true, secure: process.env.USE_SSL === 'true' });
    const cookie = req.cookies['test_cookie'];
    res.json({ message: 'Test route working', cookie: cookie });
});

// Routes
app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);
app.use("/api/modul", modulRouter);
app.use("/api/userdetails", userDetailsRouter);
app.use("/api/antragZulassung", antragZulassungRouter);
app.use("/api/health", healthRouter);

export default app;
