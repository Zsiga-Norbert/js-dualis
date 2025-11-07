import express from "express";
import * as entryController from "../controllers/entryController.js";

const entryRouter = express.Router();

entryRouter.get("/entries/:userId", entryController.getEntriesByUserId);
entryRouter.get("/entry/:id", entryController.getEntryById);
entryRouter.post("/entry", entryController.saveEntry);
entryRouter.patch("/entry/:id", entryController.patchEntry);
entryRouter.delete("/entry/:id", entryController.deleteEntry);

export default entryRouter;