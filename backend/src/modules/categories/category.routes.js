import { Router } from 'express';

const routes = Router();

routes.post("/" , async (req , res , next) => {
    res.send("Im live")
})

export default routes