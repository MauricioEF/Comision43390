import BaseRouter from "./BaseRouter.js";
import VideoGamesManager from "../dao/mongo/managers/VideogamesManager.js";
import { getValidFilters } from "../utils.js";

const videogamesService = new VideoGamesManager();

class ViewsRouter extends BaseRouter {
    init(){

        this.get('/register',['NO_AUTH'],async(req,res)=>{
            res.render('Register');
        })
        this.get('/login',['NO_AUTH'],async(req,res)=>{
            res.render('Login');
        })
        this.get('/profile',['AUTH'],async(req,res)=>{
            res.render('Profile');
        })

        this.get('/',['PUBLIC'],async(req,res)=>{
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

        this.get('/videogames/:vid',['PUBLIC'],async(req,res)=>{
            const {vid} = req.params;
            const videogame = await videogamesService.getVideogameBy({_id:vid});
            if(!videogame) return res.render('VideogameNotFound');
            res.render('GameDetails',{videogame,css:'GameDetails'})
        })
    }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();