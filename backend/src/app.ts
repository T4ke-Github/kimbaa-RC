import express from 'express';
import "express-async-errors"; // needs to be imported before routers and other stuff!

import { userRouter } from '../src/routes/user';


const app = express();

// Middleware:
app.use('*', express.json()) //

// Routes
//app.use("/api/login", loginRouter)   // wird erst später implementiert, hier nur Dummy; hat aber bereits einen Präfix

// TODO: Registrieren weiterer Router:
app.use("/api/user", userRouter)

export default app;