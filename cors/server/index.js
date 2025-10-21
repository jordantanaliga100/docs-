const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json()); // Needed for parsing JSON bodies

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Running in dockerRRR... YES IT IS 🔥 " });
});

// POST endpoint
app.post("/data", (req, res) => {
  console.log("POST received:", req.body);
  res.json({ ok: true, received: req.body });
});

// DELETE endpoint
app.delete("/data/:id", (req, res) => {
  console.log("DELETE received for ID:", req.params.id);
  res.json({ ok: true, deletedId: req.params.id });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Upstream server running on http://localhost:5000");
});
