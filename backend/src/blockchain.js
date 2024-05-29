import Bloque from "./Bloque.js"
import SHA256 from 'crypto-js/sha256.js'

class Blockchain{
    constructor(){
        this.chain=[];
        this.height= -1;
        this.initializeChain();
    }
    async initializeChain(){
        if(this.height == -1){
            const bloque =new Bloque({data:"Bloque Original"});
            await this.addBlock(bloque);

        }
    }
    addBlock(bloque){
        let self =this;
        return new Promise (async(resolve,reject)=>{ 
            bloque.height=self.chain.length;
            bloque.time =new Date().getTime().toString();
            if(self.chain.length > 0){
                bloque.previousBlockHash=self.chain[self.chain.length -1].hash;
            }
            let errors =await self.validateChain();
            if(errors.length >0){
                reject(new Error("la cadena no es valida :",errors))
            }

            bloque.hash=SHA256(JSON.stringify(bloque)).toString();
            self.chain.push(bloque);
            resolve(bloque)

    })
    }
    validateChain(){
        let self= this;
        const errors =[];
        return new Promise(async (resolve,reject)=>{
            self.chain.map(async (bloque)=>{
                
                try {
                    let isValid=await bloque.validate();
                    if(!isValid){
                        errors.push(new Error(`El bloque ${bloque.height} no es valido `));

                    }
                } catch (error) {
                    
                }
            })
            resolve(errors);
        })

    }
    print(){
        let self=this;
        for (let bloque of self.chain){
            console.log(bloque.toString());

        }
    }
}
export default Blockchain