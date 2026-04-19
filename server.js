
const express=require('express');
const path=require('path');
const app=express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));

app.post('/api/generate', async (req,res)=>{
 try{
   const {tema='happy song',estilo='pop'}=req.body||{};
   const token=process.env.HF_TOKEN;
   if(!token) return res.status(400).json({ok:false,message:'Configure HF_TOKEN no Vercel'});
   const prompt=`${estilo} music about ${tema}`;
   const r=await fetch('https://router.huggingface.co/hf-inference/models/facebook/musicgen-small',{
      method:'POST',
      headers:{
        'Authorization':'Bearer '+token,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({inputs:prompt})
   });
   if(!r.ok){
      const txt=await r.text();
      return res.status(500).json({ok:false,message:txt});
   }
   const buf=Buffer.from(await r.arrayBuffer());
   res.setHeader('Content-Type','audio/wav');
   res.send(buf);
 }catch(e){
   res.status(500).json({ok:false,message:String(e)});
 }
});

app.listen(process.env.PORT||3000);
