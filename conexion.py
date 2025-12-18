import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

TABLA1 = os.getenv("TABLA1")
TABLA2 = os.getenv("TABLA2")
TABLA3 = os.getenv("TABLA3")
TABLA4 = os.getenv("TABLA4")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Faltan credenciales de Supabase")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)