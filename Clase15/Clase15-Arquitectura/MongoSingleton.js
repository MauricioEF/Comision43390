import mongoose from "mongoose";


export default class MongoSingleton {
    static #instance;  //Está referenciandose a sí mismo. 
    constructor(){
        mongoose.connect("mongodb+srv://coderUser:123@cluster0.cp6cenm.mongodb.net/jugueteria?retryWrites=true&w=majority")
    }

    static getInstance(){
        if(this.#instance){
            console.log("Ya tengo una referencia conectada");
            return this.#instance;
        }
        //Es porque es mi primera instancia. 
        this.#instance = new MongoSingleton();
        console.log("Primera instancia creada y conectada");
        return this.#instance
    }
}