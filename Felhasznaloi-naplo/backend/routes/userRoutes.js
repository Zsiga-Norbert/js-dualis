import express from "express";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/user", userController.saveUser);
userRouter.post("/user/login", userController.login);
userRouter.get("/user/:userId",userController.auth,userController.getUserById)
userRouter.patch("/user/:userId",userController.auth, userController.patchUser);
userRouter.delete("/user/:userId",userController.auth, userController.deleteUser);

export default userRouter;
