import express from 'express';
import Handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';


import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js';
import dictionaryRouter from './routes/dictionary.router.js';
import petsRouter from './routes/pet.router.js';
import ultimateSessionsRouter from './routes/SessionsRouter.js';

import initializePassportStrategies from './config/passport.config.js';
import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect("MONGO URL")

app.engine('handlebars',Handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(cookieParser());

app.use('/',viewsRouter);
app.use('/api/sessions',ultimateSessionsRouter);
app.use('/api/dictionary',dictionaryRouter);
app.use('/api/pets',petsRouter);

initializePassportStrategies()

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))