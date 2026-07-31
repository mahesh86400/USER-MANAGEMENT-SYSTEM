# User Management System

A simple user management application built using Node.js, Express.js, EJS, and MySQL. It performs basic CRUD operations and is deployed on Railway.

## Live Demo

https://user-management-system-production-f50b.up.railway.app

## Features

- Add a new user
- View all users
- View user details
- Edit user information
- Delete users
- MySQL database integration
- RESTful routes
- Environment variables using dotenv

## Tech Stack

Frontend
- HTML
- CSS
- EJS

Backend
- Node.js
- Express.js

Database
- MySQL

Packages
- express
- ejs
- mysql2
- dotenv
- method-override

Deployment
- Railway
- GitHub

## Project Structure

```
USER-MANAGEMENT-SYSTEM
│
├── public/
├── views/
│   ├── home.ejs
│   ├── users.ejs
│   ├── detail.ejs
│   ├── new.ejs
│   └── edit.ejs
│
├── index.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

## Installation

Clone the repository

```bash
git clone https://github.com/mahesh86400/USER-MANAGEMENT-SYSTEM.git
```

Move into the project directory

```bash
cd USER-MANAGEMENT-SYSTEM
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=3306
PORT=3000
```

Run the application

```bash
node index.js
```

Open

```
http://localhost:3000
```

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | / | Home page |
| GET | /users | Display all users |
| GET | /users/new | Add user form |
| POST | /users | Create user |
| GET | /users/:id | View user |
| GET | /users/:id/edit | Edit user form |
| PATCH | /users/:id | Update user |
| DELETE | /users/:id | Delete user |

## What I Learned

- Express.js routing
- CRUD operations
- EJS templates
- MySQL integration
- Environment variables
- Git and GitHub
- Railway deployment

## Author

Mahesh Nusatwar

GitHub: https://github.com/mahesh86400
