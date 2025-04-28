from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.user import UserOut
from app.database import async_session
from app.models.user import User
from sqlalchemy.future import select
from typing import List

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

async def get_db():
    async with async_session() as session:
        yield session

@router.get("/", response_model=List[UserOut])
async def list_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users
