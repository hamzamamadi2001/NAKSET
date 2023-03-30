import { TextInput,Button,Footer,Textarea} from "flowbite-react";
import { useState, useEffect } from "react";
import useTranslation from 'next-translate/useTranslation'

 


export default function App() {
  const [email, setEmailList] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const {t} = useTranslation()

  const validateEmail = (email) => {
    var result = String(email)
      .toLowerCase()
      .match(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/   );
        if(result==null)  {  return false}
        else{ return true}

  };
  
  const validName = (name) => {
    var name = name.replace(/^[ ]+/g, "");
    if(name.length==0 || name=="" || name==null || name==undefined ||   name==" " ) {return false}
    return true
  };
  
  const validMessage = (message) => {
    var name = message.replace(/^[ ]+/g, "");
    if(name.length==0 || name=="" || name==null || name==undefined ||   name==" " ) {return false}
    return true

  };
  const sendMessage =async () => {

    if(!validateEmail(email)||!validName(name)||!validMessage(message))
    {
      return 
    }
          
          let response = await fetch("https://nakset.vercel.app/api/sendMessage",{method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({email:email,name:name,message:message})});
               let result = await response.json(response);
     
        };
  return (
<Footer className="w-full bg-gray-800 rounded-none mt-10" container={true}>
  <div className="w-full  ">
    <div className="grid w-full grid-cols-1 justify-between sm:flex sm:justify-between md:flex md:grid-cols-2">
      <div className="flex flex-col w-full justify-center md:w-1/2">
      <p className='text-center text-yellow-500 text-5xl md:text-6xl font-tar  my-2  '>{t("text:contact us")}</p>


         
          <input
         className= "mb-5 bg-blue-200"
           id="Email"
           type="text"
           placeholder={t("text:your name")}
           required={true}
           shadow={true}
           onChange={(e)=>{setName(e.target.value)}}
         />
         <input
         className= "mb-5 bg-blue-200"
           id="Email"
           type="Email"
           placeholder={t("text:your email")}
           required={true}
           shadow={true}
           onChange={(e)=>{setEmailList(e.target.value)}}
         />
        <Textarea
    id="comment"
    className="mb-5 bg-blue-200"
    placeholder={t("text:write message")}
    required={true}
    onChange={(e)=>{setMessage(e.target.value)}}

    rows={4}
  />


            <Button onClick={async()=>{await sendMessage()}}  className='w-1/2 mb-5 justify-center'  >
  <p>{t("text:send message")}</p>

     </Button>


      </div>
      <div className="mx-5 grid grid-cols-2 gap-8 sm:mt-4    ">

        <div>
          <p className="text-yellow-500 mb-5">{t("text:hours of work")}</p>
 
          <lu>
            <li className="text-white">Monday from ... to ...</li>
            <li className="text-white">Tuesday from ... to ...</li>
            <li className="text-white">Wedensday from ... to ...</li>
            <li className="text-white">Thursday from ... to ...</li>
            <li className="text-white">Friday from ... to ...</li>


          </lu>
        </div>
        <div>
           <p className="text-yellow-500">{t("text:legal")}</p>

          <Footer.LinkGroup col={true}>
            <Footer.Link href="/">
           <p className="text-white"> {t("text:privacy plicy")}</p>
            </Footer.Link>
            <Footer.Link href="/">
           <p className="text-white"> {t("text:terms and conditions")}</p>

             </Footer.Link>
          </Footer.LinkGroup>
        </div>
      </div>
    </div>
    <Footer.Divider />
    <div className="w-full sm:flex sm:items-center sm:justify-between">
      <Footer.Copyright
      color="white"
    className="text-white bg-white"
        href="/"
        by="Nakset™"
        year={2023}
      />

    </div>
  </div>
</Footer>
   );
}
