import express from 'express';
import "express-async-errors"; // needs to be imported before routers and other stuff!
import cors from 'cors';
import { userRouter } from '../src/routes/user';
import { loginRouter } from '../src/routes/login';
import bodyParser from 'body-parser';




const app = express();

// Middleware:
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
}));
app.use('*', express.json()) //
app.use(bodyParser.json())

// Routes
app.use("/api/login", loginRouter)   
app.use("/api/user", userRouter)

export default app;