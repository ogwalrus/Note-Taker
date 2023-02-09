const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// SERVER
const PORT = process.env.PORT || 3001;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// LISTENER
app.listen(PORT, () => {
console.log(`App listening at http://localhost:${PORT} 🚀`);
});