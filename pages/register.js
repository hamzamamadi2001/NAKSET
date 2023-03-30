import React from 'react'
import {  Text } from "@nextui-org/react";
 import Login from '../components/login'
import Register from '../components/register'
 import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
 function About() {
    const [openTab, setOpenTab] = React.useState(1);

  return (
 
<div className=' h-screen w-screen    bg-white flex flex-col justify-center items-center   '>
 
         
               
                    <Register></Register>
                

             
      


</div>
    
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
export default About
