require('dotenv').config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const connectDB = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json()); // Correctly call express.json()

app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
