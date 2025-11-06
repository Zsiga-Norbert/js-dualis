import express from "express";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/user/:id", userController.getUserById);
userRouter.get("/user/:email", userController.getUserByEmail);
userRouter.post("/user", userController.saveUser);
userRouter.patch("/user/:id", userController.patchUser);
userRouter.delete("/user/:id", userController.deleteUser);

export default userRouter;
