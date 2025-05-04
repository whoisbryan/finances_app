from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import async_session
from app.schemas.user import UserLogin, UserOut
from app.services.user_service import authenticate_user

router = APIRouter(prefix="/login", tags=["auth"])

async def get_db():
    async with async_session() as session:
        yield session

@router.post("/", response_model=UserOut)
async def login(user_in: UserLogin, db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(user_in, db)
    return user
