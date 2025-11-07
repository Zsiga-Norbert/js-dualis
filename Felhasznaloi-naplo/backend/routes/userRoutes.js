import express from "express";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/user", userController.saveUser);
userRouter.post("/user/login", userController.login);
userRouter.patch("/user/:id", userController.patchUser);
userRouter.delete("/user/:id", userController.deleteUser);

export default userRouter;
