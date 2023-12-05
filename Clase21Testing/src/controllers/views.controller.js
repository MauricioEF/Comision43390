import jwt from 'jsonwebtoken';
import { getValidFilters } from "../utils.js";
import { videogamesService } from "../services/repositories.js";
import config from '../config/config.js';

const register = async(req,res)=>{
    res.render('Register');
}

const login = async(req,res)=>{
    res.render('Login');
}

const profile = async(req,res)=>{
    res.render('Profile');
}

const home = async(req,res)=>{
    let {page=1,limit=5,sort,order=1,...filters} = req.query;
    const cleanFilters = getValidFilters(filters,'videogame')
    console.log(cleanFilters);
    let sortResult = {}
    if(sort) {
        sortResult[sort]=order
    }
    const pagination = await videogamesService.paginateVideogames(cleanFilters,{page,lean:true,limit,sort:sortResult})
    
    console.log(pagination);

    res.render('Home',{
        css:'Home',
        videogames:pagination.docs,
        hasNextPage:pagination.hasNextPage,
        hasPrevPage:pagination.hasPrevPage,
        nextPage:pagination.nextPage,
        prevPage:pagination.prevPage,
        page: pagination.page
    })
}

const videogameDetails = async(req,res)=>{
    const {vid} = req.params;
    const videogame = await videogamesService.getVideogameBy({_id:vid});
    if(!videogame) return res.render('VideogameNotFound');
    res.render('GameDetails',{videogame,css:'GameDetails'})
}

const passwordRestore = async(req, res) => {
    const {token} = req.query;
    if(!token) return res.render('RestorePasswordError',{error:'Ruta inválida, favor de solicitar un nuevo link de restablecimiento'});
    //El hecho de que me pase un token, NO SIGNIFICA QUE YA SEA VÁLIDO, falta corroborar:
    //1. ¿El token está expirado?
    //2. ¿El token siquiera es válido?
    try{
        jwt.verify(token,config.jwt.SECRET);
        res.render('PasswordRestore');
    }catch(error){
        console.log(error);
        console.log(Object.keys(error));
        if(error.expiredAt){
            return res.render('RestorePasswordError',{error:"El link de este correo expiró, favor de solicitar un nuevo correo"});
        }
        res.render('RestorePasswordError',{error:'Link inválido o corrupto, favor de solicitar un nuevo correo'});
    }
}

export default {
    home,
    login,
    passwordRestore,
    profile,
    register,
    videogameDetails
}