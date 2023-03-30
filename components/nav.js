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
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };


    const [open2, setOpen2] = React.useState(false);
  
    const handleDrawerOpen2 = () => {
      setOpen2(true);
    };
  
    const handleDrawerClose2 = () => {
      setOpen2(false);
    };




  const {t} = useTranslation()
  const count = useSelector((state) => state.counter.counter)
  const curr = useSelector((state) => state.counter.currency)

const [language, setLanguage] = useState('US');
  const {data:session,status}= useSession()

  return (
<div className="  z-50 fixed flex flex-col justify-center items-center w-screen">
    <Navbar style={{borderBottom: '1px solid gray'}}
  className="w-screen gap-10  flex-col-reverse  shadow-2xl   rounded-r-lg  bg-zinc-900  bg-opacity-70    flex justify-center items-center "

>



  <Navbar.Brand className="hidden md:block " href="/">
    <p className={`text-white font-bold text-3xl ${ibm.variable} font-sans`}>Nakset</p>
  </Navbar.Brand>

   <div className=" md:order-last order-1 flex flex-wrap justify-center items-center">
    
    <Navbar.Toggle  />

 <div className="flex flex-row items-center justify-center  md:order-last" >
  <p className="hidden md:block  mx-2 text-white font-black ">|</p>



  <Dropdown
  arrowIcon={false}
  inline={true}
  label={ <p className="text-white text-base mx-2">{curr.toUpperCase()}</p>}
>


  <Dropdown.Item onClick={()=>dispatch(adjustcurr({curr:"huf",sym:"ft",value:huf}))} >
  <p className="text-black text-base">HUF</p>
  </Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item onClick={()=>dispatch(adjustcurr({curr:"usd",sym:"$",value:usd}))}>
  <p className="text-black text-base">USD</p>
  </Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item  onClick={()=>dispatch(adjustcurr({curr:"eur",sym:"€",value:1}))}>
   <p className="text-black text-base">EUR</p>
  </Dropdown.Item>



</Dropdown>

  
      
     
     
    
   


<Link href="" onClick={handleDrawerOpen}   className="relative mx-2">
  <p className="text-white text-base  absolute -top-1 left-0 bg-red-700 rounded-full" >{count}</p>
<RiShoppingBasketFill size={30}  cursor="pointer"   color='white' className="mx-2" ></RiShoppingBasketFill>
   </Link>
   {




     session?(<Dropdown

      arrowIcon={false}
      inline={true}
      label={<Avatar className="w-10 h-10 mx-2"   alt="User settings" img={session.photo} rounded={true} />}


    >
<Link href="/profile"    >
      <Dropdown.Item >
      {/* {t("text:my information")} */}
      user profile
      </Dropdown.Item></Link>
      <Dropdown.Divider />
      <Dropdown.Item onClick={async()=>{signOut()}}>
      {t("text:logout")}
      </Dropdown.Item>
    </Dropdown>):<Link className="mx-2" href="sum"><Button   className='flex flex-row-reverse justify-around items-center '  >
 <p>{t("text:login")}</p>

    </Button></Link>}

</div>
    
    
 
  <Navbar.Collapse className="flex flex-wrap flex-col md:flex-row justify-center items-center">
<div className="flex  sm:flex-row flex-col justify-center flex-wrap gap-3 md:order-last order-1">


   <div className=" h-10 hover:border-b-2 hover:border-b-yellow-300 flex justify-center items-center">
    <Link  className="text-center" href="/" >
    <p className="text-white uppercase text-center">{t("text:home")}</p>
    </Link></div>
    <div className=" h-10 hover:border-b-2 hover:border-b-yellow-300 flex justify-center items-center">
    <Link className="  " href="/About">
      <p className="text-white uppercase">{t("text:about us")}</p>
    </Link>
    </div>
    <div className=" h-10 hover:border-b-2 hover:border-b-yellow-300 flex justify-center items-center">
    <Link className=" " href="/orders">
      <p className="text-white uppercase">my orders</p>
    </Link>
    </div>
    <div className=" h-10 hover:border-b-2 hover:border-b-yellow-300 flex justify-center items-center">
    <Link className="   " href="/">
    <p className="text-white uppercase">{t("text:partners")}</p>
    </Link>
    </div>
    <div className=" h-10 hover:border-b-2 hover:border-b-yellow-300 flex justify-center items-center">
    <Link className=" " href="/">
    <p className="text-white uppercase">FAQ</p>
    </Link>
    </div>
    <div className=" h-10 hover:border-b-2 hover:border-b-yellow-300 flex justify-center items-center">
    <div   onClick={handleDrawerOpen2} >
    <p className="text-white uppercase">wich list</p>
    </div>
    </div>
    <div className=" h-10 hover:border-b-2 hover:border-b-yellow-300 flex justify-center items-center">
      
    <Dropdown

arrowIcon={false}
inline={true}
label={  <ReactCountryFlag
className="mx-2"
  countryCode={flag}
  svg
  style={{
      width: '2em',
      height: '2em',
  }}
  title="US"
/>}


>


<Dropdown.Item >
  <Link href={{ pathname, query }} as={asPath} locale="en">
<ReactCountryFlag
          countryCode="US"
          svg
          style={{
              width: '2em',
              height: '2em',
          }}
          title="US"
      />
      </Link>
</Dropdown.Item>
{/* <Dropdown.Divider />
<Dropdown.Item >
<Link href={{ pathname, query }} as={asPath} locale="de">
<ReactCountryFlag
          countryCode="DE"
          svg
          style={{
              width: '2em',
              height: '2em',
          }}
          title="US"

      />
      </Link>
</Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item  >
<Link href={{ pathname, query }} as={asPath} locale="tr">
<ReactCountryFlag

          countryCode="TR"
          svg
          style={{
              width: '2em',
              height: '2em',
          }}
          title="US"
      /></Link>
</Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item  >
<Link href={{ pathname, query }} as={asPath} locale="fr">
<ReactCountryFlag
          countryCode="FR"
          svg
          style={{
              width: '2em',
              height: '2em',
          }}
          title="US"
      /></Link>
</Dropdown.Item>
<Dropdown.Item  >
<Link href={asPath } as={asPath} locale="ar">
<ReactCountryFlag
          countryCode="SA"
          svg
          style={{
              width: '2em',
              height: '2em',
          }}
          title="US"
      /></Link>
</Dropdown.Item> */}
</Dropdown>
    </div>
</div>
   

        
<div className=" flex flex-row-reverse order-1 justify-center items-center " >
     { opensearch && (<div  className=" w-full flex flex-col flex-wrap justify-center items-center ">
 <input
            className="w-72   bg-white  border-white   "
            id="Search"
            type="Search"
            placeholder="Search for a products"
            required={true}
            shadow={true}
           
            onChange={async(e)=>{ if(e.target.value.length==0){setShowDrop(false)} await search2(e)}}
          />



 </div>) }
    </div>

  </Navbar.Collapse>
 

    </div>

 </Navbar>

 

 {showdrop && opensearch && (<div className="w-full rounded-sm border-gray-400 border-2 mx-5 top-12 left-1/2 h-96 bg-white">
   
{result.length>0?result.map((element,index)=>{
return(<div key={index} className="w-full  bg-slate-200 mb-5 flex border-b-2 border-white  justify-start items-start ">
<Image width="100" height="100" src={element.photo} ></Image>
<div className="flex justify-evenly flex-col items-start">
<p className="text-black font-bold">{element.name}</p>
<p className="text-black font-bold">{element.price}eur  for{element.baseQuantity} {element.unit}</p>


</div>
</div> )
}):(<p className="w-full  bg-slate-200 mb-5 flex border-b-2 border-white  justify-center items-start text-center font-bold text-3xl ">no results</p>)}
  

 </div>)}
 <Drawer
        sx={{
          width: "auto",
          
          '& .MuiDrawer-paper': {
            width: "auto",
          },
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
</div>
  );
}
