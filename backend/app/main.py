from fastapi import FastAPI
from app.database import engine
from app.models.user import Base
from app.api.v1 import register, users

app = FastAPI()

# Crear las tablas automáticamente al arrancar FastAPI
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Incluir las rutas
app.include_router(register.router)
app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "¡Hola desde el backend de Finanzas Personales!"}
