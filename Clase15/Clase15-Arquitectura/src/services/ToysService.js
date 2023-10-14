
export default class ToysService {
    constructor(manager){
        this.manager = manager;
    }

    getToys = () =>{
        return this.manager.get();
    }

    createToy = (toy) =>{
        return this.manager.create(toy);
    }

    updateToy = () =>{
        return this.manager.update();
    }
}