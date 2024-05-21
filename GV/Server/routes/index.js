import express from "express";
import studyRouter from "./studyRoute.js";
import subjectRouter from "./subjectRoute.js";
import courseRouter from "./courseRoute.js";
import activityRouter from "./activityRoute.js";

const router = express.Router();
router.use("/api/v1/study", studyRouter);
router.use("/api/v1/subject", subjectRouter);
router.use("/api/v1/activity", activityRouter);
router.use("/api/v1/course", courseRouter);

export default router;
