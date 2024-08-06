import mongoose from "mongoose";

const productSchema= mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:[true, "Please enter product name"]
    },
    price:{
        type: Number,
        required:[true,"Please enter product price"]
    },
    company:{
        type: String,
        enum:{
            values:["ikea","nilkamal","durian","pepperfry"],
            message: "{VALUE} is not supported",
        }
        
    },
    featured:{
        type:Boolean,
        default: false
    },
    rating:{
        type:Number,
        default: 4.5
    },
    createdAt:{ 
        type: Date, 
        deefault:Date.now()

    }
})
export const Product=mongoose.model("Product",productSchema)
// export default product