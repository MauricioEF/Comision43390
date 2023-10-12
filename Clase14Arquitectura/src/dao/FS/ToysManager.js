import fs from 'fs';

export default class ToysManager {
    constructor() {
        this.path = './toys.json';
    }

    get = () =>{
        //leo archivo
        //Decodificar
        //Parsear
        //Devolver
    }

    create = async (toy) =>{
        const toys = await this.get();
        fs.promises.writeFile(this.path,toy);
    }
    
    update = (toy) =>{
        
    }
}