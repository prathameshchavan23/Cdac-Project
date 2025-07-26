
# Student ERP System - Full-Stack Application

This is a comprehensive, full-stack Enterprise Resource Planning (ERP) system designed to manage core academic operations for an educational institution. The application features distinct, role-based interfaces and functionalities for both administrators and students, providing a centralized platform for managing student data, academic schedules, grades, attendance, and feedback.

The backend is built with a secure, stateless RESTful API using Spring Boot, while the frontend is a dynamic and responsive Single Page Application (SPA) built with React.






# Features


## Admin Features

- Dashboard: An "at a glance" view of key system statistics like total students, instructors, and modules.

- User Management: Full CRUD (Create, Read, Update, Delete) functionality for managing Admins, Students, and Instructors.

- Academic Management: Full CRUD for Departments and Course Modules.

- Timetable Management: Create, view, update, and delete class schedules, linking modules and instructors.

- Grades Management: Create exams and record/update student marks (lab and internal) in bulk.

- Attendance Tracking: Mark and update student attendance for specific class sessions in bulk.

- Feedback System: Create feedback sessions and view detailed analytics, including average ratings and anonymous student comments.

- Secure Registration: The ability to register new admins is restricted to users with a "Super Admin" role.

## Student Features

- Dashboard: A personalized dashboard showing key stats like total courses, attendance percentage, and a list of today's classes.

- Profile Management: View and manage personal profile details.

- View Timetable: Access the daily and weekly class schedule.

- View Marks: A consolidated view of all marks obtained in various exams.

- View Attendance: Check personal attendance records.

- Feedback Submission: View active feedback sessions and submit anonymous feedback for instructors and modules.
## Tech Stack

- Backend: Node.js with WebSocket for server-side data processing

- Frontend: HTML5, CSS3, JavaScript (with Chart.js for rendering charts)

- Real-Time Data: Binance WebSocket API

# 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

## Prerequisites

Backend :
   - JDK 17 or newer
   - Apache Maven
   - MySQL 
 
Frontend:
   - NPM
   

## Getting Started

Make sure you have the following installed:

- Node.js

- npm (comes with Node.js)



## Backend setup 

1. Clone the repository:

```bash
git clone https://github.com/prathameshchavan23/Cdac-Project
cd Backend
```

2. Database Configuration:

 - Create a new MySQL database (e.g., cdac_project).
 - Open src/main/resources/application.properties.
 - Update the spring.datasource properties with your MySQL url, username, and password.
 
3. Application Configuration

- In application.properties, update the jwt.secret with a new, long, and secure secret key.

4. Run the application

```bash
mvn spring-boot:run
```
The backend server will start on http://localhost:8080.


## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```
The React application will start on http://localhost:5173 (or another port specified by Vite).
## Usage

1. On page load, the default candlestick chart for ETH/USDT with a 1-minute interval will be displayed.

2. Use the dropdown menus to select different cryptocurrencies and intervals.

3. The chart will update in real-time with candlestick data for the selected coin.

4. Switch between coins and intervals while maintaining previously fetched data.


## 📋 API Endpoints

A complete list of all available API endpoints is provided below. All administrative endpoints under `/api/admin/**` and student endpoints under `/api/student/**` require a valid JWT Bearer Token for authorization.

<details>
<summary><strong>Click to Expand API Endpoint List</strong></summary>

### Authentication

| HTTP Method | URL Path                 | Description                                      |
| :---------- | :----------------------- | :----------------------------------------------- |
| `POST`      | `/api/auth/register/admin` | (Super Admin Only) Registers a new administrator. |
| `POST`      | `/api/auth/login`          | Logs in a user and returns a JWT.                |

### Admin Management

| HTTP Method | URL Path               | Description                       |
| :---------- | :--------------------- | :-------------------------------- |
| `GET`       | `/api/admin/admins`      | Gets a list of all administrators. |
| `GET`       | `/api/admin/admins/{id}` | Gets a single administrator.      |
| `PUT`       | `/api/admin/admins/{id}` | Updates an administrator.         |
| `DELETE`    | `/api/admin/admins/{id}` | Deletes an administrator.         |

*(...and so on for all other features as detailed in the API list previously provided)*

</details>

## Usage

1.  **Run the Backend and Frontend** servers.
2.  The application requires at least one **Super Admin** to function. Use the dummy data SQL script or register the first Super Admin manually.
3.  Log in as the Super Admin to access the administrative dashboard and start managing the system.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


