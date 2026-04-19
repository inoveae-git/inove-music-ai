
const express=require('express'); const app=express();
app.use(express.static('public')); app.use(express.json());
app.post('/api/generate',(req,res)=>{
 const {tema='ideia',estilo='Pop'}=req.body||{};
 const letra=`${tema.toUpperCase()}\nTransforme ideias em som\nNo estilo ${estilo} eu vou chegar\nHoje a vibe vai dominar`;
 res.json({ok:true, letra, audio:null});
});
app.listen(process.env.PORT||3000,()=>console.log('rodando'));
