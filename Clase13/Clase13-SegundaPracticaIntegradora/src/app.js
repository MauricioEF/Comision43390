import express from 'express';
import mongoose from 'mongoose';
import Handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import videogamesRouter from './routes/VideogamesRouter.js';
import viewsRouter from './routes/ViewsRouter.js';
import librariesRouter from './routes/LibrariesRouter.js';
import SessionsRouter from './routes/SessionsRouter.js';

import __dirname from './utils.js';
import config from './config/config.js';
import initializePassportStrategies from './config/passport.config.js';


const app = express();

const PORT = config.app.PORT;

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
const connection = mongoose.connect(config.mongo.URL);

app.engine('handlebars',Handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

initializePassportStrategies();

app.use('/',viewsRouter);
app.use('/api/videogames',videogamesRouter);
app.use('/api/libraries',librariesRouter);
app.use('/api/sessions',SessionsRouter);