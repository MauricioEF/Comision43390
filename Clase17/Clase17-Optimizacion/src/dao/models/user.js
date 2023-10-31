import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model(collection,schema);

export default userModel;