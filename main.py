from fastapi import FastAPI
from funciones import *

app = FastAPI(title="Rode's Salón Backend")

@app.post("/clientes")
def api_crear_cliente(data: dict):
    return crear_cliente(data)

@app.get("/clientes")
def api_listar_clientes():
    return listar_clientes()

@app.delete("/clientes/{cliente_id}")
def api_eliminar_cliente(cliente_id: int):
    eliminar_cliente(cliente_id)
    return {"ok": True}

@app.get("/admin/ganancias")
def api_ganancias():
    return {"total": ganancias_totales()}

@app.get("/admin/resumen-semanal")
def api_resumen():
    return resumen_semanal()