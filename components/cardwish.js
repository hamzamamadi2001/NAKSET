import React,{useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiMinus } from 'react-icons/hi';
import { MdAdd } from 'react-icons/md';
import { MdAddShoppingCart } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart} from 'react-icons/ai';



 import { useSelector, useDispatch } from 'react-redux'
import { addProduct, adjustQuantity,removeProduct } from '../slices/CounterSlice'


 import {Card}from "flowbite-react";
 import { Rating } from "flowbite-react";

function CardCat({src,title,id,price,unit,baseQuantity}) {
   const dispatch = useDispatch()
  const items = useSelector((state) => state.counter)
  
  const [value, setValue] = useState(1);

  const handleChange = event => {
    
    const result = event.target.value.replace(/\D/g, '');
if(Number(result) <=1)
     { setValue(1)}
     else{
        setValue(Number(result));
     }
    
  };
const [inwishlist, setInWishList] = useState(false);
  
  // 👇️ validation
  if (value !== '') {
    const num = Number(value);
    // 👉️ submit form
  }
  return (
     
      
     <div className=' relative  my-4  shadow-black  bg-white flex flex-row justify-center items-center rounded-lg' >
      {inwishlist?(<AiOutlineHeart  onClick={()=>{setInWishList(prev=>!prev)}} color='red' size={30}  className="cursor-pointer absolute left-0 top-0"></AiOutlineHeart>):(<AiFillHeart  onClick={()=>{setInWishList(prev=>!prev)}} color='red' size={30}  className="cursor-pointer absolute left-0 top-0"></AiFillHeart>)}
      <div className='relative w-24 h-24'>
      <Image src={src} fill></Image>
      </div>
      
      <div className='flex flex-col justify-center items-center gap-0'>
<h6 className="text-2xl my-3 text-center font-bold  tracking-tight text-gray-900 dark:text-white">
    {title}
    </h6>
    <h4 className='text-center font-bold text-lg'>{(Math.round( price*parseFloat(items.currencyValue)* 100) / 100).toFixed(2)+" "+items.Symbol}</h4>
    <p className="font-normal text-center text-gray-800  ">
      for {baseQuantity} {unit}
    </p>
    <div className='w-56 flex justify-center items-center'>
      <div className=' bg-red-800  cursor-pointer '>
    <HiMinus color='white' onClick={()=>{if(value<=1) {setValue(1)}else { setValue(value=>value-1)}}} size={40}></HiMinus>
      </div>
    <input
    className='w-16'
        type="text"
        placeholder="quantity"
        value={(Math.round( value*parseFloat(baseQuantity)* 100) / 100).toFixed(2)}
        onChange={handleChange}
      />
      <div className=' bg-red-800 cursor-pointer'>
      <MdAdd color="white" onClick={()=>{   setValue(value=>value+1)}}   size={40}></MdAdd>
      </div>
</div>


      </div>
 
<div onClick={()=>{dispatch(addProduct({id:id,price:price*value,name:title,weight:unit,photo:src,quantity:value,priceUnit:price,baseQuantity:baseQuantity}))}} className='cursor-pointer  flex flex-col gap-1  justify-center rounded-lg  items-center relative'>

<p className='  text-center  rounded-full w-full bg-black  text-white font-bold p-1'>ADD TO CART</p>
  <p className='bg-black text-white text-center w-full font-bold rounded-full p-1' onClick={console.log("delete")}>
 DELETE</p>

</div>

{/* <Button onClick={()=>{dispatch(addProduct({id:id,price:price*value,name:title,weight:unit,photo:src,quantity:value,priceUnit:price,baseQuantity:baseQuantity}))}}  className='m-2' >
      <MdAddShoppingCart   />
      Add to cart
    </Button> */}
    
  </div>
   )
}

export default CardCat