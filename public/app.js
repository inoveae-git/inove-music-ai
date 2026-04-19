async function go(){
const tema=document.getElementById('tema').value||'sonho';
const estilo=document.getElementById('estilo').value;
const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tema,estilo})});
const j=await r.json();
document.getElementById('out').textContent=j.letra;
}