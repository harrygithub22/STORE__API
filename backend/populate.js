import dbConnect from "./dbConnect.js";
import "dotenv/config"
import { Product } from "./models/productModel.js";
import productData from "./products.json" assert {type:"json"}


;(
    async()=>{
      try {
          await dbConnect(process.env.MONGO_URL)
          console.log("DB Connected")
          await Product.deleteMany()
          console.log("All records deleted")
          await Product.create(productData)
          console.log("Product data imported...")
          process.exit(0)
          
      } catch (error) {
        console.log(error)
        process.exit(1)
      }
    }

)()