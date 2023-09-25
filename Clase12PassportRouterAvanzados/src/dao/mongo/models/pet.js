import mongoose from "mongoose";

const collection = "Pets";

const schema = new mongoose.Schema({
    name:String,
    specie:String
})

const petModel = mongoose.model(collection,schema);

export default petModel;