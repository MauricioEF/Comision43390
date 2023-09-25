import { Router } from "express";

const router = Router();

router.param('word',(req,res,next,word)=>{
    //Validar que cumpla la expresión regular
    //La validación de regex la hacemos con unicodes

    const isValidParam = /^[a-zA-Z\u00E1]+$/.test(word);
    if(!isValidParam) return res.status(400).send({status:"error",error:"Invalid word"});

    //Aquí yo debería buscar la palabra en el diccionario
    
    req.word = word;
    next()
})

//URL VALIDATION ([a-zA-Z%20]+)

router.get('/:word',async(req,res)=>{
    res.send({status:"success",payload:req.word})
})

router.get('/otraruta',async(req,res)=>{
    console.log(req.word);
    res.send({status:"success",payload:"aA"})
})

router.post('/:word',async(req,res)=>{

})

router.put('/:word',async(req,res)=>{

})


router.get('*',(req,res)=>{
    res.status(400).send({status:"error",error:"Invalid Word"})
})

export default router;