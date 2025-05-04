from pydantic import BaseModel, EmailStr, constr

class UserBase(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr

class UserCreate(UserBase):
    password: constr(min_length=6)

class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str
