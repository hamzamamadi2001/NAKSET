import React ,{useState,useEffect} from 'react'
 import Button from '@mui/material/Button';
 
import { useSelector, useDispatch } from 'react-redux'
 import { MdVerifiedUser } from 'react-icons/md';
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image';
import Link from 'next/link';

import Card3 from "../components/CardPro"
import client from '../lib/prismadb'

 
 
 

export default  function About({result}) {
    const {t} = useTranslation()
    console.log(result)
 const [res, setRes] = useState(result);
useEffect(() => {
  setRes(result)
 
}, []);
 

 

  
  return (
<>
    <section>

    

    <div style={{height:"400px"}} className=" relative w-screen    flex justify-center items-center">

    <Image src="/meat22.jpg" fill className="w-full h-1/2 md:h-screen  " />
    <div className="absolute w-full h-full flex  justify-center flex-col items-center backdrop-filter b     bg-black  bg-opacity-75     ">
    
    </div >



  </div>
  <div className='w-screen flex flex-row flex-wrap justify-center items-center my-20 md:gap-5 '>
  { res.map((res) => (
            <Card3 key={res.id} src={res.photo} title={res.name} unit={res.unit} price={res.price} id={res.id} baseQuantity={res.baseQuantity}></Card3>


          ))}
 

  </div>

  
  </section>
  
  <section>

    

<div style={{height:"400px"}} className=" relative w-screen    flex justify-center items-center">

<Image src="/meat22.jpg" fill className="w-full h-1/2 md:h-screen  " />
<div className="absolute w-full h-full flex  justify-center flex-col items-center backdrop-filter b     bg-black  bg-opacity-75     ">

</div >



</div>
<div className='w-screen flex flex-row flex-wrap justify-center items-center my-20 md:gap-5 '>
{ res.map((res) => (
        <Card3 key={res.id} src={res.photo} title={res.name} unit={res.unit} price={res.price} id={res.id} baseQuantity={res.baseQuantity}></Card3>


      ))}


</div>


</section>
<section>

    

<div style={{height:"400px"}} className=" relative w-screen    flex justify-center items-center">

<Image src="/meat22.jpg" fill className="w-full h-1/2 md:h-screen  " />
<div className="absolute w-full h-full flex  justify-center flex-col items-center backdrop-filter b     bg-black  bg-opacity-75     ">
  
  
<Link href="http://localhost:3000/#shoop" scroll={false}>
<Button  sc variant='outlined' className='w-96 h-24'>Continue shopping - back to shoop</Button>
</Link>
</div >



</div>
 


</section>
  </>)
}


export async function getServerSideProps(context) {
  // console.log("this is context",context.req.headers.cookie)
  //replace the url with this before uploading it to  the server "https://nakset.vercel.app/api/listCategories"
  //     let response = await fetch("https://nakset.vercel.app/api/listCategories")


  // let result2 = await response.json()
  // console.log(result2)



  // const categories = await client.category.findMany({ select: { id: true, name: true } })
  // const countrys = await client.countrys.findMany({ where: {} })
  // const citys = await client.citys.findMany({ where: { country: 0 }, select: { id: true, name: true } })


  const result = await client.product.findMany({ where: { city: 0 } })
  await client.$disconnect()
  


  return {
    props: { result }, // will be passed to the page component as props
  }

}