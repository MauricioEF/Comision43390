import mongoose from 'mongoose';
import MongoosePaginate from 'mongoose-paginate-v2';

const collection = "Videogames";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    categories:{
        type: Array,
        default: []
    },
    images: {
        type:Array,
        default:[]
    }
},{timestamps:true})

schema.plugin(MongoosePaginate);

const videogameModel = mongoose.model(collection,schema);

export default videogameModel;