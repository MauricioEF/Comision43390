import Node from "./Node.js";
/*
 * PILA 
 */

// LIFO
/**
 * Last
 * In
 * First
 * Out
 */



export default class Stack {
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push = value => {
        const node = new Node(value);
        if(!this.first){ //Este será el primer nodo
            this.first = node;
            this.last = node;
        }
        else{ //Hay más nodos a considerar
            let aux = this.first;
            this.first = node;
            this.first.next = aux;
        }
        return ++this.size;
    }

    pop = () =>{
        //Pregunta si estoy vacío
        if(!this.first) return null;
        let aux = this.first;
        if(this.first === this.last){
            this.last = null;
        }
        //Tengo que corroborar si hay algún elemento siguiente
        this.first = this.first.next;
        this.size --;
        return aux.value;
    }
}

// const myFirstStack = new Stack();

// myFirstStack.push('a');
// myFirstStack.push(2);
// myFirstStack.push(true);

// console.log(myFirstStack.pop());
// console.log(myFirstStack.pop());
// console.log(myFirstStack.pop());
// console.log(myFirstStack.pop());