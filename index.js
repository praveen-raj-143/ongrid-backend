const express =require("express");
const connection =require("./Database/connection")
const Router = require("./Routes/route")
const cors = require("cors")
const app=express();

app.use(express.json())

app.use(cors(
    {origin:"*"}
))
app.use(Router)
app.listen(5000, async ()=>{
    try {
        await connection;
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
})