import React from 'react'
import Image from "next/image"
import Link from "next/link"

import Button from '@mui/material/Button';
 
export default function About() {
  return (
    <div className='container'>
    <div className=' flex flex-col bg-black w-screen '>
    <div className='flex flex-row flex-wrap  justify-around h-10 p-10  '>
        <Link  className='text-white' href="#">Copyright © 2023 nakset - All Rights Reserved.</Link>
        <Link  className='text-white' href="#">Powered by NAKSET</Link>
    </div>
    <div className='flex flex-row flex-wrap justify-center items-center gap-4 p-10'>
        <Link className='text-white text-2xl font-bold' href="#">text here</Link>
        <Link  className='text-white' href="#">TERMS AND CONDITIONS</Link>
        <Link  className='text-white' href="#">PRIVACY POLICY</Link>
        <Link  className='text-white' href="#">COOKIE POLICY</Link>
        <Link  className='text-white' href="#">RETURN AND REFUND POLICY</Link>
        <Link  className='text-white'  href="#">CARTS & OTHERS</Link>
    </div>
 
    </div>
    </div>

)}
