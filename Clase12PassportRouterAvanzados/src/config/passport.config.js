import passport from 'passport';
import local from 'passport-local';
import UserManager from '../dao/mongo/UserManager.js';
import auth from '../service/auth.js';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { cookieExtractor } from '../utils.js';

const usersService = new UserManager();
const LocalStrategy = local.Strategy;

const initializePassportStrategies = () =>{

    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:'email',session:false},async(req,email,password,done)=>{
        const {firstName, lastName} = req.body;
        //Validamos que venga con nombre
        if(!firstName||!lastName) return done(null,false,{message:'Incomplete values'});

        //Primero, revisamos que el usuario no exista ya
        const exists = await usersService.getBy({email});
        if(exists) return done(null,false,{message:'User already exists'});

        //Si el usuario no existe, es seguro crearlo
        const hashedPassword = await auth.createHash(password);
        const newUser = {
            firstName,
            lastName,
            email,
            password:hashedPassword
        }
        const result = await usersService.create(newUser);
        done(null,result);
    }));

    passport.use('login', new LocalStrategy({usernameField:'email', session:false},async(email,password,done)=>{
        //Contrario al registro, aquí sí nos interesa que el usuario exista.
        const user = await usersService.getBy({email});
        if(!user) return done(null,false,{message:'Incorrect Credentials'});
        /**
         * Una vez que sabemos que el usuario sí existe, es importante saber
         * que la contraseña también coincide, debido a que no podemos hacer
         * un descifrado al hash, procedemos a comparar.
         */
        const isValidPassword = await auth.validatePassword(password,user.password);
        if(!isValidPassword) return done(null,false,{message:'Incorrect Credentials'});
        done(null,user);
    }));

    passport.use('jwt',new Strategy({
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey:'jwtSecret'
    },async(payload, done)=>{
        return done(null,payload)
    }))

}

export default initializePassportStrategies;