import  prisma   from '../../lib/prismadb'
import { getToken } from "next-auth/jwt"

  export default async function handler(req ,res ){

   let neww = false
  let adress =null
 
// const token = await getToken({ req})
// if (token) {
 
   const wishlist = await prisma.wishlist.findMany({where:{userId:6},include:{product:true}}) 


   
 

     return res.status(200).json(wishlist)  
    
    
    // }
    //  else{
    //     res.status(401)
    //  }          

  
  
}