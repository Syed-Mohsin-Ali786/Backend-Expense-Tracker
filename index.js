import express from "express";
import cors from "cors";
import helmet from "helmet";
import "@dotenvx/dotenvx";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || "3000";
const url = process.env.MONGODB_URL || "INVALID";

await mongoose
  .connect(url)
  .then(() => console.log("connected to MDb"))
  .catch((err) => console.log(err));

app.use('/auth',)


app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
