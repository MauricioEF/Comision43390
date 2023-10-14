import mongoose from 'mongoose';

const collection = "Toys";

const schema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number
})

const toyModel = mongoose.model(collection,schema);

export default toyModel;