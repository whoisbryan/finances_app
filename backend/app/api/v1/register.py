from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.user import UserCreate, UserOut
from app.database import async_session
from app.services.user_service import create_user

router = APIRouter(
    prefix="/register",
    tags=["register"]
)

# Dependency para obtener una sesión de base de datos
async def get_db():
    async with async_session() as session:
        yield session

@router.post("/", response_model=UserOut)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    new_user = await create_user(user_in, db)
    return new_user
