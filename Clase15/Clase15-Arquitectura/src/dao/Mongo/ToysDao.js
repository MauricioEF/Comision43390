import toyModel from "./models/toy.js"

export default class CartDao {

    get = () => {
        return toyModel.find().lean();
    }

    getBy = (params) => {
        return toyModel.findOne(params).lean();
    }

    create = (toy) =>{
        return toyModel.create(toy);
    }

    update  = () => {

    }

}