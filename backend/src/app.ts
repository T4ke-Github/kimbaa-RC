import express from 'express';
import "express-async-errors"; // needs to be imported before routers and other stuff!

import cors from 'cors';
import { userRouter } from '../src/routes/user';
import { loginRouter } from '../src/routes/login';
import bodyParser from 'body-parser';


const FRONTEND_PORT: number = parseInt(process.env.FRONTEND_PORT || '3000');
const FRONTEND_URL: string = process.env.FRONTEND_URL || 'http://localhost';
const app = express();

// Middleware:
app.use(cors({
    origin: FRONTEND_URL + ':' + FRONTEND_PORT,
}));
app.use('*', express.json()) //
app.use(bodyParser.json())

// Routes
app.use("/api/login", loginRouter)
app.use("/api/user", userRouter)

export default app;