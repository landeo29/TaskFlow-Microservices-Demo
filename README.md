# TaskFlow - Microservices Demo

Sistema de gestión de tareas con arquitectura de microservices y eventos asíncronos usando Kafka.

## 🏗️ Arquitectura
```
Frontend (Angular)
       │
       ├──────────────┐
       ↓              ↓
task-service    notification-service
(PostgreSQL)      (MongoDB)
       │              ↑
       └──► Kafka ────┘
```

**Flujo:**
1. Usuario crea una tarea → `task-service` guarda en PostgreSQL
2. `task-service` publica evento en Kafka
3. `notification-service` consume evento y guarda en MongoDB
4. Usuario ve notificaciones en el frontend

## 🚀 Tech Stack

**Backend:**
- Java 17 + Spring Boot
- PostgreSQL (tareas)
- MongoDB (notificaciones)
- Apache Kafka (eventos)

**Frontend:**
- Angular 21
- Angular Material

**DevOps:**
- Docker Compose

## ⚡ Ejecutar el Proyecto

### 1. Levantar servicios backend
```bash
docker-compose up -d
```

### 2. Levantar frontend
```bash
cd taskflow-frontend
npm install
ng serve
```

Abrir: http://localhost:4200

## 🌐 Endpoints

**Frontend:** http://localhost:4200

**task-service (puerto 8080):**
- `GET    /api/tasks` - Listar tareas
- `POST   /api/tasks` - Crear tarea
- `PUT    /api/tasks/{id}` - Actualizar tarea
- `DELETE /api/tasks/{id}` - Eliminar tarea

**notification-service (puerto 8081):**
- `GET /api/notifications` - Listar notificaciones

## 📋 Qué Demuestra

- ✅ Microservices independientes
- ✅ Event-driven con Kafka
- ✅ Database per service (PostgreSQL + MongoDB)
- ✅ REST APIs
- ✅ Frontend con Angular Material
- ✅ Containerización con Docker

## 📂 Estructura
```
taskflow/
├── task-service/          # Microservicio de tareas
├── notification-service/  # Microservicio de notificaciones
├── taskflow-frontend/     # Frontend Angular
└── docker-compose.yml     # Orquestación de servicios
```

## 🎯 Patrones Implementados

- Microservices architecture
- Event-driven architecture
- Database per service
- Repository pattern
- Layered architecture (Controller/Service/Repository)

---

