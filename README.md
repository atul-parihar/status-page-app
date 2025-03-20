# Status Page Application

This repository contains the source code for a simplified status page application with separate backend and frontend directories. The application allows user authentication, service management, incident tracking, and status updates.

## General Walkthrough

### 1. Project Structure
The repository is organized as follows:
- **Backend**: Contains the server-side logic built using Node.js and Express.
  - Handles user authentication and service-related APIs.
  - Exposes RESTful endpoints for frontend consumption.
- **Frontend**: Built with React (Vite) for a responsive and dynamic user interface.
  - Allows users to view statuses, manage incidents, and track services.

### 2. Backend Overview
- **Technologies Used**: Node.js, Express, MongoDB (for database).
- **Key Features**:
  - User authentication and authorization.
  - Service management APIs.
  - Incidents maintenance management.
- **Endpoints**:
  - `/auth/login` - Login user.
  - `/auth/register` - Register new user.
  - `/services` - CRUD operations for services.
  - `/incidents` - Manage incidents.

### 3. Frontend Overview
- **Technologies Used**: React, Axios, TailwindCSS.
- **Key Features**:
  - User-friendly interface for managing and viewing statuses.
  - Integration with backend for data fetching.
  - Persistent user sessions using `localStorage`.
- **Components**:
  - `AuthContext.jsx`: Manages authentication state.
  - `Login.jsx`: Handles user login.
  - `Dashboard.jsx`: Displays services and incidents.
  - `StatusPage.jsx`: Public status page for users to track updates.

### 4. Environment Variables
#### Backend
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JSON Web Tokens.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/atul-parihar/status-page-app
cd status-page-app
```

### 2. Setup Backend
```bash
cd backend
npm install
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
  

