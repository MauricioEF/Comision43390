import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const users = [
        {name:"José"},
        {name:"Daniel"},
        {name:"María"}
    ]
    req.io.emit('users',users);
    console.log(req.papa);
    res.send({users})
});

export default router;
