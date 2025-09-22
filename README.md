# Node.js Authentication Assignment

**Description:**
A simple Node.js + Express project implementing **user authentication** with password hashing using `bcrypt` and **JWT-based authorization** for secure routes.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AmjadAzward/node-auth-assignment.git
cd node-auth-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
node server.js
```

Server will run at:
 `http://localhost:3000`

---

##  API Endpoints

### Register

**POST** `/register`
**Headers:** `Content-Type: application/json`
**Body:**

```json
{
  "username": "john",
  "password": "123456"
}
```

 Response:

```json
{
  "message": "User registered successfully"
}
```

---

### Login

**POST** `/login`
**Headers:** `Content-Type: application/json`
**Body:**

```json
{
  "username": "john",
  "password": "123456"
}
```

 Response:

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

---

### Profile (Protected)

**GET** `/profile`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`

 Valid token response:

```json
{
  "message": "Welcome john"
}
```

 Invalid/missing token response:

```json
{
  "message": "Unauthorized"
}
```

---

##  Dependencies

* `express` – Web framework
* `body-parser` – Parse request body
* `bcrypt` – Password hashing
* `jsonwebtoken` – Token generation & verification

---

##  Notes

* User data is stored **in-memory** (no database).
* JWT token expires in **1 hour**.
* Restarting the server clears registered users.

---

## Author

Ilma Habbab
