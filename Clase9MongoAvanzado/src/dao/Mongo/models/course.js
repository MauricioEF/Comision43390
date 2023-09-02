import mongoose from "mongoose";

const collection = "Courses";

const schema = new mongoose.Schema({
    title:String,
    description:String,
    difficulty:Number,
    topics:{
        type:Array,
        default:[]
    },
    professor:String,
    //Lo que viene no aplica para tu proyecto
    students:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Students'
        }
    ]
})

// schema.pre(['find','findOne'],function(){
//     //CUIDADO AL PRENDER ESTO POR POPULATION CIRCULAR
//     this.populate('students')
// })

const courseModel = mongoose.model(collection,schema);

export default courseModel;