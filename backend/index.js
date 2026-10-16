import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data.json");
const resources = ["students", "teachers", "courses", "attendance", "exams", "fees"];
const seed = {
  students: [{ id: "s1", name: "Olivia Martin", email: "olivia@example.com", className: "Grade 10", department: "Science", status: "Active" }, { id: "s2", name: "Noah Williams", email: "noah@example.com", className: "Grade 9", department: "Commerce", status: "Active" }, { id: "s3", name: "Emma Davis", email: "emma@example.com", className: "Grade 11", department: "Arts", status: "Active" }],
  teachers: [{ id: "t1", name: "Sophia Wilson", email: "sophia@example.com", subject: "Mathematics", phone: "9876543210", status: "Active" }],
  courses: [{ id: "c1", name: "Science", code: "SCI-101", teacher: "Sophia Wilson", duration: "1 year", status: "Active" }],
  attendance: [{ id: "a1", date: new Date().toISOString().slice(0, 10), student: "Olivia Martin", status: "Present" }, { id: "a2", date: new Date().toISOString().slice(0, 10), student: "Noah Williams", status: "Present" }, { id: "a3", date: new Date().toISOString().slice(0, 10), student: "Emma Davis", status: "Absent" }],
  exams: [{ id: "e1", name: "Mid Term Examination", subject: "Science", date: "2026-10-15", className: "Grade 10", status: "Scheduled" }],
  fees: [{ id: "f1", student: "Olivia Martin", amount: 25000, paid: 25000, dueDate: "2026-09-30", status: "Paid" }]
};

function readData() {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2));
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}
function writeData(data) { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); }
function makeId() { return crypto.randomUUID(); }
function validateStudent(data, students, currentId = null) {
  if (!data.name || !data.email || !data.className) return "Name, email, and class are required.";
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Please enter a valid student email.";
  if (students.some((student) => student.email.toLowerCase() === data.email.toLowerCase() && student.id !== currentId)) return "A student with this email already exists.";
  return null;
}

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true, service: "StudentHub API" }));
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: "Valid email and password are required." });
  res.json({ token: "studenthub-local-token", user: { name: email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), email } });
});

app.get("/api/dashboard", (req, res) => {
  const data = readData();
  const attendance = data.attendance.length ? Math.round(data.attendance.filter((item) => item.status === "Present").length / data.attendance.length * 100) : 0;
  const totalFees = data.fees.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const paidFees = data.fees.reduce((sum, item) => sum + Number(item.paid || 0), 0);
  res.json({ stats: { students: data.students.length, teachers: data.teachers.length, activeClasses: data.courses.length, courses: data.courses.length, attendance, totalFees, paidFees, pendingFees: totalFees - paidFees }, recentStudents: data.students.slice(-5).reverse(), recentActivities: [{ title: "Data is up to date", detail: "StudentHub records are ready" }] });
});

resources.forEach((resource) => {
  app.get(`/api/${resource}`, (req, res) => res.json(readData()[resource]));
  app.post(`/api/${resource}`, (req, res) => {
    const data = readData();
    if (resource === "students") { const validationError = validateStudent(req.body, data.students); if (validationError) return res.status(400).json({ message: validationError }); }
    const item = { id: makeId(), ...req.body, createdAt: new Date().toISOString() };
    data[resource].push(item); writeData(data); res.status(201).json(item);
  });
  app.put(`/api/${resource}/:id`, (req, res) => {
    const data = readData(); const index = data[resource].findIndex((item) => item.id === req.params.id);
    if (index < 0) return res.status(404).json({ message: "Record not found." });
    if (resource === "students") { const validationError = validateStudent(req.body, data.students, req.params.id); if (validationError) return res.status(400).json({ message: validationError }); }
    data[resource][index] = { ...data[resource][index], ...req.body, id: req.params.id }; writeData(data); res.json(data[resource][index]);
  });
  app.delete(`/api/${resource}/:id`, (req, res) => {
    const data = readData(); const before = data[resource].length;
    data[resource] = data[resource].filter((item) => item.id !== req.params.id);
    if (data[resource].length === before) return res.status(404).json({ message: "Record not found." });
    writeData(data); res.status(204).end();
  });
});

app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: "Something went wrong on the server." }); });
app.listen(PORT, () => console.log(`StudentHub API running at http://localhost:${PORT}`));
