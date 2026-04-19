
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"public","index.html"));
});

app.post("/api/generate",(req,res)=>{
  const {tema="ideia", estilo="Pop"} = req.body || {};
  const letra = `${tema.toUpperCase()}

Transforme ideias em som
No estilo ${estilo} eu vou chegar
Hoje a vibe vai dominar
Inove Music AI vai tocar`;
  res.json({ok:true, letra});
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log("Rodando porta "+port));
