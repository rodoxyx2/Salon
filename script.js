const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("btn-ver").onclick = () => showScreen("screen-2");
document.getElementById("btn-responder").onclick = () => showScreen("screen-3");
document.getElementById("btn-nada").onclick = () => showScreen("screen-4");

document.getElementById("btn-enviar").onclick = async () => {
  const input = document.getElementById("mensajeInput");
  const estado = document.getElementById("estado");
  const mensaje = input.value.trim();

  if (!mensaje) {
    estado.textContent = "No tienes nada lindo que decirme 💔";
    return;
  }

  estado.textContent = "Enviando…";

  try {
    const res = await fetch("TU_ENDPOINT_SUPABASE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "TU_ANON_KEY",
        "Authorization": "Bearer TU_ANON_KEY"
      },
      body: JSON.stringify({ contenido: mensaje })
    });

    if (!res.ok) throw new Error();

    estado.textContent = "Mensaje enviado 🤍";
    input.value = "";
  } catch {
    estado.textContent = "Algo falló…";
  }
};