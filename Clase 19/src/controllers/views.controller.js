import { getValidFilters } from "../utils.js";
import { videogamesService } from "../services/repositories.js";

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

export default {
    home,
    login,
    profile,
    register,
    videogameDetails
}