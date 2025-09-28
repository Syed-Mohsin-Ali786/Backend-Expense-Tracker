import express from "express";
import cors from "cors";
import helmet from "helmet";
import "@dotenvx/dotenvx";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"


const app = express();
app.use(express.json())
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || "3000";
const url = process.env.MONGODB_URL;

await mongoose
  .connect(url)
  .then(() => console.log("connected to MDb"))
  .catch((err) => console.log(err));

app.use("/api/auth",authRoutes)
app.use("/api/expenses",expenseRoutes)


app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
