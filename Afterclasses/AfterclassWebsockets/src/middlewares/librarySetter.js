import LibrariesManager from "../dao/mongo/managers/LibrariesManager.js";

const librariesService = new LibrariesManager();

const librarySetter = async(req,res,next) => {
    // if(req.user&&req.cookies.library){ // OPCIONAL
    //     res.clearCookie('library');
    //     return next();
    // }
    if(!req.cookies.library&&!req.user) {
        const library = await  librariesService.createLibrary();
        res.cookie('library',library._id.toString())
    }
    next();
}

export default librarySetter;