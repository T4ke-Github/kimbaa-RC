import express from 'express';
import "express-async-errors"; // needs to be imported before routers and other stuff!
import cookieParser from 'cookie-parser';

import { loginRouter } from './routes/loginRoute';
import { modulRouter } from './routes/modulRoute';
import { userDetailsRouter } from './routes/userDetailsRoute';
import { userRouter } from './routes/userRout';
import { antragZulassungRouter } from './routes/antragZulassungRoute';
import { antragAnlage2Router } from './routes/antragAnlage2Route';
import { logger } from './logger/serviceLogger';
import { configureCORS } from './../src/configCORS';


const app = express();
configureCORS(app);
// Middleware:
app.use('*', express.json())
app.use(cookieParser())

// Routes
app.use("/api/login", loginRouter)
app.use("/api/user", userRouter)
app.use("/api/modul", modulRouter)
app.use("/api/userdetails", userDetailsRouter)
app.use("/api/antragZulassung", antragZulassungRouter)
app.use("/api/antragAnlage2", antragAnlage2Router)

export default app;
