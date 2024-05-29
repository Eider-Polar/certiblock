import Certificado from "../models/data.js";

const NuevoCertificado=async(req,res)=>{
    try {
        console.log(req.body)
     const nuevoC = new Certificado(req.body)
     const nuevoG = await nuevoC.save()
        res.json(nuevoG)
    } catch (error) {
       console.log(error) 
    }
}
export{
    NuevoCertificado
}