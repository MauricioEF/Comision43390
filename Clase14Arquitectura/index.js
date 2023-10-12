import MongoSingleton from "./MongoSingleton.js";



const mongoInstance = MongoSingleton.getInstance(); 
//NO ES UN new MongoSingleton  new === PROHIBIDO

const mongoInstance2 = MongoSingleton.getInstance(); 