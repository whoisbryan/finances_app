from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models.user import Base
from app.api.v1 import register, users, login

app = FastAPI()

# Crear las tablas automáticamente al arrancar FastAPI
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Permitir peticiones del frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # o ["*"] en desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas
app.include_router(register.router)
app.include_router(users.router)
app.include_router(login.router)

@app.get("/")
def read_root():
    return {"message": "¡Hola desde el backend de Finanzas Personales!"}
