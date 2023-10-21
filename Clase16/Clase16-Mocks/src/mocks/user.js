import {faker} from '@faker-js/faker/locale/es';
import { generateProduct } from './product.js';

export const generateUser = () =>{

    const roles = ["user","admin","userpremium"];

    const numberOfProducts = faker.number.int({min:0,max:5});
    const products = [];
    for(let i=0;i<numberOfProducts;i++){
        const product = generateProduct();
        products.push(product);
    }

    return {
        id: faker.database.mongodbObjectId(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthDate: faker.date.birthdate(),
        role: faker.helpers.arrayElement(roles),
        premium: faker.datatype.boolean(),
        products
    }
}