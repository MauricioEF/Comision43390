import express from 'express';
import mongoose from 'mongoose';
import Handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import videogamesRouter from './routes/videogames.router.js';
import viewsRouter from './routes/views.router.js';
import librariesRouter from './routes/libraries.router.js';

import librarySetter from './middlewares/librarySetter.js';
import __dirname from './utils.js';

const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

const connection = mongoose.connect("MONGO_URL");

app.engine('handlebars',Handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(librarySetter);


app.use('/',viewsRouter);
app.use('/api/videogames',videogamesRouter);
app.use('/api/libraries',librariesRouter);