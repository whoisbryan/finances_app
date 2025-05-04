from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status

from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.core.security import hash_password, verify_password


async def create_user(user_in: UserCreate, db: AsyncSession) -> User:
    # Verificar si el username o el email ya existen
    result = await db.execute(select(User).where((User.username == user_in.username) | (User.email == user_in.email)))
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered."
        )

    # Hashear la contraseña
    hashed_pw = hash_password(user_in.password)

    # Crear el nuevo usuario
    new_user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=hashed_pw
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)  # Refrescamos para obtener el ID y demás datos

    return new_user

async def authenticate_user(user_in: UserLogin, db: AsyncSession) -> User:
    result = await db.execute(select(User).where(User.username == user_in.username))
    user = result.scalar_one_or_none()

    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Credentials"
        )

    return user