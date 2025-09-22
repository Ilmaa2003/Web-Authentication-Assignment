const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Secret key for JWT
const JWT_SECRET = "mysecretkey123";

// In-memory users array
let users = [];

// ----------------------
// REGISTER ROUTE
// ----------------------
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
});

// ----------------------
// LOGIN ROUTE
// ----------------------
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
});

// ----------------------
// PROTECTED ROUTE
// ----------------------
app.get("/profile", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: `Welcome ${decoded.username}` });
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
});

// ----------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
