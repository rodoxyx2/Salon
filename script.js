// 👉 PEGA AQUÍ TUS DATOS DE SUPABASE
const SUPABASE_URL = "TU_SUPABASE_URL";
const SUPABASE_KEY = "TU_SUPABASE_ANON_KEY";

const mostrarMensaje = () => {
  document.getElementById("inicio").classList.remove("activa");
  document.getElementById("mensaje").classList.add("activa");
};

const enviarMensaje = async () => {
  const texto = document.getElementById("respuesta").value;
  const estado = document.getElementById("estado");

  if (!texto.trim()) {
    estado.textContent = "Escribe algo primero 🤍";
    return;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/mensajes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify({ mensaje: texto })
  });

  if (res.ok) {
    estado.textContent = "Mensaje enviado con amor 🤍";
    document.getElementById("respuesta").value = "";
  } else {
    estado.textContent = "Algo falló, pero el amor no 😔";
  }
};