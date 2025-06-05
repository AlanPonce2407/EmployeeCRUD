# CRUD Challenge - Alan Ponce

Aplicación fullstack desarrollada como desafío técnico. El frontend está construido en React, y el backend en Node.js con Express y MongoDB. Se incluye testing automático en ambas capas.

## Prerequisitos

- Node.js v18+
- MongoDB local o MongoDB Atlas
- Git

---

## Instalación

### 1. Clonar el repositorio:

```
git clone https://github.com/AlanPonce2407/EmployeeCRUD/.git
cd employeeCRUD
```

### 2. Instalar dependencias:
```
cd client
npm install
```

```
cd ../server
npm install
```

### 3. Crear archivo .env en la carpeta /server con:

```
MONGO_URL=url_local
PORT=5000
```

### 4. Ejecutar backend:

```
cd server
npm run dev
```

### 5. Ejecutar frontend:

```
cd client
npm start
```

---

## TESTING:

### Frontend

@testing-library/react

@testing-library/jest-dom

@testing-library/user-event

```
cd client
npm test
```

### Backend

jest

supertest

```
cd server
npm test
```

---

## Paquetes utilizados

## Frontend (React)

react

axios

bootstrap

font-awesome

react-router-dom

react-hot-toast

@testing-library

## Backend (Express)

express

mongoose

cors

dotenv

body-parser

nodemon

jest

supertest

# Tiempo estimado:

| Tarea                                    | Estimación |
| ---------------------------------------- | ---------- |
| Setup y estructura MERN                  | 1h         |
| Conexión MongoDB y configuración Express | 1h         |
| Modelos y rutas backend                  | 2h         |
| Desarrollo frontend (React + estilos)    | 3h         |
| Conexión API con Axios                   | 1h         |
| Validaciones y manejo de errores         | 1h         |
| Testing automático (frontend y backend)  | 1h         |
| Pruebas manuales y depuración final      | 1h         |
| Documentación del proyecto (README)      | 0.5h       |

Total estimado: 11.5 horas

