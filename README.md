# 🖥️ InventoryHub - Frontend Web Dashboard

[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A modern, responsive Single Page Application (SPA) for inventory management and catalog browsing built with **Angular 17**, utilizing **Standalone Components**, **Reactive Forms**, and **RxJS**.

Designed to consume the [Inventory Management REST API](https://github.com/SEU_USUARIO/inventory-api).

---

## 🚀 Key Features

- **Standalone Architecture:** 100% modern Angular without legacy `NgModule` boilerplate.
- **Dynamic Portfolio Metrics:** Real-time calculation of total SKUs, low-stock warnings, and total portfolio valuation.
- **Reactive Forms:** Form controls with real-time validation feedback, touched state styling, and error handling.
- **Stock Delta Operations:** Quick inline increment/decrement buttons sending patch requests directly to the backend.
- **Search & Filter:** Instant filtering by text query and category segregation.
- **Docker Support:** Multi-stage Docker build served over a lightweight Nginx web server.

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Dev Server
```bash
npm start
```
The application will open at: `http://localhost:4200`

> **Note:** Ensure the backend `inventory-api` is running on `http://localhost:8080`.

---

## 🐳 Running with Docker

```bash
docker build -t inventory-web .
docker run -p 4200:80 inventory-web
```

---

## 📄 License
MIT License.
