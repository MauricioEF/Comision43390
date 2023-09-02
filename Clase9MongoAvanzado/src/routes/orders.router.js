import { Router } from "express";
import orderModel from "../dao/Mongo/models/order.js";

const router = Router();

router.post('/multi',async(req,res)=>{
    const pizzas = [
        { name: "Pepperoni", size: "small", price: 19,
          quantity: 10, date:"2021-03-13T08:14:30Z" },
        { name: "Pepperoni", size: "medium", price: 20,
          quantity: 20, date :"2021-03-13T09:13:24Z"},
        { name: "Pepperoni", size: "large", price: 21,
          quantity: 30, date :"2021-03-17T09:22:12Z"},
        { name: "Cheese", size: "small", price: 12,
          quantity: 15, date :"2021-03-13T11:21:39.736Z" },
        { name: "Cheese", size: "medium", price: 13,
          quantity:50, date : "2022-01-12T21:23:13.331Z"},
        { name: "Cheese", size: "large", price: 14,
          quantity: 10, date : "2022-01-12T05:08:13Z"},
        { name: "Vegan", size: "small", price: 17,
          quantity: 10, date : "2021-01-13T05:08:13Z"},
        { name: "Vegan", size: "medium", price: 18,
          quantity: 10, date : "2021-01-13T05:10:13Z"}
     ];
     const result = await orderModel.insertMany(pizzas);
     res.send({status:"success",message:"orders added"})
})

router.get('/',async(req,res)=>{
    const orders = await orderModel.find();
    res.send({status:"success",payload:orders})
})

router.get('/aggregate',async(req,res)=>{
    //Aquí hacemos magia :) 
    const aggreatedResult = await orderModel.aggregate([
        {$match:{size:'medium'}},
        {$group:{_id:"$name",total:{$sum:"$quantity"}}},
        //A partir de esta etapa, ya no tengo pizzas.
        //UNA STAGE siempre debe ser consciente únicamente de su stage anterior
        {$sort:{total:-1}},
        //Ahora lo desafiante es generar el reporte
        {$group:{_id:'orders',orders:{$push:"$$ROOT"}}},
        {$project:{_id:0,orders:"$orders"}},
        {$merge:{into:"reports"}}
    ])
    
    res.send({result:aggreatedResult})
})

export default router;