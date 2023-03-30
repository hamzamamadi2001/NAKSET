// import {verify} from "jsonwebtoken"

// export  const authenticated = (fn) => async (req, res) => {
     
//         if(req.headers.token){
//             console.log("this is the token form the header ",req.headers.token)
//  verify(req.headers.token,process.env.SECRET,async function(err,decode) {
//         if(!err&&decode){
//             return await fn(req, res);
//         }
//         res.status(401).json({message:"sorry you are not authenticated"})
//     })
//         }
//         res.status(401).json({message:"sorry you are not authenticated"})
      
    
//   };
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
   
  {
    
    
    pages: {
    signIn: '/sum',
    error: '/api/auth/error',
  },
  },
  
)

export const config = { matcher: ["/profile","/orders","/completeOrder"] }


