import { DECIMAL } from 'mysql/lib/protocol/constants/types';
import React, { useState, } from 'react'
import { AiFillMinusCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { adjustQuantity, removeProduct } from '../slices/CounterSlice'
import { Table } from "flowbite-react";
import { HiMinus } from 'react-icons/hi';
import { MdAdd } from 'react-icons/md';

function About({ price, src, name, currency, unit, baseQuantity, weight, idx, quantity, currencyValue }) {
  const gprice = useSelector((state) => state.counter.items[idx].price)



  const dispatch = useDispatch()
  const [value, setValue] = useState(quantity);

  const handleChange = event => {

    const result = event.target.value.replace(/\D/g, '');
    if (Number(result) <= 1) {
      setValue(1)
      dispatch(adjustQuantity({ quantity: 1, idx: idx }))

    }
    else {
      setValue(Number(result));

      dispatch(adjustQuantity({ quantity: Number(result), idx: idx }))

    }
  };



  // 👇️ validation
  if (value !== '') {
    const num = Number(value);
    // 👉️ submit form
  }
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap   font-medium text-gray-900 dark:text-white">
        <div className='flex items-center md:flex-row flex-col justify-center'>
          <div className='flex justify-center items-center flex-row'>
            <Image src={src} width="100" height='100'></Image>
            <div className='flex justify-center items-center flex-col'>
              <p className=' w-full text-base text-center font-mono my-1'>{name}</p>
              <p className='text-black text-2xl    text-center'>{(Math.round(parseFloat(price) * currencyValue * 100) / 100).toFixed(2) + currency + " for " + baseQuantity + " " + weight}</p>
              <div className='w-56 flex justify-center items-center'>
                <div className=' bg-red-800  cursor-pointer '>
                  <HiMinus color='white' onClick={() => { if (value - 1 < 1) { setValue(1); dispatch(adjustQuantity({ quantity: 1, idx: idx })) } else { dispatch(adjustQuantity({ quantity: value - 1, idx: idx })); setValue(value - 1) } }} size={40}></HiMinus>
                </div>
                <input
                  className='w-16'
                  type="text"
                  placeholder="quantity"
                  value={(Math.round(value * baseQuantity * 100) / 100).toFixed(2)}
                  onChange={handleChange}
                />
                <div className=' bg-red-800 cursor-pointer'>
                  <MdAdd color="white" onClick={() => { dispatch(adjustQuantity({ quantity: value + 1, idx: idx })); setValue(value + 1); }} size={40}></MdAdd>
                </div>

              </div>
            </div>

          </div>

          {/* <p className='text-black text-2xl    text-start'>{(Math.round( parseFloat(price)*currencyValue* 100) / 100).toFixed(2)+currency}</p>
     <p>for{baseQuantity+" "+weight} </p> */}
          {/* <div className='w-full flex justify-center items-center'>
     <AiFillMinusCircle onClick={()=>{if(value-1<1) {setValue(1);dispatch(adjustQuantity({quantity:1,idx:idx})) }else {dispatch(adjustQuantity({quantity:value-1,idx:idx}));setValue(value-1) }}} size={30}></AiFillMinusCircle>
    <input
    className='w-24'
        type="text"
        placeholder="quantity"
        value={(Math.round(value*baseQuantity* 100) / 100).toFixed(2)}
        onChange={handleChange}
      />
      <AiFillPlusCircle onClick={()=>{  dispatch(adjustQuantity({quantity:value+1,idx:idx}));setValue(value+1);}}   size={30}></AiFillPlusCircle></div> */}


<div className='flex flex-col justify-center items-center gap-10'>
          <p className=' text-black text-2xl  text-start'>{(Math.round(gprice * currencyValue * 100) / 100).toFixed(2) + currency}</p>
          <p className='flex justify-center  items-center h-full cursor-pointer text-gray-500' onClick={() => dispatch(removeProduct({ idx: idx }))}>remove</p>
          </div> 
        </div>
      </Table.Cell>

      {/* <Table.Cell>

      </Table.Cell> */}


      
    </Table.Row>














  )
}

export default About
