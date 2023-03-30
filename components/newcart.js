import React ,{useState,useEffect} from 'react'
import { Button} from "flowbite-react";
import {useSession} from 'next-auth/react'
import CardBasket from '../components/CartBbasket'
import { useSelector } from 'react-redux'
import { ImLocation2 } from 'react-icons/im';
import { TbMoodEmpty } from 'react-icons/tb';
import Bay from '../pages/pay'
import Image from 'next/image'


 
import {Table,Modal,Label,TextInput,Checkbox}from "flowbite-react";

 
ImLocation2

function About() {




  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




   const [building, setBuilding] = useState('');
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [postal, setPostal] = useState('');
  const [chosencity, setChosenCity] = useState(null);
  const [chosencityid, setChosenCityId] = useState(null);
  const [isnew, setIsnew] = useState(false);
  const [oldadress, setOldAdress] = useState('');
  const [error, setError] = useState(false);
  const [msg, setMessage] = useState(false);
  const [msgerror, setMessageError] = useState(false);






  const [chosencountry, setChosenCountry] = useState(null);
  const [chosencountryid, setChosenCountryId] = useState(null);



  const handleChangeCity = (e) => {
    setChosenCityId(e.target.value);
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setChosenCity(label)
  };
  

  const handleChangeCountry =async (e) => {
    console.log(e.target.value)
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setChosenCountryId(e.target.value)
    setChosenCountry(label)

     let response = await fetch("https://nakset.vercel.app/api/getCitys",{method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({id:parseInt(e.target.value)})});
         
        let result = await response.json(response);
         setCity(result)
         if(result.length>0){
          setChosenCityId(result[0].id)
         setChosenCity(result[0].name)
         }else{
          
          setChosenCityId(null)
         setChosenCity(null)
         }
          


   
  };
 
  async function updateAdress(){
    setMessage(false)
    setMessageError(false)

     setError(true)
    console.log("thesse are the info ",chosencity,chosencountry)
    if(postal==null || postal.length<=0||postal == undefined || chosencountry == undefined || chosencountry==null || chosencity == undefined || chosencity==null || building == undefined || building==null ||building.length<=0){setError(true); return false}
    let response = await fetch("https://nakset.vercel.app/api/updateAddress",{method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({country:chosencountry,city:chosencity,postal:postal,build:building})});
 
  let result = await response.json(response);
  if(result.error==1){
    setMessageError(true)
  }else{
      setAdress([result.address])
  setMessage(true)
  setTimeout(() => {
    setMessage(false)
  }, 2000);
  }

  



  }











  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  const [open, setOpen] = useState(false);

function onClick(){
  setOpen(prev=>!prev)
}
  const {data:session,status}= useSession()
const [adress, setAdress] = useState([]);

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

     handleSearch()

    
   
 
if(session){
  async function fetchText() {
  let response = await fetch('https://nakset.vercel.app/api/useradress',{method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({id:session.id})});
 

  if (response.status === 200) {
      let data = await response.json();
      setAdress(data)
       
  }
}

fetchText();
}


}, [session]);











    const items = useSelector((state) => state.counter.items)
    const symbol = useSelector((state) => state.counter.Symbol)
    const currencyValue = useSelector((state) => state.counter.currencyValue)

    const totalPrice = useSelector((state) => state.counter.totalPrice)


    const [value, setValue] = useState(1);

  const handleChange = event => {
    
    const result = event.target.value.replace(/\D/g, '');
if(Number(result) <=1)
     { setValue(1)}
     else{
        setValue(Number(result));
     }
    
  };

   

  // 👇️ validation
  if (value !== '') {
    const num = Number(value);
    // 👉️ submit form
  }
  if(status=="loading"){
    return (
      <div className="flex justify-center items-center animate-bounce h-screen w-screen">      <Image src="/logo.png" width="100"height="100" ></Image>
</div>
    )
  }
  return (
    <div>
            <p className='text-center text-6xl font-tar font-bold text-white w-full bg-amber-600 p-20  '> your cart </p>

    <div className='container mx-auto mt-20 grid grid-flow-row gap-1 min-h-screen grid-cols-1 md:grid-cols-3'>
        
<div className=' col-span-2 rounded-2xl '> 
                 {items.length>0?(<>
      {session &&  <div>       
        <div className='/*Adress section*/ w-full p-2 border-blue-700 border-solid border-2 rounded-lg  '>
        <p className='text-2xl font-mono font-black '>adress of shipping</p>
        <div className='felx  w-full items-center flex-row'>
             
        <div className='   mb-3 flex justify-between items-center'>
{adress.length>0?(        <p  className='text-base md:text-2xl font-medium'>{adress[0].country+','+adress[0].city+','+adress[0].postal+','+adress[0].street}</p>
):<p>no adress exist go to your profile and add your address first</p>}        <React.Fragment>
<Button onClick={onClick}>
 Edit address
</Button>
<Modal
  show={open}
  size="md"
  popup={true}
  onClose={()=>setOpen(false)}
>
  <Modal.Header />
  <Modal.Body>
  <div className='bg-slate-300' > 
     <div className='w-full h-1/2 grid md:grid-cols-2 grid-cols-1   p-6 '>
      <div  > 
        <div className="mb-2 block  ">
          <Label
            htmlFor="country"
            value="country"
          />
        </div>
        <select className="rounded-lg w-full" onChange={async(e)=>{ await handleChangeCountry(e)}}   value={chosencountryid} >


        {country.map((res,index) =>{
          
          return (
           <option key={res.id}  value={res.id}>{res.name}</option>

                  )})}
                  </select>
      </div>
 

      <div   >
        <div className="mb-2 block ">
          <Label
            htmlFor="city"
            value="city"
          />
        </div>
        <select className="rounded-lg w-full" onChange={handleChangeCity} value={chosencityid} >


{city.map((res,index) =>{
  if(index==0)
  return(  <option key={res.id} value={res.id}>{res.name}</option>
  )
  else
  return (
   <option key={res.id}  value={res.id}>{res.name}</option>

          )})}
          </select>
      </div>
      <div >
        <div className="mb-2 block">
          <Label
            htmlFor="postal code"
            value="postal code"
          />
        </div>
        <TextInput
          id="postal code"
          type="postal code"
          placeholder="postal code"
          required={true}
          
value={postal}
          onChange={(e)=>{setPostal(e.target.value)}}
        />
      </div>
      <div >
        <div className="mb-2 block">
          <Label
            htmlFor="street,house/apartment/unit"
            value="street,house/apartment/unit"
          />
        </div>
        <TextInput
          id="phone"
          type="phone"
          placeholder="street,house/apartment/unit*"
          required={true}
            
value={building}
          onChange={(e)=>{setBuilding(e.target.value)}}
        />
      </div>
      

     
    
       


      </div>
      <div className='w-full items-center p-2  h-12 flex flex-row-reverse'>
  <Button onClick={async ()=>{await updateAdress()}}>save new address</Button>
</div>
{msg&&<p className='text-green-500 font-bold text-lg text-center'>Your adress has been updated</p>
}
{msgerror&&<p className='text-red-500 font-bold text-lg text-center'>Your adress id wrong</p>
}
</div>
  </Modal.Body>
</Modal>
</React.Fragment>
        </div> 
          
        {/* <Button >
      <ImLocation2 color='red' size={20} />
      change adress
    </Button>   */}
     </div>
        </div> 
       
 </div>  }
        
  
     
        {/* {items.map((res,index) => (
<CardBasket key={res.id} src={res.photo}   name={res.name} id={res.id} weight={res.weight} quantity={res.quantity}  price={res.priceUnit} baseQuantity={res.baseQuantity} idx={index} currencyValue={parseFloat(currencyValue)} currency={symbol}></CardBasket>

         
      ))} */}
          
           </>):(
<div className='flex flex-col justify-center items-center'>
         <p className='text-cneter text-2xl font-mono'>Your cart is empty</p>
     <TbMoodEmpty color='gray' size={100}></TbMoodEmpty>
     </div>    
         )}
        </div>
        <div className='  col-span-1'>
            <div className='w-full p-4 rounded-2xl bg-slate-400'>
                <p className='text-center text-white text-2xl'>Summary</p>
               <div className='px-4  mb-3 flex justify-between items-center'><p  className='text-2xl font-medium'>subtotal:</p><p>{(Math.round( totalPrice*currencyValue * 100) / 100).toFixed(2)+" "+symbol}</p></div> 
               <div className=' px-4 mb-3 flex justify-between items-center'> <p  className='text-2xl font-medium'>Delivery:</p><p>{totalPrice*currencyValue+" "+symbol}</p></div>
                <hr className='bg-gray-500 w-full h-1' ></hr>


                <div className=' px-4 mb-3 flex justify-between items-center'> <p>Total amount:</p><p className='text-2xl font-medium'>{(Math.round( totalPrice*currencyValue * 100) / 100).toFixed(2)+symbol }</p></div>
            </div>
            <div className='w-full p-4 mt-5 rounded-2xl bg-slate-500'>
             {session&&adress.length>0&&<Bay ></Bay>}
            </div>
            

            
             </div>




    </div>
    </div>
  )
}

export default About
 