# 📚 BookNest

### Books & Authors Management Platform

BookNest is a modern **Single Page Application (SPA)** for discovering, exploring, and managing books and authors.

The project was developed as a **graduation project during my ITI training**, with a focus on building a scalable and interactive web application using modern frontend technologies.

BookNest provides a public platform for users to explore books and authors, along with an administrative dashboard for managing application data through complete CRUD operations. It also integrates an **AI-powered assistant using Google Gemini** to provide contextual answers about books and authors.

---

## 🚀 Project Overview

BookNest is designed with two main sections:

### 🌐 Public Website

Users can:

* Browse available books
* Search books by title
* Filter books by author
* View detailed book information
* Browse and search authors
* View detailed author profiles
* Read about the platform through the About page
* Interact with an FAQ section
* Ask questions through the AI Assistant
* Switch between Light and Dark Mode
* Use the application on different screen sizes

### 🔐 Admin Dashboard

Administrators can manage the application's data through:

* Dashboard overview
* Books management
* Authors management
* Create new books and authors
* Update existing records
* Delete records
* Form validation
* Duplicate book validation
* Loading, error, and empty states
* Toast notifications

---

## ✨ Key Features

* 📚 Books Management
* 👩‍💻 Authors Management
* 🔍 Search & Filtering
* 📖 Book Details
* 👤 Author Details
* 🔐 Admin Dashboard
* ✏️ Full CRUD Operations
* ✅ Form Validation
* 🤖 AI Assistant
* 🌙 Dark / Light Mode
* 🔔 Toast Notifications
* ⏳ Loading States
* ⚠️ Error Handling
* 📱 Responsive Design
* ❓ FAQ Accordion
* 🧩 Reusable Vue Components

---

## 🤖 AI Assistant

BookNest integrates an AI-powered assistant using the **Google Gemini API**.

The assistant receives contextual information from the application's books and authors data and uses it to provide relevant answers to user questions.

### Example Questions

* Who wrote this book?
* Tell me about this author.
* When was this book published?
* Tell me more about this book.
* What books are available?

This feature demonstrates the integration of **Generative AI with a frontend web application**.

---

## 🛠️ Technologies Used

### Frontend

* **Vue 3**
* **Vite**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Bootstrap**

### State Management

* **Pinia**

### Routing

* **Vue Router**

### API & Data Management

* **REST API**
* **JSON Server**
* **Axios / Fetch**

### Artificial Intelligence

* **Google Gemini API**
* **@google/genai**

### Development Tools

* **Git**
* **GitHub**
* **npm**
* **Visual Studio Code**

---

## 🏗️ Project Architecture

The project follows a component-based architecture using Vue 3.

```text
BookNest/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── layouts/
│   │
│   ├── router/
│   │
│   ├── services/
│   │   └── ai.js
│   │
│   ├── stores/
│   │   ├── auth.js
│   │   ├── authors.js
│   │   └── books.js
│   │
│   └── views/
│       ├── public/
│       └── admin/
│
├── db.json
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── .env.example
└── README.md
```

---

## 🔗 Application Routes

### Public Routes

| Route          | Description     |
| -------------- | --------------- |
| `/`            | Home Page       |
| `/about`       | About & FAQ     |
| `/books`       | Books Listing   |
| `/books/:id`   | Book Details    |
| `/authors`     | Authors Listing |
| `/authors/:id` | Author Details  |

### Admin Routes

| Route                     | Description        |
| ------------------------- | ------------------ |
| `/admin`                  | Admin Dashboard    |
| `/admin/books`            | Books Management   |
| `/admin/books/new`        | Add New Book       |
| `/admin/books/:id/edit`   | Edit Book          |
| `/admin/authors`          | Authors Management |
| `/admin/authors/new`      | Add New Author     |
| `/admin/authors/:id/edit` | Edit Author        |

---

## 🔌 API

The project uses **JSON Server** as a mock REST API.

### Base URL

```text
http://localhost:3000
```

### Books Endpoints

```text
GET     /books
GET     /books/:id
POST    /books
PUT     /books/:id
DELETE  /books/:id
```

### Authors Endpoints

```text
GET     /authors
GET     /authors/:id
POST    /authors
PUT     /authors/:id
DELETE  /authors/:id
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd BookNest
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start JSON Server

```bash
npx json-server --watch db.json --port 3000
```

The API will be available at:

```text
http://localhost:3000
```

### 5. Start the Development Server

Open another terminal and run:

```bash
npm run dev
```

The application will then be available through the Vite development server.

---

## 🔑 Environment Variables

The AI Assistant requires a Google Gemini API key.

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

> ⚠️ **Security Note:** Never commit your actual `.env` file or API key to GitHub.

A `.env.example` file is provided as a template for configuring the required environment variables.

---

## 🎯 Learning Outcomes

This project provided practical experience in:

* Developing Single Page Applications using Vue 3
* Working with the Composition API and `<script setup>`
* Managing application state using Pinia
* Implementing navigation with Vue Router
* Consuming and managing REST APIs
* Implementing CRUD operations
* Building reusable and maintainable components
* Implementing form validation
* Implementing search and filtering functionality
* Handling loading, error, and empty states
* Integrating Generative AI into a web application
* Building responsive user interfaces
* Using Git and GitHub for version control

---

## 🔮 Future Improvements

Future versions of BookNest could include:

* Real backend integration
* Real database integration
* User authentication and authorization
* User profiles
* Favorites and reading lists
* Book ratings and reviews
* Personalized AI recommendations
* Pagination
* Advanced search
* Cloud deployment

---

## 👩‍💻 Author

**Sama Bakry**

Computer Engineering Student | Full Stack Developer

This project was developed as part of my **ITI graduation training project**.

--
