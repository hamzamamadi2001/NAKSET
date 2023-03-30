import React ,{useState,useEffect} from 'react'
import { Button} from "flowbite-react";
import {useSession} from 'next-auth/react'
import { useSelector } from 'react-redux'
import { ImLocation2 } from 'react-icons/im';
import { TbMoodEmpty } from 'react-icons/tb';
import Bay from './pay'
import Image from 'next/image'
import Card3 from "../components/cardwish"


 
import {Table,Modal,Label,TextInput,Checkbox}from "flowbite-react";

 
ImLocation2

function About() {
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const [data, setData] = useState([]);

 
  const {data:session,status}= useSession()
 
  useEffect(() => {
    
    const handleSearch =async (id) => {

      let response = await fetch("https://nakset.vercel.app/api/getUserAddress",{method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
       });


      let result = await response.json()
       setChosenCity(result[1][0].name)
      setChosenCountry(result[0][0].name)
      setChosenCityId(result[1][0].id)
      setChosenCountryId(result[0][0].id)
setIsnew(result[3])
setOldAdress(result[2])

       setCountry(result[0])
       setCity(result[1])
    };

    

    
   
 
 
  async function fetchText() {
  let response = await fetch('http://localhost:3000/api/wishlist',{method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }});
 
 
      let data1 = await response.json();
      console.log(data1[0].product)
      setData(data1)
       
 
}

fetchText();
 


}, [session]);






const symbol = useSelector((state) => state.counter.Symbol)
const currencyValue = useSelector((state) => state.counter.currencyValue)



 
    const [value, setValue] = useState(1);

 
  return (
    <div  className='w-screen grid grid-cols-4 ' >
      <div className='col-span-1'></div>
      <div className='col-span-1'></div>
      <div className='col-span-1'></div>

 
      <div className='col-span-1 bg-white rounded-xl'><p className='text-center text-4xl   font-bold text-gray-600 w-full     '> your wishlist </p>
            <p className='text-center text-2xl bg-gray-400 rounded-2xl  font-bold text-gray-800 w-full     '> get 10% off your first order </p>


            
 
                 {data.length>0?(<div className=' flex flex-col justify-center items-center'>
  
        {data.map((res,index) => (
        <Card3 key={res.product.id} src={res.product.photo} title={res.product.name} unit={res.product.unit} price={res.product.price} id={res.product.id} baseQuantity={res.product.baseQuantity}></Card3>

        
      ))}
         </div>):(
<div className='flex flex-col justify-center items-center'>
         <p className='text-cneter text-2xl font-mono'>Your cart is empty</p>
     <TbMoodEmpty color='gray' size={100}></TbMoodEmpty>
     </div>    
         )}</div>

            
        {/* </div>
        <div className='  col-span-1'> */}
            
            
            

       
 
    </div>
  )
}

export default About
 