import express from "express";
import router from "./routes/users.js";

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', router)

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})