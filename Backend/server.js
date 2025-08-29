require("dotenv").config();
const express = require("express");
const connectDB = require("./db/config");
const loadModels = require("./models"); // auto-register models

const app = express();

// Core middlewares
app.use(express.json());

// DB + models
connectDB();
loadModels();

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/careers", require("./routes/career.routes"));
app.use("/api/clients", require("./routes/client.routes"));
app.use("/api/csr", require("./routes/csr.routes"));
app.use("/api/news-events", require("./routes/newsEvents.routes"));


app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
