import express from "express";
import userRoutes from "./routes/usersRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

const port = 3000;
const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

app.listen(port, () => {
  console.log(`Server runs on port http://localhost:${port}`);
});
