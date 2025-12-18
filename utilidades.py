import csv
import json
from datetime import datetime

def _adivinar_tipo_columna(nombre_columna, valor_ejemplo):
    n = nombre_columna.lower()
    if n.endswith("_id") or n in ("id", "customer_id", "employee_id", "service_id", "appointment_id"):
        return "INTEGER"
    if "price" in n or "precio" in n:
        return "NUMERIC"
    if "date" in n or "fecha" in n:
        return "DATE"
    return "TEXT"

def _formatear_valor_sql(valor):
    if valor is None:
        return "NULL"
    if isinstance(valor, (int, float)):
        return str(valor)
    s = str(valor).replace("'", "''")
    return f"'{s}'"

def exportar_csv(nombre_archivo, datos):
    if not datos:
        return
    with open(nombre_archivo, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=datos[0].keys())
        writer.writeheader()
        writer.writerows(datos)

def exportar_json(nombre_archivo, datos):
    if not datos:
        return
    with open(nombre_archivo, "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=4)

def exportar_sql(nombre_archivo, datos, nombre_tabla):
    if not datos:
        return

    columnas = list(datos[0].keys())
    tipos = {c: _adivinar_tipo_columna(c, None) for c in columnas}

    with open(nombre_archivo, "w", encoding="utf-8") as f:
        f.write(f"-- Exportado {datetime.now().isoformat()}\n")
        f.write(f"CREATE TABLE IF NOT EXISTS {nombre_tabla} (\n")
        f.write(",\n".join([f"  {c} {tipos[c]}" for c in columnas]))
        f.write("\n);\n\n")

        for fila in datos:
            valores = [_formatear_valor_sql(fila.get(c)) for c in columnas]
            f.write(
                f"INSERT INTO {nombre_tabla} ({', '.join(columnas)}) "
                f"VALUES ({', '.join(valores)});\n"
            )