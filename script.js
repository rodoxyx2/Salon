// CAMBIO DE PANTALLAS
const btnVer = document.getElementById("ver-mensajes");
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaMensajes = document.getElementById("pantalla-mensajes");

btnVer.addEventListener("click", () => {
  pantallaInicio.style.display = "none";
  pantallaMensajes.style.display = "block";
});

// SUPABASE (PEGA TUS DATOS AQUÍ)
const SUPABASE_URL = "https://zhtrkbsmgfcspcfhzrbo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodHJrYnNtZ2Zjc3BjZmh6cmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTg2MjQsImV4cCI6MjA4MjA5NDYyNH0.SIVzYOlK-q7c2nuniblSEXFKXQ3UWW8Uc-YKqJJT4lY";

const btnEnviar = document.getElementById("enviarMensaje");
const input = document.getElementById("mensajeInput");
const estado = document.getElementById("estado");

btnEnviar.addEventListener("click", async () => {
  const texto = input.value.trim();

  if (texto === "") {
    estado.textContent = "¿No tienes nada lindo que decirme? 💔";
    return;
  }

  estado.textContent = "Enviando...";

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/mensajes`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ contenido: texto })
    });

    if (!res.ok) throw new Error("Error");

    estado.textContent = "Mensaje enviado 💌";
    input.value = "";
  } catch (e) {
    estado.textContent = "Algo falló 😔";
  }
});