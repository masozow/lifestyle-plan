import express from "express";
import cors from "cors";
import deepSeekRoutes from "./routes/deepSeek.route.js";
import testRoutes from "./routes/tests.route.js";
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/deepseek", deepSeekRoutes);
app.use("/api/test",testRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} \n`);
});

export default app;