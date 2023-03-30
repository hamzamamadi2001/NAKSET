import {  Navbar,Dropdown,Avatar } from "flowbite-react";
import Image from 'next/image'
import Link from 'next/link'
import Basket from "../pages/basket"
import {useSession,signOut} from 'next-auth/react'
import { Button} from "flowbite-react";
import { RiShoppingBasketFill } from 'react-icons/ri';
import { BiSearch, BsSearch } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux'
import ReactCountryFlag from "react-country-flag"
// import { Language } from "@mui/icons-material";
import { adjustcurr} from '../slices/CounterSlice'
import DDrawer from "../components/drawer"
import { useState,useEffect } from "react";
import {useRouter} from "next/router"
import useTranslation from 'next-translate/useTranslation'
import {IBM_Plex_Serif} from "@next/font/google"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FaUserAlt } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import Test from "./bas"

const drawerWidth = "100%";
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
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



  const [opensearch, setOpenSearch] = useState(true);

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



  

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [shadow, setShadow] = React.useState(false);

  
    const handleDrawerOpen = () => {
      setOpen(true);
      setShadow(true)
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
      setShadow(false)

    };


    const [open2, setOpen2] = React.useState(false);
  
    const handleDrawerOpen2 = () => {
     setOpen2(true);
     setShadow(true)

     };
  
    const handleDrawerClose2 = () => {
      setShadow(false)
      setOpen2(false);
    };

    const [open3, setOpen3] = React.useState(false);
  
    const handleDrawerOpen3 = () => {
      setShadow(true)
      setOpen3(true);
    };
  
    const handleDrawerClose3 = () => {
      setShadow(false)
      setOpen3(false);
    };




  const {t} = useTranslation()
  const count = useSelector((state) => state.counter.counter)
  const curr = useSelector((state) => state.counter.currency)

const [language, setLanguage] = useState('US');
  const {data:session,status}= useSession()
  return (
  <>
    
           
            <Link href="" onClick={handleDrawerOpen}   className="relative mx-2">
  <p className="text-white text-base  absolute -top-1 left-0 bg-red-700 rounded-full" >{count}</p>
<RiShoppingBasketFill size={25}  cursor="pointer"   color='white' className="mx-2" ></RiShoppingBasketFill>
   </Link>
             
        
   

    <Drawer
        sx={{
          width: "auto",
          
          '& .MuiDrawer-paper': {
            width: "auto",
          },
          zIndex:"100"
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <p>Continue shopping</p>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

       <Basket></Basket>
        
        
      </Drawer>


      <Drawer
      
        sx={{
          width: "auto",
          
          '& .MuiDrawer-paper': {
            width: "auto",
          },
          zIndex:"100"
        }}
        variant="persistent"
        anchor="top"
        open={open2}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose2}>
            <p>Continue shopping</p>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

       <Basket></Basket>
        
        
      </Drawer>



      
      <Drawer
      
        sx={{
          width: "auto",
          
          '& .MuiDrawer-paper': {
            width: "auto",
          },
          zIndex:"100"
        }}
        variant="persistent"
        anchor="left"
        open={open3}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose3}>
            <p>Continue shopping</p>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

       <Basket></Basket>
        
        
      </Drawer>
      


    

      {/* {shadow && (<div onClick={()=>{handleDrawerClose3();handleDrawerClose2();handleDrawerClose();setShadow(false)}} className="bg-black fixed bg-opacity-70 w-screen h-screen z-30"></div>)} */}
    </>
  );
}
