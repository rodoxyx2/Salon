// script.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://zhtrkbsmgfcspcfhzrbo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodHJrYnNtZ2Zjc3BjZmh6cmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTg2MjQsImV4cCI6MjA4MjA5NDYyNH0.SIVzYOlK-q7c2nuniblSEXFKXQ3UWW8Uc-YKqJJT4lY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");

document.getElementById("btn1").onclick = () => {
  p1.style.display = "none";
  p2.style.display = "block";
};

document.getElementById("btn2").onclick = () => {
  p2.style.display = "none";
  p3.style.display = "block";
};

document.getElementById("nada").onclick = () => {
  p3.style.display = "none";
  p4.style.display = "block";
};

document.getElementById("enviar").onclick = async () => {
  const texto = document.getElementById("mensaje").value.trim();
  const estado = document.getElementById("estado");

  if (texto === "") {
    estado.textContent = "¿No tienes nada lindo que decirme? 💔";
    return;
  }

  estado.textContent = "Enviando...";

  const { error } = await supabase
    .from("mensajes")
    .insert([{ contenido: texto }]);

  if (error) {
    estado.textContent = "Algo falló 😔";
  } else {
    estado.textContent = "Mensaje enviado 🤍";
    document.getElementById("mensaje").value = "";
  }
};