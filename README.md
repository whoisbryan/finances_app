# 📊 Finanzas Personales App

Aplicación web para llevar un control de gastos personales, ingresos, cuentas bancarias y tarjetas de crédito.

Este proyecto está dividido en **Frontend** y **Backend**, estructurado bajo una arquitectura de **microservicios** usando **Docker Compose** para facilitar el despliegue.

---

## 🧩 Tecnologías utilizadas

- **Frontend:** React + TailwindCSS (servido con Nginx)
- **Backend:** FastAPI (Python 3.12) + SQLAlchemy
- **Base de datos:** PostgreSQL 15
- **Contenedores:** Docker + Docker Compose
- **ORM:** SQLAlchemy (modo async)
- **Seguridad:** Manejo de contraseñas con Bcrypt

---

## 🚀 ¿Cómo desplegar localmente?

### 1. Requisitos previos

- Tener instalado:
  - [Docker](https://docs.docker.com/get-docker/)
  - [Docker Compose](https://docs.docker.com/compose/install/)

### 2. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/finanzas-personales-app.git
cd finanzas-personales-app
```

### 3. Variables de entorno importantes

Ya están definidas en el docker-compose.yml, como:

POSTGRES_USER: myuser
POSTGRES_PASSWORD: mypassword
POSTGRES_DB: mydatabase
DATABASE_URL: postgresql+asyncpg://myuser:mypassword@db:5432/mydatabase
SECRET_KEY: my_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES: 30

No necesitas .env en local si trabajas con Docker.
### 4. Construir y levantar todo el proyecto

Desde la raíz del proyecto:

docker-compose up --build

Este comando levantará:

    PostgreSQL en localhost:5432

    Backend en localhost:8000

    Frontend en localhost:3000