import  prisma   from '../../lib/prismadb'


export default async (req, res) => {
    console.log("hello world")

    console.log(req.body.input)
    if(req.body.input == null || req.body.input.length==0 || req.body.input== undefined)
    {

        res.status(200).json({searching:false})
    }

    const result = await prisma.product.findMany({where:{name:{contains:req.body.input}}})
   
   
     res.status(200).json( {result,searching:true} )

   }