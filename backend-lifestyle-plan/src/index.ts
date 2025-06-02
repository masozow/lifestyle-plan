import express from "express";
import cors from "cors";
import openaiRoutes from "./routes/openai.route.js";
import testRoutes from "./routes/tests.route.js";
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/openai", openaiRoutes);
app.use("/api/test",testRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} \n`);
});

export default app;