require("dotenv").config();
const express = require("express");
const cors = require("cors");
const movieRoutes = require('./routes/movie.routes');
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL; 

app.use(cors());
app.use(express.json());

app.use("/api", movieRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on ${BASE_URL}:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});