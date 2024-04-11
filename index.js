const express = require("express");
process.loadEnvFile();
const port = process.env.PORT || 5000;
const tasksRoutes = require("./routes/taskRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const { errorMiddleWare } = require("./middleware/errorMiddleware.js");
const connectDB = require("./connect/database.js");
const cors = require("cors");

const app = express(); 
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", tasksRoutes);
app.use("/api/user", userRoutes);
app.use(errorMiddleWare);

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
