import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://zhtrkbsmgfcspcfhzrbo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodHJrYnNtZ2Zjc3BjZmh6cmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTg2MjQsImV4cCI6MjA4MjA5NDYyNH0.SIVzYOlK-q7c2nuniblSEXFKXQ3UWW8Uc-YKqJJT4lY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");

// Crear corazones flotantes
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = '♡';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
  heart.style.animationDelay = Math.random() * 2 + 's';
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createHeart, 1500);

document.getElementById("btn1").onclick = () => {
  p1.style.display = "none";
  p2.style.display = "flex";
};

document.getElementById("btn2").onclick = () => {
  p2.style.display = "none";
  p3.style.display = "flex";
};

document.getElementById("nada").onclick = () => {
  p3.style.display = "none";
  p4.style.display = "flex";
};

document.getElementById("enviar").onclick = async () => {
  const texto = document.getElementById("mensaje").value.trim();
  const estado = document.getElementById("estado");

  if (texto === "") {
    estado.textContent = "¿No tienes nada lindo que decirme? 💔";
    estado.style.color = "#ff6b6b";
    return;
  }

  estado.textContent = "Enviando...";
  estado.style.color = "#f5c6cb";

  const { error } = await supabase
    .from("mensajes")
    .insert([{ contenido: texto }]);

  if (error) {
    estado.textContent = "Algo falló 😔";
    estado.style.color = "#ff6b6b";
  } else {
    estado.textContent = "Mensaje enviado 🤍";
    estado.style.color = "#ffb3c1";
    document.getElementById("mensaje").value = "";
  }
};