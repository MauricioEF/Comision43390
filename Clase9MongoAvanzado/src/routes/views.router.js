import { Router } from "express";
import userModel from '../dao/Mongo/models/user.js';

const router = Router();

router.get('/',async(req,res)=>{
    const {page} = req.query;
    const paginationResult = await userModel.paginate({},{page,limit:30, lean:true});
    const users = paginationResult.docs;
    const currentPage = paginationResult.page;
    const {hasPrevPage, hasNextPage, prevPage, nextPage} = paginationResult;

    res.render('home',{
        users,
        page:currentPage,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    });
})

export default router;