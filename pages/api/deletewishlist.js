import  prisma   from '../../lib/prismadb'
import { getToken } from "next-auth/jwt"

  export default async function handler(req ,res ){

   let neww = false
  let adress =null
 
const token = await getToken({ req})
if (token) {
 
   const citys = await prisma.wishlist.delete({where:{userId_productId:{productId:req.productId,userId:req.userId}}}) 


   
  console.log("i am in cat",{countrys,citys})

     return res.status(200).json({final:false})    }
     else{
        res.status(401)
     }          

  
  
}