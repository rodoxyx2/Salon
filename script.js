import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://zhtrkbsmgfcspcfhzrbo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodHJrYnNtZ2Zjc3BjZmh6cmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTg2MjQsImV4cCI6MjA4MjA5NDYyNH0.SIVzYOlK-q7c2nuniblSEXFKXQ3UWW8Uc-YKqJJT4lY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");

// PARTICULAS EN CANVAS
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) this.reset();
  }
  draw() {
    ctx.fillStyle = `rgba(255, 179, 193, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

const particles = [];
for(let i=0;i<100;i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{ p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('resize', ()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight;});

// CORAZONES
function createHeart() {
  const heart = document.createElement('div');
  heart.className='heart';
  const hearts=['♡','♥','💕','💖','💗','💓','💞'];
  heart.innerHTML=hearts[Math.floor(Math.random()*hearts.length)];
  heart.style.left=Math.random()*100+'%';
  heart.style.color=`rgba(255,${Math.random()*80+105},${Math.random()*60+135},${Math.random()*0.3+0.5})`;
  heart.style.animationDuration=(Math.random()*4+8)+'s';
  heart.style.animationDelay=Math.random()*2+'s';
  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(),12000);
}
setInterval(createHeart,800);

// ESTRELLAS FUGACES
function createShootingStar(){
  const star=document.createElement('div');
  star.className='shooting-star';
  star.style.top=Math.random()*50+'%';
  star.style.left=Math.random()*100+'%';
  document.body.appendChild(star);
  setTimeout(()=>star.remove(),3000);
}
setInterval(createShootingStar,5000);

// BOTONES
document.getElementById("btn1").onclick = ()=>{p1.style.animation='fadeInUp 1s ease-out reverse'; setTimeout(()=>{p1.style.display="none"; p2.style.display="flex";},500);}
document.getElementById("btn2").onclick = ()=>{p2.style.animation='fadeInUp 1s ease-out reverse'; setTimeout(()=>{p2.style.display="none"; p3.style.display="flex";},500);}
document.getElementById("nada").onclick = ()=>{p3.style.animation='fadeInUp 1s ease-out reverse'; setTimeout(()=>{p3.style.display="none"; p4.style.display="flex";},500);}

// SUPABASE ENVIAR MENSAJE
document.getElementById("enviar").onclick = async ()=>{
  const texto=document.getElementById("mensaje").value.trim();
  const estado=document.getElementById("estado");

  if(texto===""){estado.textContent="¿No tienes nada lindo que decirme? 💔";estado.style.color="#ff6b6b"; return;}

  estado.textContent="Enviando..."; estado.style.color="#f5c6cb";

  const {error}=await supabase.from("mensajes").insert([{contenido:texto}]);

  if(error){estado.textContent="Algo falló 😔"; estado.style.color="#ff6b6b";}
  else{
    estado.textContent="Mensaje enviado 🤍"; estado.style.color="#ffb3c1";
    document.getElementById("mensaje").value="";
    for(let i=0;i<20;i++){setTimeout(createHeart,i*100);}
  }
};