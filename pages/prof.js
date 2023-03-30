import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button, Modal, Label, TextInput,Accordion } from "flowbite-react";
import Image from 'next/image'
import { BiUserCircle } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { GrCurrency } from 'react-icons/gr';


function About() {
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
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false);
  const [chosencountry, setChosenCountry] = useState(null);
  const [chosencountryid, setChosenCountryId] = useState(null);
  const [adress, setAdress] = useState([]);
  useEffect(() => {
    const handleSearch = async (id) => {
      let response = await fetch("https://nakset.vercel.app/api/getUserAddress", {
        method: 'POST',
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
    if (session) {
      async function fetchText() {
        let response = await fetch('https://nakset.vercel.app/api/useradress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ id: session.id })
        });
        if (response.status === 200) {
          let data = await response.json();
          setAdress(data)
        }
      }
      fetchText();
    }
  }, [session]);
  const handleChangeCity = (e) => {
    setChosenCityId(e.target.value);
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setChosenCity(label)
  };
  const handleChangeCountry = async (e) => {
    console.log(e.target.value)
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setChosenCountryId(e.target.value)
    setChosenCountry(label)
    let response = await fetch("https://nakset.vercel.app/api/getCitys", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ id: parseInt(e.target.value) })
    });
    let result = await response.json(response);
    setCity(result)
    if (result.length > 0) {
      setChosenCityId(result[0].id)
      setChosenCity(result[0].name)
    } else {
      setChosenCityId(null)
      setChosenCity('')
    }
  };
  function onClick() {
    setOpen(prev => !prev)
  }
  async function updateAdress() {
    setMessage(false)
    setMessageError(false)
    setError(true)
    if (postal == null || postal.length <= 0 || postal == undefined || chosencountry == undefined || chosencountry == null || chosencity == undefined || chosencity == null || building == undefined || building == null || building.length <= 0) { setError(true); return false }
    let response = await fetch("https://nakset.vercel.app/api/updateAddress", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ country: chosencountry, city: chosencity, postal: postal, build: building })
    });
    let result = await response.json(response);
    if (result.error == 1) {
      setMessageError(true)
    } else {
      setAdress([result.address])
      setMessage(true)
      setTimeout(() => {
        setMessage(false)
      }, 2000);
    }
  }
  return (
    <div className="container min-h-screen  mx-auto pt-32    ">
      <div className='flex flex-col  justify-center items-center self-center w-full'>
        {session ? <img src={session.photo} width="300" height="300"></img> : <></>}
        {session ? <p className='font-bold text-4xl bg-blue-400 w-screen text-center'>{session.name}</p> : <></>}
      </div>

<p className='text-start text-black font-serif font-bold text-4xl'> my profile</p>



      <Accordion alwaysOpen={true}>
      
  <Accordion.Panel>
  

    <Accordion.Title >
        <div className='flex justify-center gap-4 items-center flex-row'>
       <BiUserCircle size={40} className="h-full " color="black"></BiUserCircle>
   <div className='flex flex-col'>
   
   <p className='text-start text-lg'>full name</p> <p className='text-start text-lg' >Hamza mammadi</p>
   </div>
  </div>

    </Accordion.Title>
    <Accordion.Content>
      
    <div className='bg-slate-300' >
        <div className='w-full h-1/2 grid grid-cols-1 md:grid-cols-2   p-6 '>
          <div  >
            <div className="mb-2 block  ">
              <Label
                htmlFor="username"
                value="username"
              />
            </div>
            <TextInput
              id="username"
              type="username"
              placeholder="your name"
              required={true}
              shadow={true}
              disabled={true}
              value={session ? session.name : ""}
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </div>
         
         
        </div>
        <div className='w-full items-center p-2  h-12 flex flex-row-reverse'>
          <Button>save personal information</Button>
        </div>
      </div>
    </Accordion.Content>
  </Accordion.Panel>
   
  <Accordion.Panel>
  <Accordion.Title >
        <div className='flex justify-center gap-4 items-center flex-row'>
       <CiLocationOn size={40} className="h-full " color="black"></CiLocationOn>
   <div className='flex flex-col'>
   
   <p className='text-start text-lg'>Address</p> {adress.length > 0 ? (<p className='text-base md:text-2xl font-medium'>your address : {adress[0].country + ',' + adress[0].city + ',' + adress[0].postal + ',' + adress[0].street}</p>
        ) : <p>no adress exist go to your profile and add your address first</p>}
   </div>
  </div>

    </Accordion.Title>
    <Accordion.Content>
    <p className='text-center mt-10 bg-blue-400 text-3xl font-mono'>User adress </p>
      <div className='bg-gray-500 flex justify-center items-center flex-col'  >
        
        <Button onClick={onClick}>
          Edit address
        </Button>
        <Modal
          show={open}
          size="md"
          popup={true}
          onClose={() => setOpen(false)}
        >
          <Modal.Header />
          {/* <p className='text-black text-center'>Adress</p> */}
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
                  <select className="rounded-lg w-full" onChange={async (e) => { await handleChangeCountry(e) }} value={chosencountryid} >
                    {country.map((res, index) => {
                      return (
                        <option key={res.id} value={res.id}>{res.name}</option>
                      )
                    })}
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


                    {city.map((res, index) => {
                      if (index == 0)
                        return (<option key={res.id} value={res.id}>{res.name}</option>
                        )
                      else
                        return (
                          <option key={res.id} value={res.id}>{res.name}</option>
                        )
                    })}
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
                    onChange={(e) => { setPostal(e.target.value) }}
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
                    onChange={(e) => { setBuilding(e.target.value) }}
                  />
                </div>
              </div>
              <div className='w-full items-center p-2  h-12 flex flex-row-reverse'>
                <Button onClick={async () => { await updateAdress() }}>save new address</Button>
              </div>
              {msg && <p className='text-green-500 font-bold text-lg text-center'>Your adress has been updated</p>
              }
              {msgerror && <p className='text-red-500 font-bold text-lg text-center'>Your adress id wrong</p>
              }
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </Accordion.Content>
  </Accordion.Panel>











  <Accordion.Panel>
  <Accordion.Title >
        <div className='flex justify-center gap-4 items-center flex-row'>
       <AiOutlineMail size={40} className="h-full " color="black"></AiOutlineMail>
   <div className='flex flex-col'>
   
   <p className='text-start text-lg'>Email</p> <p className='text-start text-lg' >your Email here</p>
   </div>
  </div>

    </Accordion.Title>
    <Accordion.Content>
    <div   >
            <div className="mb-2 block ">
              <Label
                htmlFor="email"
                value="your email"
              />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="your email "
              required={true}
              shadow={true}
              disabled={true}
              value={session ? session.email : ""}
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </div>
    </Accordion.Content>
  </Accordion.Panel>


  <Accordion.Panel>
  <Accordion.Title >
        <div className='flex justify-center gap-4 items-center flex-row'>
       <BsTelephone size={40} className="h-full " color="black"></BsTelephone>
   <div className='flex flex-col'>
   
   <p className='text-start text-lg'>Phone</p> <p className='text-start text-lg' >your Phone here</p>
   </div>
  </div>

    </Accordion.Title>
    <Accordion.Content>
    <div  >
            <div className="mb-2 block">
              <Label
                htmlFor="phone"
                value="phone"
              />
            </div>
            <TextInput
              id="phone"
              type="phone"
              placeholder="your name"
              required={true}
              shadow={true}
              disabled={true}
              value="ll;k;"
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </div>
    </Accordion.Content>
  </Accordion.Panel>
  

  <Accordion.Panel>
  <Accordion.Title >
        <div className='flex justify-center gap-4 items-center flex-row'>
       <GrCurrency size={40} className="h-full " color="black"></GrCurrency>
   <div className='flex flex-col'>
   
   <p className='text-start text-lg'>Currency</p> <p className='text-start text-lg' >your Currency here</p>
   </div>
  </div>

    </Accordion.Title>
    <Accordion.Content>
     
    </Accordion.Content>
  </Accordion.Panel>   


</Accordion>




 


      
     
    </div>

  )
}

export default About
