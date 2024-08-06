import express from "express"
import "dotenv/config"
import dbConnect from "./dbConnect.js"
import { notFound } from "./middleware/notFound.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { Product } from "./models/productModel.js"
import productRoutes from "./routes/productRoutes.js"
import "express-async-errors"



const app=express()

// app.use() : Means when you want to use middleware / here Routes is the middleware 
// app.use(express.json) //use data in json format
const port=process.env.PORT || 6000
app.use(express.json())



app.get('/',(req,res)=>{
    res.send("store api")
})

app.use("/api/v1/products",productRoutes)
app.use(notFound)
app.use(errorHandler)


// app.listen(port,console.log("Server is Live..."))

;(
    async()=>{
        await dbConnect(process.env.MONGO_URL)
        console.log("DB Connected")
        app.listen(port,console.log("Server is Live...",port))

    }

)();