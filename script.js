// CAMBIA ESTO CON TUS DATOS DE SUPABASE
const SUPABASE_URL = "https://zhtrkbsmgfcspcfhzrbo.supabase.co";
const SUPABASE_KEY = "sb_publishable_h3msqQrqi9d1Gc7-IG7L1w_zLKRUUmU";

function cambiarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
}

function verMensajes() {
  cambiarPantalla("pantalla-mensaje");
}

function verFormulario() {
  cambiarPantalla("pantalla-formulario");
}

async function enviarMensaje() {
  const mensaje = document.getElementById("mensajeInput").value.trim();
  const estado = document.getElementById("estado");

  if (!mensaje) {
    estado.textContent = "Escribe algo primero 🤍";
    return;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/mensajes`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ contenido: mensaje })
    });

    if (res.ok) {
      estado.textContent = "Mensaje enviado con amor 🤍";
      document.getElementById("mensajeInput").value = "";
    } else {
      estado.textContent = "Algo falló 😔";
    }
  } catch (e) {
    estado.textContent = "Error de conexión 😔";
  }
}