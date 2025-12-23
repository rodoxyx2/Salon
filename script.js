// IMPORTAR SUPABASE DESDE CDN
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ⚠️ REEMPLAZA ESTOS DOS VALORES CON LOS TUYOS
const SUPABASE_URL = "https://zhtrkbsmgfcspcfhzrbo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodHJrYnNtZ2Zjc3BjZmh6cmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTg2MjQsImV4cCI6MjA4MjA5NDYyNH0.SIVzYOlK-q7c2nuniblSEXFKXQ3UWW8Uc-YKqJJT4lY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ELEMENTOS DEL DOM
const form = document.getElementById("mensajes-form");
const input = document.getElementById("mensajes-input");
const status = document.getElementById("status");

// INSERTAR MENSAJE EN LA TABLA "mensajes"
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const texto = input.value.trim();

  if (texto === "") {
    status.textContent = "Escribe algo bonito primero 💌";
    return;
  }

  const { error } = await supabase
    .from("mensajes")
    .insert([{ contenido: texto }]);

  if (error) {
    status.textContent = "Algo falló 😞";
    console.error(error);
  } else {
    status.textContent = "Mensaje enviado 💖";
    input.value = "";
  }
});