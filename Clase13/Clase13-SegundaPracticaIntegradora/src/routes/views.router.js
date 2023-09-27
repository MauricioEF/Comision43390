import { Router } from "express";
import VideoGamesManager from "../dao/mongo/managers/VideogamesManager.js";
import { getValidFilters } from "../utils.js";


const router = Router();
const videogamesService = new VideoGamesManager();

router.get('/register',async(req,res)=>{
    res.render('Register');
})

router.get('/login',async(req,res)=>{
    res.render('Login');
})

router.get('/profile',async(req,res)=>{
    res.render('Profile');
})

router.get('/',async(req,res)=>{
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
})

export default router;