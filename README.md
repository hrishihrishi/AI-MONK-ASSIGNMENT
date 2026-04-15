# Nested Tags Tree — Full Stack Assignment

A full-stack web application for managing nested tag hierarchies through a recursive, interactive tree UI. Built with **React (Vite)** on the frontend and **Django REST Framework** on the backend.

---

## 🚀 Features

### Core
- **Recursive TagView Component** — Dynamically renders nested tree structures with unlimited depth. Each tag can hold either a `data` field or `children` nodes.
- **Dynamic Hierarchy Management** — "Add Child" button transforms a leaf node (with `data`) into a parent node (with `children`), enabling on-the-fly hierarchy building.
- **Collapse / Expand** — Each tag node can be toggled open (`v`) or closed (`>`) to manage large trees visually.
- **Editable Data Fields** — Inline `<input>` fields allow real-time editing of the `data` property on any leaf node.
- **Multiple Independent Trees** — Create, manage, and persist multiple separate tree structures, each rendered independently.

### Persistence & API
- **Full CRUD Operations** — Create, Read, Update, and Delete tree structures via a RESTful API.
- **Persistent Storage** — All trees are saved to a **SQLite** database using Django's `JSONField`, preserving the complete nested structure.
- **Smart Save Logic** — Automatically determines whether to `POST` (create) or `PUT` (update) based on whether the tree has an existing database ID.

### Export
- **JSON Export** — The tree structure (containing only `name`, `children`, and `data`) is logged to the console on save, matching the required export format.
- **CSV Export** — Download a flattened representation of all trees as a `.csv` file, including columns for Tree ID, Tag Name, Data, and Parent Tag.

### Bonus
- **Inline Name Editing** — Click on any tag name to enter edit mode. Press `Enter` to confirm the change.

---

## 🛠️ Tech Stack

| Layer      | Technology                                       |
|------------|--------------------------------------------------|
| Frontend   | React 19, Vite 8, JavaScript (ES Modules)        |
| Backend    | Python 3.12, Django 6.0, Django REST Framework    |
| Database   | SQLite (SQL-based, file-level, zero-config)       |
| API Style  | RESTful (`GET`, `POST`, `PUT`, `DELETE`)          |
| CORS       | `django-cors-headers`                            |

---

## 📁 Project Structure

```
AI_MONK/
├── frontend/                        # React (Vite) frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── treeService.js       # API service layer (fetch wrappers)
│   │   ├── components/
│   │   │   └── TagView.jsx          # Recursive tag component
│   │   ├── hooks/
│   │   │   ├── useTrees.js          # Custom hook for tree CRUD state logic
│   │   │   └── useTags.js           # Helper for child deletion
│   │   ├── utils/
│   │   │   └── exportCSV.js         # CSV flattening & download utility
│   │   ├── App.jsx                  # Main application component
│   │   ├── App.css                  # Application styles
│   │   └── main.jsx                 # React entry point
│   ├── .env                         # Environment variables (API URL)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── tree_project/                    # Django backend
│   ├── tree_project/                # Django project config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── tags/                        # Django app for tag trees
│   │   ├── models.py                # TagTree model (JSONField)
│   │   ├── serializers.py           # DRF serializer
│   │   ├── views.py                 # ModelViewSet (auto CRUD)
│   │   ├── urls.py                  # Router-based URL config
│   │   └── migrations/
│   ├── db.sqlite3                   # SQLite database file
│   └── manage.py
│
├── .gitignore
└── README.md
```

---

## 📦 Installation & Setup

### Prerequisites
- **Python** 3.10+ installed
- **Node.js** 18+ and **npm** installed
- **Git** (optional, for cloning)

> **Note:** If you received this project as a `.zip` file, extract it and skip the clone step.

---

### 1. Backend Setup (Django)

```bash
# Navigate to the project root
cd AI_MONK

# Create a Python virtual environment
python3 -m venv .venv

# Activate the virtual environment
source .venv/bin/activate          # Linux / macOS
# .venv\Scripts\activate           # Windows (Command Prompt)
# .venv\Scripts\Activate.ps1       # Windows (PowerShell)

# Install Python dependencies
pip install django djangorestframework django-cors-headers

# Navigate to the Django project
cd tree_project

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django development server
python manage.py runserver
```

