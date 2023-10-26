import BaseRouter from './BaseRouter.js';
import LibrariesManager from '../dao/mongo/managers/LibrariesManager.js';
import VideoGamesManager from "../dao/mongo/managers/VideogamesManager.js";

const librariesService = new LibrariesManager();
const videogamesService = new VideoGamesManager();

class LibrariesRouter extends BaseRouter {
    init(){
        this.get('/:lid',['USER'],async(req,res)=>{
            const {lid} = req.params;
            const library = await librariesService.getLibraryBy({_id:lid});
            if(!library) return res.status(404).send({status:"error",error:"Library not found"});
            res.send({status:"success",payload:library})
        })
        this.post('/',['ADMIN'],async(req,res)=>{
            const result = await librariesService.createLibrary();
            res.send({status:"success",payload:result._id});
        })
        this.put('/:lid/videogames/:vid',['NO_AUTH'],async(req,res)=>{
            const {lid,vid} = req.params;
            const library = await librariesService.getLibraryBy({_id:lid});
            if(!library) return res.status(400).send({status:"error",error:"Library doesn't exist"});
            const videogame = await videogamesService.getVideogameBy({_id:vid});
            if(!videogame) return res.status(400).send({status:"error",error:"Videogame doesn't exist"})
            const videogameExistsInLibrary = library.videogames.find(item=>{
                return item.videogame.toString() === vid;
            })
            if(videogameExistsInLibrary) return res.status(400).send({status:"error",error:"Videogame is Already in library"});
            library.videogames.push({
                videogame:vid,
                added:new Date().toISOString()
            })
            await librariesService.updateLibrary(lid,{videogames:library.videogames});
            res.send({status:"success",message:"Videogame Added"})
        })
        this.put('/videogames/:vid',['USER'],async(req,res)=>{
            const {vid} = req.params;
            const library = await librariesService.getLibraryBy({_id:req.user.library});
            if(!library) return res.status(400).send({status:"error",error:"Library doesn't exist"});
            const videogame = await videogamesService.getVideogameBy({_id:vid});
            if(!videogame) return res.status(400).send({status:"error",error:"Videogame doesn't exist"})
            const videogameExistsInLibrary = library.videogames.find(item=>{
                return item.videogame.toString() === vid;
            })
            if(videogameExistsInLibrary) return res.status(400).send({status:"error",error:"Videogame is Already in library"});
            library.videogames.push({
                videogame:vid,
                added:new Date().toISOString()
            })
            await librariesService.updateLibrary(req.user.library,{videogames:library.videogames});
            res.send({status:"success",message:"Videogame Added"})
        })
    }
}

const librariesRouter = new LibrariesRouter();

export default librariesRouter.getRouter();