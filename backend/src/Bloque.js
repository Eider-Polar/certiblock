import SHA256 from 'crypto-js/sha256.js'
import hex2ascii from "hex2ascii"
class Block {
    constructor(data){
        this.hash =null;
        this.height=0;
        this.body={data};
        this.time=0;
        this.previousBlockHash ='';
    }
    validate(){
        const self=this;
        return new Promise((resolve,reject)=>{
            let currentHash =self.hash;
            self.hash=SHA256(JSON.stringify({ ...self, hash:null})).toString();
            if (currentHash !== self.hash){
                return resolve(false);
            }
            resolve(true);
        })
    }
    getBlockData(){
        const self =this;
        return new Promise((resolve, reject)=>{
            let encodedData =self.body;
            let decodedData = hex2ascii(encodedData);
            let dataObject=JSON.parse(decodedData);
            if(dataObject == "Bloque de origen"){
                reject(new Error("Este es el primer bloque "));
            }
            resolve(dataObject);

        })
    }
    toString(){
        const {hash,height,body,time,previousBlockHash}=this
        return `Bloque-
        hash:${hash}
        previusHash:${previousBlockHash}
        indice:${height}
        data:${body}
        time:${time}
        -----------------------------------------------------
        _______________________________________________________`
    }
}
export default Block