# 1. Imagen base de Python
FROM python:3.12-slim

# 2. Crear un directorio para la app
WORKDIR /app

# 3. Copiar los archivos de la app dentro del contenedor
COPY ./requirements.txt /app/requirements.txt

# 4. Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiar el resto del código de la app
COPY . /app

# 6. Comando por defecto (lo sobreescribimos en docker-compose, pero es buena práctica tenerlo)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
