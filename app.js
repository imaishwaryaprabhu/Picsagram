const postsRoutes = require("./backend/routes/posts");
const userRoutes = require("./backend/routes/users");

const mongoose = require("mongoose");
const express = require("express");

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/picsagram', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongodb database!"))
    .catch((err) => console.log("Failed to connect to mongodb databse", err));

app.use(express.json({ limit: '50mb', extended: false }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/images/posts", express.static(__dirname + "/backend/images/posts"));
app.use("/api/posts", postsRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