The backend API will be available at: **http://127.0.0.1:8000/api/**

---

### 2. Frontend Setup (React + Vite)

Open a **new terminal** (keep the backend server running):

```bash
# Navigate to the frontend directory
cd AI_MONK/frontend

# Install Node.js dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend will be available at: **http://localhost:5173/**

---

### 3. Environment Configuration

The frontend uses a `.env` file to configure the backend API URL. A default is already included:

```env
# frontend/.env
VITE_API_URL=http://127.0.0.1:8000/api
```

If your Django server runs on a different host/port, update this file accordingly.

---

## 🔌 API Endpoints

All endpoints are served at `http://127.0.0.1:8000/api/trees/`

| Method   | Endpoint              | Description                  |
|----------|-----------------------|------------------------------|
| `GET`    | `/api/trees/`         | Retrieve all saved trees     |
| `POST`   | `/api/trees/`         | Create a new tree structure  |
| `GET`    | `/api/trees/<id>/`    | Retrieve a single tree by ID |
| `PUT`    | `/api/trees/<id>/`    | Update an existing tree      |
| `DELETE` | `/api/trees/<id>/`    | Delete a tree by ID          |

### Example Request Body (POST / PUT)

```json
{
  "content": {
    "name": "root",
    "children": [
      {
        "name": "child1",
        "data": "some data"
      },
      {
        "name": "child2",
        "children": [
          {
            "name": "grandchild1",
            "data": "nested data"
          }
        ]
      }
    ]
  }
}
```

### Example Response

```json
{
  "id": 1,
  "content": {
    "name": "root",
    "children": [
      { "name": "child1", "data": "some data" },
      { "name": "child2", "children": [{ "name": "grandchild1", "data": "nested data" }] }
    ]
  }
}
```

---

## 🧩 Architecture Overview

```
┌─────────────────────────────────────────┐
│               Frontend (React)          │
│                                         │
│  App.jsx ──► useTrees() hook            │
│               │  ├─ getData()           │
│               │  ├─ postData()          │
│               │  ├─ putData()           │
│               │  └─ deleteData()        │
│               │                         │
│               ▼                         │
│  TagView.jsx  (recursive component)     │
│               │                         │
│  exportCSV.js (flatten + download)      │
└────────────────┬────────────────────────┘
                 │  HTTP (REST)
                 ▼
┌─────────────────────────────────────────┐
│              Backend (Django)           │
│                                         │
│  urls.py ──► TagTreeViewSet (DRF)       │
│              TagTreeSerializer          │
│              TagTree Model (JSONField)  │
│                     │                   │
│                     ▼                   │
│              SQLite Database            │
└─────────────────────────────────────────┘
```

---

## 📋 How to Use

1. **Create a Tree** — Click the `+ Create New Tree` button to initialize a new root node.
2. **Add Children** — Click `Add Child` on any tag to add a nested child node beneath it.
3. **Edit Names** — Click on any tag name to edit it inline. Press `Enter` to confirm.
4. **Edit Data** — Modify the data field directly via the input box on any leaf node.
5. **Collapse / Expand** — Click `v` or `>` to toggle visibility of child nodes.
6. **Save to Database** — Click `Save` to persist the tree. New trees are created; existing trees are updated.
7. **Delete a Tree** — Click `Delete` to remove the entire tree from the database.
8. **Download CSV** — Click `Download CSV` to export a flattened version of all trees as a `.csv` file.

---

## ⚠️ Important Notes

- **Both servers must be running simultaneously** — the Django backend (port `8000`) and the Vite frontend (port `5173`).
- The `db.sqlite3` file is included in the zip so you can see pre-existing sample data. Run `python manage.py migrate` if you encounter any database issues.
- CORS is configured via `django-cors-headers` with `CORS_ALLOW_ALL_ORIGINS = True` for development convenience.
