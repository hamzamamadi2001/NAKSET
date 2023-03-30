import {  Navbar,Dropdown,Avatar } from "flowbite-react";
import Image from 'next/image'
import logo from '../public/logo2.png'
import Link from 'next/link'
import {useSession,signOut} from 'next-auth/react'
import { Button} from "flowbite-react";
import { RiShoppingBasketFill } from 'react-icons/ri';
import { BiSearch, BsSearch } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux'
import ReactCountryFlag from "react-country-flag"
// import { Language } from "@mui/icons-material";
import { adjustcurr} from '../slices/CounterSlice'

import { useState,useEffect } from "react";
import {useRouter} from "next/router"
import useTranslation from 'next-translate/useTranslation'
import {IBM_Plex_Serif} from "@next/font/google"
const ibm  = IBM_Plex_Serif({
  subsets:["latin"],
weight:"500",
variable:"--font-ibm"
})
export default function App() {
  const dispatch = useDispatch()
  const {locale,pathname,query,asPath}=useRouter()
  const [flag, setflag] = useState("us");
  const [res, setRes] = useState([]);
  const [showdrop, setShowDrop] = useState(false);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState('');



  const [opensearch, setOpenSearch] = useState(false);

  const [usd, setusd] = useState(1);
  const [huf, sethuf] = useState(1);
  const [localee, setlocale] = useState(locale);



 
  useEffect(() => {




      switch (locale) {
    case "en":
      setflag("us")
      document.querySelector("html").setAttribute("dir", "ltr");

      break;
      case "fr":
        setflag("us")
        document.querySelector("html").setAttribute("dir", "ltr");

      break;
      case "ar":
        setflag("sa")

       document.querySelector("html").setAttribute("dir", "rtl");
      break;
      case "tr":
        setflag("tr")
        document.querySelector("html").setAttribute("dir", "ltr");


      break;
      case "de":
        setflag("de")
        document.querySelector("html").setAttribute("dir", "ltr");


      break;
    default:
      break;
  }

  async function fetchText() {
    let response = await fetch('https://api.frankfurter.app/latest?to=usd,huf');

    

    if (response.status === 200) {
        let data = await response.json();
        // handle data
        setusd(data.rates.USD)
        sethuf(data.rates.HUF)


    }
}

fetchText();

  }, [locale]);


  async function search2(e) {
    setSearch(e.target.value);
    console.log("hello world from client side")
   
//     var input =''
//     var index = 0
//     for (; index <  array.length - 1; index++) {
//        input = input + "+" + array[index] + " "  ;
      
//     }
//     input = input + "+" + array[index] ;
 console.log( e.target.value.replace(/\s/g, ''))
   
   if(e.target.value.replace(/\s/g, '').length== 1){
    let  response = await fetch("https://nakset.vercel.app/api/search",{method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({input:e.target.value})});
   
  let result1 = await response.json(response);
  if(result1.searching){ 
     console.log(result1.result)
    setRes(result1.result)
    setResult(result1.result)
    setShowDrop(true)
  }
  else{
    setShowDrop(false)
      }


   }

   else if (e.target.value.replace(/\s/g, '').length > 1)
   {
    console.log("hello world here from > 1S")
    let array = e.target.value.replace(/\s/g, '').split('')
   var  re = []
   
    res.map((name)=>{
      let exist = true
      for (let index = 0; index < array.length; index++) {
        

        if(!name.name.includes(array[index])){
          exist = false
          break
          
        }

 
        
      }
      if(exist){
        re.push(name)
      }


    })
 
    
    setResult(re)

    

 setShowDrop(true)
    

   }
   else {
    setShowDrop(false)
   


   }
    
    }



  



  const {t} = useTranslation()
  const count = useSelector((state) => state.counter.counter)
  const curr = useSelector((state) => state.counter.currency)

const [language, setLanguage] = useState('US');
  const {data:session,status}= useSession()

  return (
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a href="https://flowbite.com/" class="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
      </a>
      <div class="flex md:order-2">
        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Search</span>
        </button>
        <div class="relative hidden md:block">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Search icon</span>
          </div>
          <input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
        </div>
        <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
          <span class="sr-only">Open menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
      </div>

      
      
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          <div class="relative mt-3 md:hidden">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
          </div>
          <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
  );
}
