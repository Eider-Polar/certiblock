import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcrypt";

const certificadoSchema = mongoose.Schema({
 tipoDocumento:{
    type: String,
    enum: ["insignia", "certificado"],
    require:true
 },
 usuario:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"usuario"
 },
 descripcion:{
    type:String,
    require:true
 },
 empresaCertificadora:{
    type:String,
    require:true
 },
 firmado:{
   type: Boolean,
   default: false
 }

},
{
    timestamps: true,
}
);



const Certificado = mongoose.model('certificado', certificadoSchema)
export default Certificado;