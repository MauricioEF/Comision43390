import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import MailerService from '../services/MailerService.js';
import DMailTemplates from '../constants/DMailTemplates.js';
import UserDTO from '../dto/User/User.js';


const register = async(req,res)=>{
    try{
    //Enviar un correo de bienvenida
    const mailService = new MailerService();
    const result = await mailService.sendMail([req.user.email],DMailTemplates.WELCOME,{user:req.user})
    }catch(error){
        console.log(`Falló envío de correo para ${req.user.email}`)
    }

    res.clearCookie('library');
    res.sendSuccess('Registered');
}

const login = async(req,res)=>{
    const tokenizedUser = UserDTO.getTokenDTOFrom(req.user);
    const token = jwt.sign(tokenizedUser,config.jwt.SECRET,{expiresIn:'1d'});
    res.cookie(config.jwt.COOKIE,token);
    res.clearCookie('library');
    res.sendSuccess('Logged In');
}

const applyGoogleCallback = async (req,res)=>{
    try{
        //Enviar un correo de bienvenida
        const mailService = new MailerService();
        const result = await mailService.sendMail([req.user.email],DMailTemplates.WELCOME,{user:req.user})
        }catch(error){
            console.log(`Falló envío de correo para ${req.user.email}`)
    }
    const tokenizedUser = UserDTO.getTokenDTOFrom(req.user);
    const token = jwt.sign(tokenizedUser,config.jwt.SECRET,{expiresIn:'1d'});
    res.cookie(config.jwt.COOKIE,token);
    res.clearCookie('library');
    res.sendSuccess('Logged In');
}


const current = async(req,res)=>{
    console.log(req.user);
    res.sendSuccessWithPayload(req.user);
}

export default {
    applyGoogleCallback,
    current,
    login,
    register
}