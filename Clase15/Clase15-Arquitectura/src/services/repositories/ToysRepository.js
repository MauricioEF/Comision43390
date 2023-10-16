
export default class ToysRepository {
    constructor(dao){
        this.dao = dao;
    }

    getToys = () =>{
        return this.dao.get();
    }

    createToy = (toy) =>{
        return this.dao.create(toy);
    }

    updateToy = () =>{
        return this.dao.update();
    }

}