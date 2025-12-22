import express from 'express';

const app = express()


// routes
app.get("/" , (req , res) => {
    res.status(200).send("Server working")
})

export default app