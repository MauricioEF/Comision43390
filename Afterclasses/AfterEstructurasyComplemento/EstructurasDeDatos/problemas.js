import Stack from "./Stack.js"
//Dada un string, utilizar la función "voltearString" la cual devuelva la cadena al revés
//Utilizar una estructura de pila para ello

// L I F O

const voltearString = (string) => {
    const pila = new Stack();
    //Insertamos letra por letra la cadena a la pila
    for(let i=0;i<string.length;i++){
        pila.push(string[i])
    }
    let reversedString ="";
    //Tenemos que vaciar la pila, consologueando
    while(pila.size>0){
        reversedString+=pila.pop()
    }
    console.log(reversedString);
}



const voltearModoFacil = (string) =>{
    return string.split("").reverse().join("");
}

voltearString("perro");
//console.log(voltearModoFacil("perro"));

//perro
//orrep