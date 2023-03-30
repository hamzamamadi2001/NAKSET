import  prisma   from '../../lib/prismadb'
import { getToken } from "next-auth/jwt"

  export default async function handler(req ,res ){

   let neww = false
  let adress =null
 
const token = await getToken({ req})
if (token) {
 
   const citys = await prisma.wishlist.create({data:{userId:req.userid,productId:req.productid}}) 


   
  console.log("i am in cat",{countrys,citys})

     return res.status(200).json({final:true})    }
     else{
        res.status(401)
     }          

  
  
}