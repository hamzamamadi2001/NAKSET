import React ,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { ImLocation2 } from 'react-icons/im';
import { TbMoodEmpty } from 'react-icons/tb';
import { MdOutlineFoodBank } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiPackage } from 'react-icons/fi';

 
import {useSession} from 'next-auth/react'
import {Table,Timeline}from "flowbite-react";
import Image from 'next/image';


 
 
ImLocation2

function About() {
  const {data:session,status}= useSession()

    const items = useSelector((state) => state.counter.items)
    const symbol = useSelector((state) => state.counter.Symbol)
    const currencyValue = useSelector((state) => state.counter.currencyValue)
const [orders, setOrders] = useState([]);
const [order, setRealOrders] = useState(null);

    const totalPrice = useSelector((state) => state.counter.totalPrice)


     
    useEffect(async () => {
    

    
   
 
    
        async function fetchText() {
        let response = await fetch('https://nakset.vercel.app/api/orders',{method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
       });
       
      
        if (response.status === 200) {
            let data = await response.json();
            setOrders(data.reverse())
           
             
        }
      }
      
      await fetchText();
     
      
      }, [ ]);
   

 
 
  return (
    < >
            
    <div className='container mx-auto    grid      '>
  
 {orders && orders.map((ele) => (
    <div key={ele.id} >









<Timeline className='flex justify-evenly mt-20 ' horizontal={true}>
  {<Timeline.Item className={ele.status=="verifing"?'animate-bounce':""}>
    <Timeline.Point  color='green' icon={MdOutlineFoodBank} />
    <Timeline.Content>
      <Timeline.Title>
       Preparing now
      </Timeline.Title>
      
     
    </Timeline.Content>
  </Timeline.Item>}
  {(ele.status=="deliverd"||ele.status=="way") &&<Timeline.Item className={ele.status=="way"?'animate-bounce ':""}>
    <Timeline.Point color='red' icon={TbTruckDelivery} />
    <Timeline.Content>
      <Timeline.Title>
      On the way
      </Timeline.Title>
      
      
    </Timeline.Content>
  </Timeline.Item>}
 {ele.status=="deliverd" &&<Timeline.Item className={ele.status=="deliverd"?'animate-bounce':""}>
    <Timeline.Point icon={FiPackage} />
    <Timeline.Content>
      <Timeline.Title>
        Deliverd
      </Timeline.Title>
      
      
    </Timeline.Content>
  </Timeline.Item>}
</Timeline>












    
    <div className='bg-orange-300 rounded-t-3xl flex justify-center items-center '><p className='text-green-700'>{ele.date}</p></div>
    
    <Table  striped={true}    >
   <Table.Head>
  <Table.HeadCell  >
      Product image
    </Table.HeadCell>
    <Table.HeadCell  >
      Product information
    </Table.HeadCell>
    </Table.Head>
  <Table.Body >  
    
      {JSON.parse(ele.order).map((el) => (
      <>
    <Table.Row  key={ele.id}>  
      <Table.Cell className='w-1/12'  >
        <Image src={el.photo} width="100" height="100"></Image>
        </Table.Cell>
        
        
      <Table.Cell className='bg-gray-300 '>
       <p className='text-black font-mono font'>{"the quantity:"+el.quantity+" "+el.unit}</p>
       <p className='text-black font-mono font'>product name : {el.name}</p>

        </Table.Cell>
        
       
    
     </Table.Row>
     <hr className='w-full h-1'></hr>
     
</>
  ))}
 

 
    
         </Table.Body>
         </Table>
    <div className='bg-gray-300 rounded-b-3xl flex justify-center items-center w-fit p-3 '><p className='text-black font-semibold'>total: {ele.total} {ele.currency}</p></div>
         
         </div>
         ))}

{orders.length<=0 &&<div className='flex min-h-screen flex-col justify-center items-center'>
         <p className='text-cneter text-2xl font-mono'>You dont have any orders</p>
     <TbMoodEmpty color='gray' size={100}></TbMoodEmpty>
     </div> }

    </div>
    </>
  )
}

export default About
