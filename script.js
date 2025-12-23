import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔴 PEGA AQUÍ TUS DATOS DE SUPABASE
const SUPABASE_URL = "https://zhtrkbsmgfcspcfhzrbo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodHJrYnNtZ2Zjc3BjZmh6cmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTg2MjQsImV4cCI6MjA4MjA5NDYyNH0.SIVzYOlK-q7c2nuniblSEXFKXQ3UWW8Uc-YKqJJT4lY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ELEMENTOS
const botonEnviar = document.getElementById("enviar");
const inputMensaje = document.getElementById("mensaje");
const estado = document.getElementById("estado");

botonEnviar.addEventListener("click", async () => {
  const texto = inputMensaje.value.trim();

  // ⛔ mensaje vacío
  if (texto === "") {
    estado.textContent = "No tienes nada lindo que decirme 💔";
    estado.style.color = "#ff6b6b";
    return;
  }

  estado.textContent = "Enviando...";
  estado.style.color = "#aaa";

  const { error } = await supabase
    .from("mensajes")
    .insert([{ contenido: texto }]);

  if (error) {
    estado.textContent = "Algo falló 😔";
    estado.style.color = "#ff6b6b";
    console.error(error);
  } else {
    estado.textContent = "Mensaje enviado 🤍";
    estado.style.color = "#9effa1";
    inputMensaje.value = "";
  }
});