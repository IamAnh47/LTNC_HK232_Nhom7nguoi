import { CourseModel } from "../models/index.js";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utills/errorHandle.js";

export const getAllCourse = catchAsyncError(async (_req, res, _next) => {
  const courses = await CourseModel.find({});

  res.status(200).json({
    courses,
    success: true,
    message: "get all Course successfully",
  });
});

export const createCourse = catchAsyncError(async (req, res, _next) => {
  const { name, desc, list, content, linkBG, image, linkVideo } = req.body;

  const courseId = await CourseModel.findOne({ name: name });
  if (courseId) {
    return _next(new ErrorHandler("code exist", 402));
  }
  const cousre = await CourseModel.create({
    name,
    linkVideo,
    desc,
    list,
    content,
    linkBG,
    image,
  });

  res.status(200).json({
    success: true,
    cousre,
    message: "create success",
  });
});

export const getDetail = catchAsyncError(async (req, res, next) => {
  const course = await CourseModel.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found or not logged in", 404));
  }

  res.status(200).json({
    success: true,
    course,
    message: "get Course details successfully completed",
  });
});
export const updateCourse = catchAsyncError(async (req, res, next) => {
  const { name, linkVideo, desc, linkBG, list, content, image } = req.body;
  const updatedCourseData = {
    name,
    linkVideo,
    desc,
    list,
    content,
    linkBG,
    image,
  };

  const course = await CourseModel.findByIdAndUpdate(
    req.params.id,
    updatedCourseData,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    course,
  });
});
