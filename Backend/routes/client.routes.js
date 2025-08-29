// routes/client.routes.js
const express = require("express");
const router = express.Router();
const Client = require("../models/Clients");
const { verifyToken, requireAdmin } = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json({ message: "Client query submitted successfully", client: newClient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/",verifyToken, requireAdmin, async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
