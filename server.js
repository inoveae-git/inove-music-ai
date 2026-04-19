
const express=require('express');
const path=require('path');
const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));

app.post('/api/generate', async (req,res)=>{
 const {tema='sonho', estilo='pop'} = req.body || {};
 const token = process.env.HF_TOKEN;
 if(!token){
   return res.json({ok:false,fallback:true,message:'Sem HF_TOKEN. Usando modo local.',tema,estilo});
 }
 try{
   const prompt = `${estilo} instrumental music about ${tema}`;
   const r = await fetch('https://router.huggingface.co/hf-inference/models/facebook/musicgen-small',{
    method:'POST',
    headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},
    body:JSON.stringify({inputs:prompt})
   });
   if(!r.ok){
     return res.json({ok:false,fallback:true,message:'API indisponível. Usando modo local.',tema,estilo});
   }
   const buf = Buffer.from(await r.arrayBuffer());
   res.setHeader('Content-Type','audio/wav');
   return res.send(buf);
 }catch(e){
   return res.json({ok:false,fallback:true,message:'Erro externo. Usando modo local.',tema,estilo});
 }
});

app.listen(process.env.PORT||3000);
