# COMP 3123 — Assignment 1 (Backend, 10%)

Node.js + Express + MongoDB REST API for **User** and **Employee** management.

## Tech
- Node.js, Express, Mongoose
- Validation via `express-validator`
- Password hashing via `bcryptjs`
- Optional JWT via `jsonwebtoken`
- CORS, Helmet, Morgan

## Endpoints (exact paths and status codes)
Base URLs
- User: `/api/v1/user`
- Employee: `/api/v1/emp`

| # | Method | Endpoint                        | Status | Purpose |
| - | ------ | --------------------------------| ------ | ------- |
| 1 | POST   | `/api/v1/user/signup`           | 201    | Create user |
| 2 | POST   | `/api/v1/user/login`            | 200    | Login (username/email + password) |
| 3 | GET    | `/api/v1/emp/employees`         | 200    | List all employees |
| 4 | POST   | `/api/v1/emp/employees`         | 201    | Create employee |
| 5 | GET    | `/api/v1/emp/employees/{eid}`   | 200    | Get employee by ID |
| 6 | PUT    | `/api/v1/emp/employees/{eid}`   | 200    | Update employee by ID |
| 7 | DELETE | `/api/v1/emp/employees?eid=xxx` | 204    | Delete employee by ID (query param) |

## Quick Start
```bash
# 1) Install deps
npm i

# 2) Copy env
cp .env.example .env

# 3) MongoDB is enabled via Atlas

# 4) Run
npm run dev   # or: npm start
```

## Sample credentials
```
username: johndoe
email: johndoe@example.com
password: password123
```

## Optional: Protect Employees with JWT
Set `PROTECT_EMP_ROUTES=true` and provide a `JWT_SECRET` in `.env`. Then:
- Sign up, login, copy `jwt_token`.
- Add header: `Authorization: Bearer <token>` to all Employee requests.

