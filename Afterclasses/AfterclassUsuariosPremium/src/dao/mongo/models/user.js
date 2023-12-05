import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:'user'
    },
    library: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Libraries'
    }
})

const userModel = mongoose.model(collection,schema);

export default userModel;
