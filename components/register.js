import {  Text } from "@nextui-org/react";
import { Label,TextInput,Checkbox,Button,Spinner } from "flowbite-react";
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { BsApple } from 'react-icons/bs';
import React,{useState} from 'react'
import {signIn,signOut,useSession} from 'next-auth/react'
import { useRouter } from 'next/router'
  import { BsTwitter } from 'react-icons/bs';
import { Suranna } from "@next/font/google";
import {Link} from "next/link"

function Register() {
  const [checked, setChecked] = React.useState(false);
  const [existerror, setExistError] = React.useState(false);
  const [sending, setSending] = React.useState(false);


  const handleChange = () => {
    setInput(prev => ({
      ...prev,
      ["condition"]: !input.condition
    }));
    var e ={target:{name:"condition" , value:!input.condition}}
    validateInput(e);

  };
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email:"",
    condition:false,
  });
 
  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email:"",
    condition:"",
  })
  function validateName(name){
    
    if(name == null || name == undefined || name.length<=0){
      return false
    }
    name = name.replace( / +/g, ' ')
    if (name.length<4) {
      return false
    }
    return true
  }
  function validatePassword(pass1,pass2){
    if(pass1 == null || pass2==null ||pass1==undefined || pass2 == undefined){
      return false
    }
     
    if (checkPassword(pass1)==false ||pass1 != pass2|| pass1.length<8) {
      return false
    }
    return true
  }
  const inputText =()  => {
     if(validateName(input.username)==false||validateEmail(input.email)==false||validatePassword(input.password,input.confirmPassword)==false||input.condition==false){
       return false
     }
     return true
  }
 
  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
      setExistError(false)
      switch (name) {
        case "username":
          if (!value||value.length<4) {
            stateObj[name] = "Please enter Username contain more then 4 characters.";  
          }
          break;

        case "password":
          if (!value || checkPassword(value)==false) {
            stateObj[name] = " password must be at least 8 characters long, contains upper, lower letter and special characters ";  
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";  
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;  
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password."; 
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";  
          }
          break;
          case "email":
          if (!value || validateEmail(value)==false) {
            stateObj[name] = "Please enter a valid email.";  
          }  
          break;
          case "condition":
            if (value==false) {
              stateObj[name] = "you must to accepte our conditions";  
            }  
            break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }


  
  function checkPassword(str)
  {

    if(str==null || str==undefined||str.length<=0){
      return false
    }
    

      var re = /^(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*$/;
      return re.test(str);
  }
  const validateEmail = (email) => {
    if(email == undefined || email==null) { return false}
          var result = String(email)
      .toLowerCase()
      .match(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/   );
        if(result==null)  {  return false}
        else{ return true}

  };
  
  const router = useRouter()

async function handelRegister(e){
  console.log("this is demo data",input.email,input.username,input.password,input.condition,input.confirmPassword)
  setLoading(true);
  if(!inputText()){
  setSending(true)
  setLoading(false);
  

    return 
  }
  e.preventDefault()
  let user={
    email:input.email,
    password:input.password,
    username:input.username,
    mobile:mobile,
    phone:phone,
    address:address,
    firstname:firstname,
    surname:surname,
    title:title,
    householdnumber:householdnumber,
    under18:under18,
    birthday:`${day}/${mounth}/${year}`
  }
  console.log(user)
  //rememper to replace the url before uploading it to the server https://nakset.vercel.app/api/register
  let response = await fetch("https://nakset.vercel.app/api/register",{method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)});

let commits = await response.json();
 if(commits.result.error){
  setError2("this email already exists")
  setLoading(false);

  return
}else{
   
 await  signIn('credentials', { redirect: false, password: input.password,email:input.email}).then((res)=>{console.log(res);if(res.ok){router.push('/')}else{setError("there was a problem")}})
  setLoading(false);

}
 
}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, rsetPassword] = useState("");
  const [username, setUsername] = useState("");

  const [day, setDay] = useState("NI");
  const [mounth, setMounth] = useState("NI");
  const [year, setYear] = useState("NI");

  const [title, setTitle] = useState("mr");
  const [address, setAddress] = useState("NI");

  const [firstname, setFirstName] = useState("NI");
  const [surname, setSurname] = useState("NI");
  const [phone, setPhone] = useState("NI");
  const [mobile, setMobile] = useState("NI");
  const [householdnumber, setHouseHoldNumber] = useState("NI");
  const [under18, setUnder18] = useState("NI");



  const [error2, setError2] = useState("");
 

  const [loading, setLoading] = useState(false);
  return (
    <form className="flex md:w-screen mx-3 mt-24 justify-center items-center h-screen flex-col gap-4 ">
      <div className="w-full">
    <p className='text-center text-gray-700 font-bol font-serif text-4xl'>Extra information</p>
    <div className="w-full flex justify-center items-center flex-wrap">

    <select onChange={(e)=>{setTitle(e.target.value);console.log(e.target.value)}} className='w-72 h-14 placeholder-slate-900'  defaultValue={"no values yet"}>
  <option value="mr">mr</option>
  <option value="sir">sr</option>
  <option value="madam">madam</option>

</select>
   
        

        <input
           className='w-72 h-14 placeholder-slate-900'

          type="text"
          name="username"
          placeholder='First name'
          value={firstname}
          onChange={(e)=>{setFirstName(e.target.value)}}
          onBlur={validateInput}></input>


<input
           className='w-72 h-14 placeholder-slate-900'

          type="text"
          name="username"
          placeholder='Surname'
          value={surname}
          onChange={(e)=>{setSurname(e.target.value)}}
          onBlur={validateInput}></input>


          </div>

         <div className="w-full flex flex-col justify-center items-center gap-5">
         <input
           className='w-72 mt-5 h-14 placeholder-slate-900'

          type="text"
          name="address"
          placeholder='shipping address'
          value={address}
          onChange={(e)=>{setAddress(e.target.value)}}
          ></input>

           <input
           className='w-72 h-14 placeholder-slate-900'

          type="text"
          name="phone"
          placeholder='phone'
          value={phone}
          onChange={(e)=>{setPhone(e.target.value)}}
          ></input>

<input
           className='w-72 h-14 placeholder-slate-900'

          type="text"
          name="mobile"
          placeholder='mobile'
          value={mobile}
          onChange={(e)=>{setMobile(e.target.value)}}
          ></input>
         </div>

         <div className="w-full flex justify-center items-center flex-wrap">
         <select onChange={(e)=>{setDay(e.target.value);console.log(e.target.value)}} className='w-72 h-14 placeholder-slate-900'  defaultValue={"no values yet"}>
         <option value="1">1</option>
         <option value="2">2</option><option value="3">3</option><option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option><option value="7">7</option><option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option><option value="11">11</option><option value="12">12</option>
         <option value="13">13</option>
         <option value="14">14</option><option value="15">15</option><option value="16">16</option>
         <option value="17">17</option>
         <option value="18">18</option><option value="19">19</option><option value="20">20</option>
         <option value="21">21</option>
         <option value="22">22</option><option value="23">23</option><option value="24">24</option>
         <option value="25">25</option>
         <option value="26">26</option><option value="27">27</option><option value="28">28</option>
         <option value="29">29</option>
         <option value="30">30</option> 

</select>

<select onChange={(e)=>{setMounth(e.target.value);console.log(e.target.value)}} className='w-72 h-14 placeholder-slate-900'  defaultValue={"no values yet"}>
<option value="1">1</option>
         <option value="2">2</option><option value="3">3</option><option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option><option value="7">7</option><option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option><option value="11">11</option><option value="12">12</option>

</select>
<select onChange={(e)=>{setYear(e.target.value);console.log(e.target.value)}} className='w-72 h-14 placeholder-slate-900'  defaultValue={"no values yet"}>
<option value="1980">1980</option><option value="1981">1981</option><option value="1982">1982</option>
         <option value="1983">1983</option>
         <option value="1984">1984</option><option value="1985">1985</option><option value="1986">1986</option>
         <option value="1987">1987</option>
         <option value="1988">1988</option><option value="1989">1989</option><option value="1990">1990</option>
         <option value="1991">1991</option>
         <option value="1992">1992</option><option value="1993">1993</option><option value="1994">1994</option>
         <option value="1995">1995</option>
         <option value="1996">1996</option>
         <option value="1997">1997</option>
         <option value="1998">1998</option>
         <option value="1999">1999</option>
         <option value="2000">2000</option><option value="2001">2001</option>
         <option value="2002">2002</option><option value="2003">2003</option><option value="2004">2004</option>
         <option value="2005">2005</option>
         <option value="2006">2006</option><option value="2007">2007</option><option value="2008">2008</option>
         <option value="2009">2009</option>
         <option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option>
         <option value="2013">2013</option>
         

</select>
         </div>

      </div>
    <p className='text-center text-gray-700 font-bol font-serif text-4xl'>Create Account</p>
       <p className='w-full text-lg text-red-700 text-center'>{error2}</p>
       <p className='w-full text-lg text-red-700 text-center'>{(!inputText() || existerror)&&sending ?"you must fill out all fields":"" }</p>
       <input
           className='md:w-1/3 w-full h-14 placeholder-slate-900'

          type="text"
          name="username"
          placeholder='Enter Username'
          value={input.username}
          onChange={onInputChange}
          onBlur={validateInput}></input>
        {error.username && <span className='md:w-1/3 w-full break-words  text-red-600 font-bold text-xs'>{error.username}</span>}
 
        <input
            className='md:w-1/3  w-full h-14 placeholder-slate-900'

          type="email"
          name="email"
          placeholder='Enter your email'
          value={input.email}
          onChange={onInputChange}
          onBlur={validateInput}></input>
        {error.email && <span className='md:w-1/3 w-full break-words text-red-600 font-bold text-xs'>{error.email}</span>}



        <input
            className='md:w-1/3 w-full h-14 placeholder-slate-900'

          type="password"
          name="password"
          placeholder='Enter Password'
          value={input.password}
          onChange={onInputChange}
          onBlur={validateInput}></input>
        {error.password && <span className='md:w-1/3 w-full break-words text-red-600 font-bold text-xs'>{error.password}</span>}
 
        <input
            className='md:w-1/3 w-full  h-14 placeholder-slate-900'

          type="password"
          name="confirmPassword"
          placeholder='Enter Confirm Password'
          value={input.confirmPassword}
          onChange={onInputChange}
          onBlur={validateInput}></input>
        {error.confirmPassword && <span className='md:w-1/3  w-full  break-words text-red-600 font-bold text-xs'>{error.confirmPassword}</span>}
        <div className="flex items-center  gap-2">
        <Checkbox name="condition" id="agree"  checked={input.condition}
          onChange={handleChange}  />
        

        <Label htmlFor="agree">
          I agree with the{' '}
          <Link
            href="/forms"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </Link>
        </Label>
      </div>
      {error.condition && <span className='text-red-600 font-bold text-xs'>{error.condition}</span>}      
      <button  className='w-1/2 md:w-1/5 bg-inherit hover:bg-gray-300 font-bold p-5 text-gray-500 hover:text-black border-gray-400 border-2 text-gra' disabled={loading} onClick={ async (e)=>{  handelRegister(e)}}  gradientDuoTone="greenToBlue">
      {loading?<Spinner
    color="info"
    aria-label="Info spinner example"
  />:"Register"}
    </button>
    <Label htmlFor="agree">
    Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-600 my-4 hover:underline dark:text-blue-500"
          >
            login
          </Link>
        </Label>
      <div className='flex justify-center items-center w-full'>
        
    <hr className='bg-black h-1 w-1/5'></hr>
     <p className='font-paris'>or by</p>
     <hr className='bg-black h-1 w-1/5'></hr>

  </div>
 
  


  <Button  style={{width:"50%"}}  onClick={async (e)=>{ e.preventDefault(); signIn("google",{callbackUrl:"https://nakset.vercel.app"}).then((res)=>{console.log(res)})}} className='flex flex-row-reverse justify-around items-center w-full' outline={true}
      color="light">
    <FcGoogle  className="mr-2"></FcGoogle>
     <p>Google</p>
    </Button>

    <Button style={{width:"50%"}} onClick={async (e)=>{ e.preventDefault(); signIn("twitter",{callbackUrl:"https://nakset.vercel.app"}).then((res)=>{console.log(res)})}}  className='flex flex-row-reverse justify-around items-center w-full' outline={true}
     color="light">
<BsTwitter color='#1d9bf0' className="mr-2" ></BsTwitter>
<p>twitter</p>

    </Button>
  <Button style={{width:"50%"}} onClick={async (e)=>{ e.preventDefault(); signIn("facebook",{callbackUrl:"https://nakset.vercel.app"}).then((res)=>{console.log(res)})}} className='flex flex-row-reverse justify-around items-center w-full' outline={true}
      color="light">
<BsFacebook color='blue' className="mr-2" ></BsFacebook>
<p>Facebook</p>

    </Button>
    </form>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default Register