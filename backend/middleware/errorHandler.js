// const asyncWrapper = (fn) =>{
//     return async (req,res,next)=>{
//       try {
//           await fn(req,res,next)
//       } catch (error) {
//           next(error)
          
//       }
//     }
// }

// export default asyncWrapper



// npm i express-async-errors

export const errorHandler=(err,req,res,next)=>{
    return res
    .status(500)
    .json({msg: err})
}

// export default errorHandler