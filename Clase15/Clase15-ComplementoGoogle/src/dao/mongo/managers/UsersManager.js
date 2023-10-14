import userModel from "../models/user.js";

export default class UsersManager {

    getUsers = (params) =>{
        return userModel.find(params);
    }

    getUserBy = (params) =>{
        return userModel.findOne(params);
    }

    createUser = (user) =>{
        return userModel.create(user);
    }

    updateUser = (id,user) =>{
        return userModel.updateOne({_id:id},user);
    }

    deleteUser =(id) =>{
        return userModel.deleteOne({_id:id});
    }
}