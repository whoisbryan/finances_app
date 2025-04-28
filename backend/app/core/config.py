from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str = "my_secret_key_example"  # Para firmar tokens o sesiones más adelante
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # (si después quieres manejar sesiones JWT)

    class Config:
        env_file = ".env"

settings = Settings()
