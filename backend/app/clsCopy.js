
require('dotenv').config();

const express =require('express');

const Blockchain =require('../src/blockcahain')


const P2pServer=require('./p2pServer_copy')
const HTTP_PORT= process.env.HTTP_PORT || 3002;
const bodyParser=require('body-parser');
const app =express();

const bc = new Blockchain();
const p2pserver=new P2pServer(bc);
app.use(bodyParser.json())

app.get('/blocks',(req,res)=>{
    res.json(bc.chain)
})





app.listen(HTTP_PORT,()=>{
    console.log('HTTP server listening on port'  + HTTP_PORT)

    
})

app.post('/mine',(req,res)=>{
    const block=bc.addBlock(req.body.data)
    console.log(`New Block add: ${block.toString()}`);
    p2pserver.syncChains();
    res.redirect('/blocks')
})
p2pserver.listen();