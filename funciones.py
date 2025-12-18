from conexion import supabase, TABLA1, TABLA2, TABLA3, TABLA4
from datetime import datetime, timedelta

# ───────── CLIENTES ─────────
def crear_cliente(data):
    return supabase.table(TABLA1).insert(data).execute().data

def listar_clientes():
    return supabase.table(TABLA1).select("*").order("customer_id", desc=True).execute().data

def buscar_cliente(cliente_id):
    return supabase.table(TABLA1).select("*").eq("customer_id", cliente_id).execute().data

def eliminar_cliente(cliente_id):
    supabase.table(TABLA1).delete().eq("customer_id", cliente_id).execute()

# ───────── EMPLEADOS ─────────
def crear_empleado(data):
    return supabase.table(TABLA2).insert(data).execute().data

def listar_empleados():
    return supabase.table(TABLA2).select("*").order("employee_id", desc=True).execute().data

def eliminar_empleado(emp_id):
    supabase.table(TABLA2).delete().eq("employee_id", emp_id).execute()

# ───────── SERVICIOS ─────────
def crear_servicio(data):
    return supabase.table(TABLA3).insert(data).execute().data

def listar_servicios():
    return supabase.table(TABLA3).select("*").order("service_id", desc=True).execute().data

def eliminar_servicio(serv_id):
    supabase.table(TABLA3).delete().eq("service_id", serv_id).execute()

# ───────── CITAS ─────────
def crear_cita(data):
    return supabase.table(TABLA4).insert(data).execute().data

def listar_citas():
    return supabase.table(TABLA4).select("*").order("appointment_id", desc=True).execute().data

def eliminar_cita(cita_id):
    supabase.table(TABLA4).delete().eq("appointment_id", cita_id).execute()

# ───────── ADMIN ─────────
def ganancias_totales():
    citas = supabase.table(TABLA4).select("*").execute().data
    total = 0.0
    for c in citas or []:
        servicio = supabase.table(TABLA3).select("price").eq(
            "service_id", c.get("service_id")
        ).execute().data
        if servicio:
            total += float(servicio[0]["price"])
    return total

def resumen_semanal():
    hoy = datetime.today()
    inicio = hoy - timedelta(days=hoy.weekday())
    fin = inicio + timedelta(days=6)

    citas = supabase.table(TABLA4).select("*").execute().data
    total = 0.0
    listado = []

    for c in citas or []:
        fecha = datetime.strptime(c["appointment_date"], "%Y-%m-%d")
        if inicio <= fecha <= fin:
            listado.append(c)
            servicio = supabase.table(TABLA3).select("price").eq(
                "service_id", c["service_id"]
            ).execute().data
            if servicio:
                total += float(servicio[0]["price"])

    return {
        "inicio": inicio.date().isoformat(),
        "fin": fin.date().isoformat(),
        "ganancias": total,
        "citas": listado
    }