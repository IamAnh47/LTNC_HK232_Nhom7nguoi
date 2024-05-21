import express from "express";
import { subjectController } from "../controllers/index.js";

const subjectRoute = express.Router();

subjectRoute.get("/", subjectController.getAllSubject);
subjectRoute.post("/", subjectController.createSubject);

subjectRoute.get("/:id", subjectController.getDetail);

export default subjectRoute;
