import config from "../config/config.js";

export default class PersistenceFactory {

    static getPersistence = async() =>{
        //Tengo una lista de las ENTIDADES que necesito modelar a nivel persistencia.
        let ToysDao;
        let UsersDao;
        let CartsDao;
        let ProductsDao;

        switch(config.app.PERSISTENCE){
            case "MEMORY":{
                ToysDao = (await import('./Memory/ToysDao.js')).default;
                break;
            }
            case "FS":{
                ToysDao = (await import('./FS/ToysDao.js')).default;
                break;
            }
            case "MONGO":{
                ToysDao = (await import('./Mongo/ToysDao.js')).default;
                break;
            }
        }
        return {
            ToysDao
        }
    }

}