
# COMP3123 Assignment 2 – Full-Stack Employee Management System

This project implements both:

- **Assignment 1 (Backend REST API)**
- **Assignment 2 (Frontend Web Application)**

The web application provides user authentication, employee management (CRUD), image uploads, and a full UI built using React.

**Deployed Production App:**  
https://comp3123-assignment-743ace70f4c9.herokuapp.com/

---

## Tech Stack

### **Backend**
- Node.js, Express
- MongoDB Atlas (Mongoose)
- Multer for image uploads
- JWT Authentication
- express-validator
- Helmet, CORS, Morgan

### **Frontend**
- React (CRA)
- React Router
- Bootstrap 5
- Axios with interceptors
- LocalStorage token auth

### **Deployment**
- Heroku (Node.js buildpack)

---

## Project Structure

```
src/
 ├── backend/
 │    ├── controllers/
 │    ├── middleware/
 │    ├── models/
 │    ├── routes/
 │    ├── utils/
 │    ├── uploads/ (runtime-only)
 │    └── server.js
 │
 └── frontend/
      ├── public/
      ├── src/
      │    ├── pages/
      │    ├── components/
      │    ├── context/
      │    ├── api/
      │    └── App.js
      └── package.json
```

---

## Running Locally

### 1. Install root dependencies
```bash
npm install
```

### 2. Install frontend dependencies
```bash
cd src/frontend
npm install
```

### 3. Create `.env` in root

```
PORT=3000
NODE_ENV=development

MONGODB_URI=<yourAtlasURI>

JWT_SECRET=this_is_a_random_string
JWT_EXPIRES_IN=1d

PROTECT_EMP_ROUTES=false
```

### 4. Start full stack
```bash
npm run dev
```

- Backend → http://localhost:3000  
- Frontend → http://localhost:3001  

---

## API Endpoints

Base URL: `/api/v1`

### **User Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/signup` | Register user |
| POST | `/user/login` | Login, receive JWT |

### **Employee Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/emp/employees` | List employees (supports filters) |
| POST | `/emp/employees` | Create employee (supports profile picture) |
| GET | `/emp/employees/:eid` | Get specific employee |
| PUT | `/emp/employees/:eid` | Update employee |
| DELETE | `/emp/employees?eid=ID` | Delete employee |

### Search Filters
`GET /emp/employees` supports:

```
?name=Phil
?department=HR
?position=Developer
```

Name matches first or last name (case-insensitive).

---

## Frontend Features

### Authentication (Login & Signup)
- Token saved to localStorage
- Protected routes using a custom `<PrivateRoute />`

### Employee List Page
- Loads employees on mount
- Search by:
  - Name  
  - Department  
  - Position  
- Displays profile pictures

### Create/Edit Employee
- Full form with multipart upload  
- Uploads profile picture to backend  
- Updates displayed employee list immediately

### Delete Employee
- Soft deletion through API  
- Immediate UI refresh

---

## Profile Picture Handling

### Upload Flow
- React → `FormData` → Express/Multer
- File saved to:
  ```
  src/backend/uploads/<random>.jpg
  ```
- URL stored in MongoDB:
  ```
  https://comp3123-assignment-743ace70f4c9.herokuapp.com/uploads/<file>.jpg
  ```

###  Heroku Limitation
Heroku dynos **do not persist uploaded files**.

This means:

- Images work during normal use  
- They **disappear after dyno restart or redeploy**  
- MongoDB will still contain old URLs, but the file will be missing
- Most existing pictures **will not display**

---

## Deployment (Heroku)

### Required Config Vars (already seeded server side):

```
MONGODB_URI=<atlas>
JWT_SECRET=<secret>
JWT_EXPIRES_IN=1d
NODE_ENV=production
PROTECT_EMP_ROUTES=false
```

Uploads served via:
```js
app.use("/uploads", express.static("src/backend/uploads"));
```

---

## Sample Login

```
email: testuser1@example.com
password: Password123
```

---

## Summary

This full-stack system implements:

- Secure JWT login
- Complete employee CRUD
- Image uploads
- Full frontend UI
- Search and filtering
- Deployed backend + frontend on Heroku
- Postman automated tests

