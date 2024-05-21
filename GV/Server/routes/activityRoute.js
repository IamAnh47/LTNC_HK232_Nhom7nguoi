import express from "express";
import { activityController } from "../controllers/index.js";

const activityRoute = express.Router();

activityRoute.get("/", activityController.getAllActivity);
activityRoute.post("/", activityController.createActivity);

activityRoute.get("/:id", activityController.getDetail);

export default activityRoute;
