import { faker } from "@faker-js/faker/locale/es";

export const generateProduct = () =>{
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int({min:0,max:30}),
        code: faker.string.alphanumeric(10),
        img: faker.image.urlLoremFlickr()
    }
}