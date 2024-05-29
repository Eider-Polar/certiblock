import Blockchain from "../src/blockchain.js"
import Block from "../src/Bloque.js"
import Certificado from "../models/data.js";
const bloque = new Blockchain()


const minado =async(req,res)=>{


const certifiacadosAFirmar=await Certificado.find({firmado:false},'-createdAt -updatedAt -__v -firmado')
res.json(certifiacadosAFirmar)


// const x = new Block(data)
// await bloque.addBlock(x)
// res.json(bloque.print())



}
const validacion= async(req,res)=>{
    const id = req.usuario
    const CC = req.body

    // const certifacado = 
}

export {
    minado ,
    validacion
}