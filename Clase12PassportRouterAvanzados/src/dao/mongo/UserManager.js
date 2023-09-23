import userModel from "./models/user.js";

export default class UserManager {

    get = (params) =>{
        return userModel.find(params);
    }
    
    getBy = (params) =>{
        return userModel.findOne(params);
    }

    create = (user) =>{
        return userModel.create(user);
    }

    update = (params,user) =>{
        return userModel.update(params,{$set:user})
    }

    delete = (id) =>{
        return userModel.delete({_id:id})
    }
}