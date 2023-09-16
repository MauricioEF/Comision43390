import express from 'express';
import Handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';


import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import initializeStrategies from './config/passport.config.js';
import __dirname from './utils.js';

const app = express();

app.use(session({
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://coderUser:123@cluster0.cp6cenm.mongodb.net/PruebaLogin?retryWrites=true&w=majority",
        ttl:3600
    }),
    resave:false,
    saveUninitialized:false,
    secret:'papa'
}))

initializeStrategies();
app.use(passport.initialize());

const connection = mongoose.connect("mongodb+srv://coderUser:123@cluster0.cp6cenm.mongodb.net/PruebaLogin?retryWrites=true&w=majority")

app.use(express.static(`${__dirname}/public`))
app.use(express.json());

app.engine('handlebars',Handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

const PORT = process.env.PORT || 8080;

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`));