import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import sequelize from "./config/sequelize.js";

// Routes
import openaiRoutes from "./routes/openai.route.js";
import testRoutes from "./routes/tests.route.js";
import profileRoutes from "./routes/profile.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import planRoutes from "./routes/plan.route.js";
import promptRoutes from "./routes/userPrompt.route.js";
import userMealProgressRoutes from "./routes/userMealProgress.route.js";
import openAIResponseRoutes from "./routes/openAIResponse.route.js";
import userMealPlanRoutes from "./routes/userMealPlan.route.js";
import userDailyMealAndIntakeRoutes from "./routes/userDailyMealAndIntake.route.js";

const app = express();

// Global middlewares
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET)); // to sign cookies

// Sync database (development mode)
// await sequelize.sync({ alter: true }); //uncomment only when changes are needed in DB

// Routes
app.use("/api/openai", openaiRoutes);
app.use("/api/test", testRoutes);
app.use("/api", profileRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", planRoutes);
app.use("/api", promptRoutes);
app.use("/api", userMealProgressRoutes);
app.use("/api", openAIResponseRoutes);
app.use("/api", userMealPlanRoutes);
app.use("/api", userDailyMealAndIntakeRoutes);

// Global error middleware
app.use((err, req, res, next) => {
  console.error("Unexpected error: ", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}\n`);
});

export default app;