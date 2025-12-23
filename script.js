import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "PON_AQUI_TU_URL";
const supabaseKey = "PON_AQUI_TU_ANON_KEY";

const supabase = createClient(supabaseUrl, supabaseKey);

const btnEnviar = document.getElementById("enviar");
const inputMensaje = document.getElementById("mensaje");
const estado = document.getElementById("estado");

btnEnviar.addEventListener("click", async () => {
  const texto = inputMensaje.value.trim();

  if (!texto) {
    estado.textContent = "No tienes nada lindo que decirme 💔";
    estado.className = "error";
    return;
  }

  estado.textContent = "Enviando… 💌";
  estado.className = "enviando";

  const { error } = await supabase
    .from("mensajes")
    .insert([{ contenido: texto }]);

  if (error) {
    estado.textContent = "Algo falló 😞";
    estado.className = "error";
    console.error(error);
  } else {
    estado.textContent = "Mensaje enviado ❤️";
    estado.className = "ok";
    inputMensaje.value = "";
  }
});