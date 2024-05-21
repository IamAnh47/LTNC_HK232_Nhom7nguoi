import express from "express";
import { courseController } from "../controllers/index.js";

const courseRoute = express.Router();

courseRoute.get("/", courseController.getAllCourse);
courseRoute.post("/", courseController.createCourse);

courseRoute.get("/:id", courseController.getDetail);

export default courseRoute;
