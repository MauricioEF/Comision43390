import toyModel from "./models/toy.js"

export default class ToysManager {

    get = () => {
        return toyModel.find().lean();
    }

    create = (toy) =>{
        return toyModel.create(toy);
    }

    update  = () => {

    }
}