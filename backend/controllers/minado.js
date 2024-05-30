import Blockchain from "../src/blockchain.js";
import Block from "../src/Bloque.js";
import Certificado from "../models/data.js";
const bloque = new Blockchain();

const minado = async (req, res) => {
  const certifiacadosAFirmar = await Certificado.find(
    { firmado: false },
    "-createdAt -updatedAt -__v -firmado"
  );
  res.json(certifiacadosAFirmar);
rim
  // const x = new Block(data)
  // await bloque.addBlock(x)
  // res.json(bloque.print())
};
const validacion = async (req, res) => {
  const id = req.usuario._id;
  const CC = req.body.email;

  const validarCertificado = await Certificado.findOne({ usuario: id }).populate('usuario')
  if (CC ===validarCertificado.usuario.email){
    validarCertificado.firmado = true 
    validarCertificado.save()
  }
  res.json(validarCertificado)
};

const verCadena = async (req,res)=>{
  res.json(bloque.print() )
}
export { minado, validacion, verCadena };
