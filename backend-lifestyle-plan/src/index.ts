import express from "express";
import cors from "cors";
import deepSeekRoutes from "./routes/deepSeek.route";




const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/deepseek", deepSeekRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} \n`);
});

export default app;

