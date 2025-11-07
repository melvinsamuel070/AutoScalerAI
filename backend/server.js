// const express = require("express");
// const mongoose = require("mongoose");
// const { register, trackMetrics } = require("./prometheus-metrics");
// require("dotenv").config(); // Load environment variables from .env

// const app = express();
// app.use(express.json());
// app.use(trackMetrics);

// // --- MongoDB Connection ---
// const MONGO_URL = process.env.MONGO_URL;
// if (!MONGO_URL) {
//   console.error("❌ MONGO_URL is not defined in .env. Exiting...");
//   process.exit(1); // Stop server if secret is missing
// }

// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 10000, // Timeout for slow DNS resolution
//   })
//   .then(() => console.log("✅ Connected to MongoDB Atlas"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // --- PORT ---
// const port = process.env.PORT || 3500;

// // --- Schema + Model ---
// const Task = mongoose.model(
//   "Task",
//   new mongoose.Schema({
//     name: { type: String, required: true },
//     done: { type: Boolean, default: false },
//   })
// );

// // --- Routes ---
// app.get("/", (req, res) => {
//   res.send("🚀 AutoScaler.AI Backend Running Successfully!");
// });

// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/tasks", async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // --- Prometheus Metrics ---
// app.get("/metrics", async (req, res) => {
//   res.set("Content-Type", register.contentType);
//   res.end(await register.metrics());
// });

// // --- Start Server ---
// app.listen(port, () => {
//   console.log(`✅ Backend running on port ${port}`);
// });














const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Add CORS
const { register, trackMetrics } = require("./prometheus-metrics");
require("dotenv").config(); // Load environment variables

const app = express();

// --- Middleware ---
app.use(cors({ origin: "*" })); // ✅ Allow requests from your frontend
app.use(express.json());
app.use(trackMetrics);

// --- MongoDB Connection ---
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error("❌ MONGO_URL is not defined in .env. Exiting...");
  process.exit(1);
}

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- PORT ---
const port = process.env.PORT || 3500;

// --- Schema + Model ---
const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, default: false },
  })
);

// --- Routes ---
app.get("/", (req, res) => {
  res.send("🚀 AutoScaler.AI Backend Running Successfully!");
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Prometheus Metrics ---
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    console.error("❌ Metrics fetch failed:", err.message);
    res.status(500).send("Metrics unavailable");
  }
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`✅ Backend running on port ${port}`);
});
