# Employee Task Tracker

A **full-stack task management system** built using the **MERN stack**. Easily manage employees, assign tasks, track progress, and view dashboard insights — all in a clean and modern UI.

---

## Demo Video

Watch the full demo of **Employee Task Tracker**:
**[Google Drive Link]** *(Add your link here)*

---

## Overview

**Employee Task Tracker** lets you:

* View all employees
* Create, view, edit, and delete tasks
* Update task status in real-time
* View a dashboard summary
* Manage everything through a clean React interface
* Use modal popups for adding/editing tasks (no page reloads)

It’s a simple and effective **internal tool** for companies to manage tasks smoothly.

---

## Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React (Vite)            |
| Backend  | Node.js + Express       |
| Database | MongoDB + Mongoose      |
| UI/UX    | Custom Components + CSS |

---

## Key Features

* Task creation & editing via **modal dialogs**
* Employee & task listings
* Status updates (todo → in-progress → done)
* Delete tasks with confirmation
* Dashboard overview with:

  * Total tasks
  * Completed tasks
  * Completion rate
  * Tasks per employee
* Smooth UI with React + Axios
* Clean, modular folder structure

---

## How It Works (Simple)

1. **Employees** and **Tasks** are stored in MongoDB.
2. Backend exposes REST APIs for CRUD operations.
3. React frontend fetches data via Axios.
4. Users interact through a clean UI with modals.
5. Dashboard aggregates task statistics dynamically.

---

## ⚡ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee-tracker
```

Seed sample data (optional):

```bash
npm run seed
```

Run backend:

```bash
npm run dev
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env.local`:

```
VITE_API_URL=http://localhost:5000/api
```

Open the app at:
**[http://localhost:5173](http://localhost:5173)**

---

## API Overview

### Employees

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/employees` | Get all employees |

---

### Tasks

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/tasks`     | Get all tasks   |
| POST   | `/api/tasks`     | Create new task |
| PUT    | `/api/tasks/:id` | Update task     |
| DELETE | `/api/tasks/:id` | Delete task     |

---

### Dashboard

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/api/dashboard` | Task analytics summary |

Example response:

```json
{
  "totalTasks": 12,
  "doneTasks": 5,
  "completionRate": 41,
  "tasksPerEmployee": [
    { "employee": "Khushi", "count": 4 },
    { "employee": "Alex", "count": 3 }
  ]
}
```

---

## Concepts Explained

| Term             | Meaning                                              |
| ---------------- | ---------------------------------------------------- |
| REST API         | Standard way to structure backend endpoints          |
| Modal Form       | Pop-up interface for creating/editing tasks          |
| Aggregation      | MongoDB method for computing dashboard statistics    |
| State Management | React hooks (`useState`, `useEffect`) for UI updates |

---

## Preview

(Add screenshots here once available)

```
![Dashboard Screenshot](frontend/public/dashboard.png)
![Tasks Screenshot](frontend/public/tasks.png)
![Employees Screenshot](frontend/public/employees.png)
```

---

## About Me

Hi! I’m **Khushi Kashyap** 👋
I enjoy building **clean UI**, **scalable backend systems**, and **full-stack web apps**.
This project showcases my skills in the **MERN stack**, clean architecture, and modern frontend design.

---
