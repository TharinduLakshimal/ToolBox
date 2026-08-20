# 🛠️ ToolBox Project

A professional **full‑stack application** built with a **React** frontend, **Java (Spring Boot)** backend, and **MySQL** database. The entire ecosystem is **fully containerized with Docker** for seamless deployment, scalability, and consistency across environments.

---

## 🏗️ Architecture & Features

This project follows a modern, container‑based architecture:

* **Frontend**: React Single Page Application (SPA) served via **Nginx**

  * Configured with fallback routing for SPA support
* **Backend**: Spring Boot REST API (Java 17)
* **Database**: MySQL 8.0

  * Includes automated **health checks**
* **Portability**: Fully Dockerized — *"works on my machine" works everywhere*

---

## 🧰 Tech Stack

* **Frontend**: React, Nginx
* **Backend**: Java 17, Spring Boot
* **Database**: MySQL 8.0
* **Containerization**: Docker, Docker Compose

---

## 🚀 Getting Started

### Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

---

## ▶️ Running the Application

### Option 1: Run via Docker Hub (Fastest)

Pre‑built Docker images are available on Docker Hub. You only need the `docker-compose.yml` file.

```bash
docker-compose up -d
```

Docker will automatically pull the latest images:

* `tharindulakshimal/toolbox-backend`
* `tharindulakshimal/toolbox-frontend`

---

### Option 2: Clone & Build Locally

Use this option if you want to view or modify the source code.

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/TharinduLakshimal/ToolBox.git
cd ToolBox
```

#### 2️⃣ Build and start the containers

```bash
docker-compose up --build
```

---

## 🔗 Access Points

| Service  | URL                                            | Description           |
| -------- | ---------------------------------------------- | --------------------- |
| Frontend | [http://localhost:3000](http://localhost:3000) | Web User Interface    |
| Backend  | [http://localhost:8080](http://localhost:8080) | REST API Endpoints    |
| Database | localhost:3306                                 | MySQL Connection Port |

---

## 📦 Project Highlights

* Clean separation of frontend, backend, and database
* Production‑ready Nginx configuration for React SPA
* Health‑checked MySQL container
* Easy one‑command startup using Docker Compose

---

## 📄 License

This project is for educational and demonstration purposes.

---


