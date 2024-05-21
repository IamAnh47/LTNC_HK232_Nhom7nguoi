import express from "express";
import { studyController } from "../controllers/index.js";

const studyRoute = express.Router();

studyRoute.get("/", studyController.getAllUser);
studyRoute.post("/", studyController.createStudy);
studyRoute.post("/mask", studyController.updateScores);

studyRoute.get("/:id", studyController.getOneUser);
studyRoute.put("/:id", studyController.updateUser);

export default studyRoute;
