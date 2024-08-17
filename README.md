# Task Management Application

## Overview

This Task Management Application is a full-stack project that provides functionalities for users to manage their tasks and, for administrators, to manage users. The application is divided into two main components:

- **Backend:** A Node.js server using Express and SQLite for database management. It handles user authentication, task management, and user management with roles and permissions.
- **Frontend:** A React-based application using Redux for state management. It includes different layouts for guests, authorized users, and administrators, offering distinct functionalities and views.

## Features

### Backend

- **SQLite Database:** The backend uses SQLite to store user and task data. It initializes the database on startup, ensuring that required tables are created.
- **User Authentication:** Users can register and log in, with JWT tokens used for authentication. The application checks user roles and permissions for protected routes.
- **Task Management:** Users can create, update, delete, and view tasks associated with their accounts.
- **Admin Management:** Administrators can manage users, including viewing all users, updating user roles, and blocking users.
- **Middleware:** Custom middleware is used to authenticate tokens, extract user IDs, and check user roles.

### Frontend

- **React & Redux:** The frontend is built using React for the UI and Redux for managing global state, including authentication, tasks, and user data.
- **Formik & Yup:** Form handling and validation are managed with Formik and Yup, providing a robust and user-friendly form experience.
- **Routing:** The app uses React Router for navigation, with protected routes ensuring that only authorized users and administrators can access specific pages.
- **Layouts:** There are three distinct layouts:
  - **PublicLayout:** For guests and visitors.
  - **PrivateLayout:** For authenticated users.
  - **AdminLayout:** For administrators, with additional management capabilities.
- **Responsive Design:** The application uses Flexbox and other CSS techniques to ensure a responsive and user-friendly design.

## Project Structure

### Backend

- **backend/database.js**: Manages the SQLite database, including initialization and user setup.
- **backend/middleware.js**: Contains middleware for authentication and role checking.
- **backend/server.js**: Main entry point for the backend server, handling routes and server setup.

### Frontend
- **frontend/src/store**: Contains Redux slices for managing authentication, tasks, and users.
- **frontend/src/pages**: Different pages for public, private, and admin views.
- **frontend/src/components**: Reusable components, including forms and task items.
- **frontend/src/layouts**: Layout components for public, private, and admin views.
- **frontend/src/routes**: Contains routing logic, including protected routes.

## API Endpoints

### Authentication

- **POST /register**: Register a new user.
- **POST /login**: Log in a user and receive a JWT token.

### Task Management

- **GET /tasks**: Get all tasks for the authenticated user.
- **POST /newtask**: Create a new task.
- **GET /task/:id**: Get details of a specific task.
- **PUT /task/:id**: Update a specific task.
- **DELETE /task/:id**: Delete a specific task.

### User Management (Admin Only)

- **GET /users**: Get a list of all users.
- **GET /user/:id**: Get details of a specific user.
- **PUT /user/:id**: Update a specific user.

### Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.

### Acknowledgements

Thanks to the creators of React, Redux, Formik, Yup, and Express for their excellent tools.
Special thanks to SQLite for providing a lightweight and easy-to-use database.