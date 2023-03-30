import React from 'react'
import Image from "next/image"
import Button from '@mui/material/Button';
 
export default function About() {
  return (
    <div>

<section className='container mx-auto  '>
<p className='text-center text-red-400 font-bold text-5xl  p-20'>About us</p>
<section className='grid lg:grid-cols-3 grid-cols-1'>
<div className='col-span-2 p-10  ' >
  <div className='flex justify-start items-center'>
    <p className='text-black font-bold text-5xl'>Additional Information</p>
  </div>
  <div>
    <p className='break-words space-y-3 text-lg mt-10'>
    This is a long form text area designed for your content that you can fill up with as many words as your heart desires. You can write articles, long mission statements, company policies, executive profiles, company awards/distinctions,<br/> office locations, shareholder reports, whitepapers, media mentions and other pieces of content that don’t fit into a shorter, more succinct space.
    </p>
  </div>

</div>

<div className='col-span-1 '>
    <img src='/about.webp'></img>
 </div>



</section>
</section>

<section className='bg-gray-300 w-screen h-full mt-10'>
<p className='text-center text-red-400 font-bold text-5xl  p-20'>Our values</p>
<div className='flex flex-row justify-center items-center '>

<div className='flex flex-col flex-wrap justify-center items-center gap-5'>
    <div className='relative w-80 h-80 flex flex-col justify-center items-center'>
      <Image src='/about.webp' fill className="rounded-full top-0"></Image>
     

    </div>
 <p className='font-bold text-2xl'>Generate excitement</p>
      <p>What's something exciting your business offers? Say it here.</p>
  </div>


  <div className='flex flex-col flex-wrap justify-center items-center gap-5'>
    <div className='relative w-80 h-80 flex flex-col justify-center items-center'>
      <Image src='/about.webp' fill className="rounded-full top-0"></Image>
     

    </div>
 <p className='font-bold text-2xl'>Generate excitement</p>
      <p>What's something exciting your business offers? Say it here.</p>
  </div>



  <div className='flex flex-col flex-wrap justify-center items-center gap-5'>
    <div className='relative w-80 h-80 flex flex-col justify-center items-center'>
      <Image src='/about.webp' fill className="rounded-full top-0"></Image>
     

    </div>
 <p className='font-bold text-2xl'>Generate excitement</p>
      <p>What's something exciting your business offers? Say it here.</p>
  </div>


  <div className='flex flex-col flex-wrap justify-center items-center gap-5'>
    <div className='relative w-80 h-80 flex flex-col justify-center items-center'>
      <Image src='/about.webp' fill className="rounded-full top-0"></Image>
     

    </div>
 <p className='font-bold text-2xl'>Generate excitement</p>
      <p>What's something exciting your business offers? Say it here.</p>
  </div>

</div>
 

</section>



</div>)}