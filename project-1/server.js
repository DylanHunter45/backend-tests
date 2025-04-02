const express = require("express");
const app = express();

const PORT = 8383;

const data = {
  name: "Dylan",
  age: 24,
};

// Middleware to parse JSON bodies
app.use(express.json());

// HTTP endpoints
app.get("/", (req, res) => {
  res.send(`
    <body>
        <p>${JSON.stringify(data)}</p>
    </body>
    `);
});

// Example endpoint to return JSON data
app.get("/api/data", (req, res) => {
  res.json(data);
});

app.post("/api/data", (req, res) => {
  // Simulate saving data
  const newData = req.body;
  console.log("Received data:", newData);
  res.status(201).json({ message: "Data saved successfully!", data: newData });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
