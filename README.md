# 🛒 Sahi E-commerce Platform

A full-stack e-commerce web application developed using React.js, Spring Boot, and MySQL.

This project demonstrates hands-on experience in:

- SQL database design and query implementation
- Frontend UI development using HTML, CSS, JavaScript
- REST API development using Spring Boot
- Authentication and role-based authorization
- Real-world shopping features such as cart, wishlist, and order management

---

# Tech Stack

## Frontend
- React.js
- HTML5
- CSS3
- JavaScript

## Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication

## Database
- MySQL
- JPA / Hibernate

---

# Features

## User Features

- User registration and login
- JWT-based authentication
- Product browsing
- Product search and filtering
- Add to cart
- Wishlist management
- Order placement
- User profile management

## Admin Features

- Admin login
- Product management
- Order monitoring
- User management
- Dashboard analytics

---

# SQL Implementation

This project uses MySQL for data storage.

### Database Tables

- users
- roles
- products
- cart_items
- wishlist_items
- orders
- order_items

### Sample SQL Queries

```sql
SELECT * FROM products;

SELECT * FROM users;

SELECT * FROM orders;

SELECT * FROM wishlist_items;
```

### Entity Relationships

- One user can have multiple orders
- One user can have multiple cart items
- One product can belong to multiple orders

---

# CSS Implementation

Custom CSS was used to build:

- Responsive navigation bar
- Product cards
- Shopping cart UI
- Wishlist UI
- Admin dashboard
- Login and registration pages

Example:

```css
.product-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}
```

---

# API Endpoints

## Authentication

- POST /api/auth/register
- POST /api/auth/login

## Products

- GET /api/products
- POST /api/products

## Cart

- GET /api/cart
- POST /api/cart

## Wishlist

- GET /api/wishlist
- POST /api/wishlist

---

# Project Screenshots

(Add your screenshots here)

- Home Page
- Product Page
- Cart Page
- Wishlist Page
- Admin Dashboard
- MySQL Database Tables

---

# Project Setup

## Backend

```bash
cd backend
mvn spring-boot:run
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# GitHub Repository

Project developed by Shenbaga Kasthuri.
