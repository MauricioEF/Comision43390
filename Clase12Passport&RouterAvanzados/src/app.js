import express from 'express';
import Handlebars from 'express-handlebars';

import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect("MONGO URL")

app.engine('handlebars',Handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))