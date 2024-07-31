import express from "express";


const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.get('/', (req, res)=> {
//     return res.send("Hey There, world")
// })  

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})