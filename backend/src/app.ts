import express from 'express';
import "express-async-errors"; // needs to be imported before routers and other stuff!


import cors from 'cors';
import { userRouter } from './routes/userRout';
import { loginRouter } from './routes/loginRoute';
import { modulRouter } from './routes/modulRoute';





const app = express();

// Middleware:

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = ['127.0.0.1:3000', 'localhost:3000'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}));
app.use('*', express.json()) //


// Routes
app.use("/api/login", loginRouter)   
app.use("/api/user", userRouter)
app.use("/api/modul", modulRouter)

export default app;