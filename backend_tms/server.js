import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './users.js';
import cors from 'cors';
import protect from './authMiddleware.js';

import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For JWT authentication
import Task from './tasks.js';

const app = express();
const PORT = 5000;

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proper CORS Configuration
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

// REGISTER USER (Hashing Password)
app.post("/api/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Registering user:", req.body);

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Account created successfully", newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating account", error });
    }
});

// LOGIN USER
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt:", req.body);

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

// DASHBOARD (Protected)
app.get("/api/dashboard", protect, async (req, res) => {
    try {
        const user = { name: req.user.name, email: req.user.email };
        const tasks = await Task.find({ userId: req.user.id });

        res.json({ user, tasks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard data", error });
    }
});

// ADD TASK (Protected)
app.post("/api/add-tasks", protect, async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;

        if (!title || !dueDate) {
            return res.status(400).json({ message: "Title and Due Date are required" });
        }

        const newTask = new Task({
            userId: req.user.id,
            title,
            description,
            dueDate,
            priority,
        });

        await newTask.save();
        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Error adding task", error });
    }
});

// DELETE TASK (Protected)
app.delete("/api/tasks/:id", protect, async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this task" });
        }

        await Task.findByIdAndDelete(taskId);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});

// UPDATE TASK (Protected)
app.put("/api/tasks/:id", protect, async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, dueDate, priority } = req.body;

        let task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this task" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;

        await task.save();

        res.json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});

// TOGGLE TASK COMPLETION (Protected)
app.put("/api/tasks/:id/completed", protect, async (req, res) => {
    try {
        const taskId = req.params.id;
        let task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this task" });
        }

        task.completed = !task.completed;
        await task.save();

        res.json({ message: "Task completion status updated", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating task status", error });
    }
});

// ADMIN: GET ALL USERS
app.get("/api/admin/users", async (req, res) => {
    try {
        const users = await User.find({}, "name email");
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
