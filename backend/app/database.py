from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# Usamos la DATABASE_URL que viene de nuestro Settings
DATABASE_URL = settings.DATABASE_URL

# Crear el motor de base de datos asíncrono
engine = create_async_engine(DATABASE_URL, echo=True)

# Crear la sesión asíncrona
async_session = sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession
)
