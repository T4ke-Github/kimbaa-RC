import express from 'express';
import "express-async-errors"; // needs to be imported before routers and other stuff!


import cors from 'cors';
import { loginRouter } from './routes/loginRoute';
import { modulRouter } from './routes/modulRoute';
import { userDetailsRouter } from './routes/UserDetailsRoute';
import { userRouter } from './routes/userRout';
import { antragZulassungRouter } from './routes/antragZulassungRoute';





const app = express();

// Middleware:

const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://kimbaa.local:3000/' , 'http://localhost:8081/*', 'http://127.0.0.1:8081/', '*'];

app.use(cors({
    origin: function(origin, callback){
      // erlaubt Anfragen ohne Ursprung (wie mobile Apps oder curl-Anfragen)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'Die CORS-Richtlinie für diese Site erlaubt keinen Zugriff von der angegebenen Ursprung.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
}));
app.use('*', express.json()) //


// Routes
app.use("/api/login", loginRouter)
app.use("/api/user", userRouter)
app.use("/api/modul", modulRouter)
app.use("/api/userdetails", userDetailsRouter)
app.use("/api/antragZulassung", antragZulassungRouter)

export default app;