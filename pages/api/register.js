 import {hash} from "bcrypt"
 import  prisma   from '../../lib/prismadb'

 export default async function handler(req ,res ){
  console.log("i am in registation",req.body)

  const validateEmail = (email) => {
    if(email == undefined || email==null) { return false}
          var result = String(email)
      .toLowerCase()
      .match(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/   );
        if(result==null)  {  return false}
        else{ return true}

  };
  if((typeof(req.body.password)!="string" ||req.body.password.length<8 ||typeof(req.body.email)!="string"||validateEmail(req.body.email)==false||typeof(req.body.username)!="string" ||  req.body.username.length<=0 )){
    return res.status(401).json({result:{error:1,result,message:"Invalid information"}}) 
   }
  
  let exist =  await   prisma.user.findUnique({ where: {
    email: req.body.email
  },})
  await prisma.$disconnect()
  console.log(exist)
  if(exist){
   return res.status(400).json({result:{error:1,message:"invalid information"}})  
  }

hash(req.body.password, 10).then( async function(hash) {

  
const result = await prisma.user.create({data:{email:req.body.email,password:hash,provider:"credentials",name:req.body.username,photo:"https://static.vecteezy.com/system/resources/previews/000/574/512/large_2x/vector-sign-of-user-icon.jpg",adress:{create:{address:req.body.address}},meta_info:{create:{firstname:req.body.firstname,surname:req.body.username,under18:req.body.under18,householdnumber:req.body.householdnumber,dateofbirth:req.body.birthday,mobile:req.body.mobile,phone:req.body.phone,title:req.body.title}}},include:{adress:true}}).finally(async()=>{prisma.$disconnect()})
 console.log(result)
  console.log("i am in 3333",result)
  if(result){
    let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
   
    host: "smtp.gmail.com",
    auth: {
      user: 'hamzamamadi39@gmail.com',
      pass:'cqglihvtoiydsjia',
    }, tls: {
      rejectUnauthorized: false
    },
    secure: true,
  })
  const mailData = {
    from :'hamzamamadi39@gmail.com',
    to: req.body.email,
    subject: `welcome to nakset`,
    text: "registration completed" ,
    html:  `<!DOCTYPE html>
    <!--Code By Webdevtrick ( https://webdevtrick.com )-->
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <title>HTML Email Template | Webdevtrick.com</title>
    </head>
    
    <body>
    
      <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    
    <!--HEADER -->
    
        <tbody><tr>
          <td align="center">
            <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
              <tbody><tr>
                <td align="center" valign="top" background="https://res.cloudinary.com/my-online-store/image/upload/v1675288847/meat22_aiy7qr.jpg" bgcolor="#66809b" style="background-size:cover; background-position:top;height=" 400""="">
                  <table class="col-600" width="600" height="400" border="0" align="center" cellpadding="0" cellspacing="0">
    
                    <tbody><tr>
                      <td height="40"></td>
                    </tr>
    
    
                    <tr>
                      <td align="center" style="line-height: 0px;">
                        <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://res.cloudinary.com/my-online-store/image/upload/v1675079704/logo2_b2nzmp.png" width="200" height="115" alt="logo">
                      </td>
                    </tr>
    
    
    
                    <tr>
                      <td align="center"bgcolor="#66809b" style="font-family: 'Raleway', sans-serif; font-size:37px; color:#001391;; line-height:24px; font-weight: bold; letter-spacing: 5px;">
                        WELCOME to Nakset
                      </td>
                    </tr>
    
    
    
    
    
                   
    
    
                    <tr>
                      <td height="50"></td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
    
    
    <!-- END HEADERR -->
    
    
   
    
    <!-- START TITLE -->
    
        <tr>
          <td align="center">
            <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
              <tbody><tr>
                <td align="center" bgcolor="#333">
                  <table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                      <td height="33"></td>
                    </tr>
                    <tr>
                      <td>
    
    
                        <table class="col1" width="183" border="0" align="left" cellpadding="0" cellspacing="0">
    
                          <tbody><tr>
                          <td height="18"></td>
                          </tr>
    
                          <tr>
                            <td align="center">
                              <img style="display:block; line-height:0px; font-size:0px; border:0px;" class="images_style" src="https://webdevtrick.com/wp-content/uploads/email-template.png" alt="img" width="156" height="160">
                            </td>
    
    
    
                          </tr>
                        </tbody></table>
    
    
    
                        <table class="col3_one" width="380" border="0" align="right" cellpadding="0" cellspacing="0">
    
                          <tbody><tr align="left" valign="top">
                            <td style="font-family: 'Raleway', sans-serif; font-size:20px; color:#fbb016; line-height:30px; font-weight: bold;">Hi ${req.body.username}  </td>
                          </tr>
    
    
                          <tr>
                            <td height="5"></td>
                          </tr>
    
    
                          <tr align="left" valign="top">
                            <td style="font-family: 'Lato', sans-serif; font-size:14px; color:#fff; line-height:24px; font-weight: 300;">
                                your registration has been completed and we willing to you yo enjoy halal food with us and sharing it with your friends
                            </td>
                          </tr>
    
                          <tr>
                            <td height="10"></td>
                          </tr>
    
                          <tr align="left" valign="top">
                            <td>
                              <table class="button" style="border: 2px solid #fff;" bgcolor="#fbb016" width="30%" border="0" cellpadding="0" cellspacing="0">
                                <tbody><tr>
                                  <td width="10"></td>
                                  <td height="30" align="center" style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#ffffff;">
                                    <a href="#" style="color:#ffffff; text-decoration: none;">About us</a>
                                  </td>
                                  <td width="10"></td>
                                </tr>
                              </tbody></table>
                            </td>
                          </tr>
    
                        </tbody></table>
                      </td>
                    </tr>
                    <tr>
                      <td height="33"></td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
    
    
    <!-- END TITLE -->
     <!-- START SHOWCASE -->
    
     <tr>
      <td align="center">
        <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
          <tbody><tr>
            <td height="35"></td>
          </tr>

          <tr>
            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#333;">Our certeficates</td>
          </tr>

          <tr>
            <td height="10"></td>
          </tr>


          <tr>
            <td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
these are the most important certeficates that we have in our company.We are very broad that we achive theme            </td>
          </tr>

        </tbody></table>
      </td>
    </tr>

    <tr>
      <td align="center">
        <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9; ">
          <tbody><tr>
            <td height="10"></td>
          </tr>
          <tr>
            <td>


              <table class="col3" width="183" border="0" align="left" cellpadding="0" cellspacing="0">
                <tbody><tr>
                  <td height="30"></td>
                </tr>
                <tr>
                  <td align="center">
                    <table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

                      <tbody><tr align="center" style="line-height:0px;">
                        <td>
                          <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://res.cloudinary.com/my-online-store/image/upload/v1675290251/iso_viirsy.jpg" width="90" height="78" alt="icon">
                        </td>
                      </tr>

 
 

  

                    </tbody></table>
                  </td>
                </tr>
                <tr>
                  <td height="30"></td>
                </tr>
              </tbody></table>





              <table width="1" height="20" border="0" cellpadding="0" cellspacing="0" align="left">
                <tbody><tr>
                  <td height="20" style="font-size: 0;line-height: 0;border-collapse: collapse;">
                    <p style="padding-left: 24px;">&nbsp;</p>
                  </td>
                </tr>
              </tbody></table>



              <table class="col3" width="183" border="0" align="left" cellpadding="0" cellspacing="0">
                <tbody><tr>
                  <td height="30"></td>
                </tr>
                <tr>
                  <td align="center">
                    <table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

                      <tbody><tr align="center" style="line-height:0px;">
                        <td>
                          <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://res.cloudinary.com/my-online-store/image/upload/v1675290251/haccp_vi97me.png" width="90" height="78" alt="icon">
                        </td>
                      </tr>
 
                     
                      


                    </tbody></table>
                  </td>
                </tr>
                <tr>
                  <td height="30"></td>
                </tr>
              </tbody></table>



              <table width="1" height="20" border="0" cellpadding="0" cellspacing="0" align="left">
                <tbody><tr>
                  <td height="20" style="font-size: 0;line-height: 0;border-collapse: collapse;">
                    <p style="padding-left: 24px;">&nbsp;</p>
                  </td>
                </tr>
              </tbody></table>


              <table class="col3" width="183" border="0" align="right" cellpadding="0" cellspacing="0">
                <tbody><tr>
                  <td height="30"></td>
                </tr>
                <tr>
                  <td align="center">
                    <table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

                      <tbody><tr align="center" style="line-height:0px;">
                        <td>
                          <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://res.cloudinary.com/my-online-store/image/upload/v1675290251/halal_nu6njq.jpg" width="78" height="78" alt="icon">
                        </td>
                      </tr>


                    
                    </tbody></table>
                  </td>
                </tr>
                <tr>
                  <td height="30"></td>
                </tr>
              </tbody></table>


            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>

      <tr>
          <td height="5"></td>
    </tr>


<!-- END SHOWCASE -->

    
     
    
    <!-- START FOOTER -->
    
        <tr>
          <td align="center">
            <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
              <tbody><tr>
                <td height="50"></td>
              </tr>
              <tr>
                <td align="center" bgcolor="#333" background="https://res.cloudinary.com/my-online-store/image/upload/v1675288847/meat22_aiy7qr.jpg" height="185">
                  <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                      <td height="25"></td>
                    </tr>
    
                      <tr>
                      <td align="center" style="font-family: 'Raleway',  sans-serif; font-size:26px; font-weight: 500; color:#fbb016; background-color: #333;">Follow Us On Social Media</td>
                      </tr>
    
    
                    <tr>
                      <td height="25"></td>
                    </tr>
    
    
    
                    </tbody></table><table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                      <td align="center" width="30%" style="vertical-align: top;">
                          <a href="https://www.facebook.com" target="_blank"> <img width="50" height="50" src="https://res.cloudinary.com/my-online-store/image/upload/v1675291507/insta_bzxwhp.svg"> </a>
                      </td>
                      <td align="center" width="30%" style="vertical-align: top;">
                        <a href="https://www.facebook.com" target="_blank"> <img width="50" height="50" src="https://res.cloudinary.com/my-online-store/image/upload/v1675291507/facebook_ctljmv.svg"> </a>
                    </td>
                      <td align="center" class="margin" width="30%" style="vertical-align: top;">
                         <a href="https://twitter.com" target="_blank"> <img width="50" height="50" src="https://res.cloudinary.com/my-online-store/image/upload/v1675291507/pain_dbiivq.svg"> </a>
                      </td>
     
                    </tr>
                    </tbody></table>
    
    
    
                  </td></tr></tbody></table>
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
    
    <!-- END FOOTER -->
      
            </tbody></table>
      
    </body>
    </html>`
  }
  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })
  }
  

     return res.status(200).json({result:{error:0,result,password:req.body.password}}) 

 });
                   

  
  
}