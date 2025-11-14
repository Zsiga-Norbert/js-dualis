import express from "express";
import * as entryController from "../controllers/entryController.js";
import { auth } from "../controllers/userController.js";

const entryRouter = express.Router();

entryRouter.get("/entries/:userId", auth, entryController.getEntriesByUserId);
entryRouter.get("/entry/:id",auth, entryController.getEntryById);
entryRouter.post("/entry/:userId",auth, entryController.saveEntry);
entryRouter.patch("/entry/:id",auth, entryController.patchEntry);
entryRouter.delete("/entry/:id",auth, entryController.deleteEntry);

export default entryRouter;