import { SubjectModel } from "../models/index.js";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utills/errorHandle.js";

export const getAllSubject = catchAsyncError(async (_req, res, _next) => {
  const subjects = await SubjectModel.find({});

  res.status(200).json({
    subjects,
    success: true,
    message: "get all subject successfully",
  });
});

export const createSubject = catchAsyncError(async (req, res, _next) => {
  const {
    name,
    code,
    credits,
    group,
    day,
    lesson,
    hours,
    numberRoom,
    basic,
    weeks,
  } = req.body;

  const subjectId = await SubjectModel.findOne({ code: code });
  if (subjectId) {
    return _next(new ErrorHandler("code exist", 402));
  }
  const user = await SubjectModel.create({
    name,
    code,
    credits,
    group,
    day,
    lesson,
    hours,
    numberRoom,
    basic,
    weeks,
  });

  res.status(200).json({
    success: true,
    user,
    message: "create success",
  });
});

export const getDetail = catchAsyncError(async (req, res, next) => {
  const subject = await SubjectModel.findById(req.params.id);
  if (!subject) {
    return next(new ErrorHandler("subject not found or not logged in", 404));
  }

  res.status(200).json({
    success: true,
    subject,
    message: "get subject details successfully completed",
  });
});
export const updateUser = catchAsyncError(async (req, res, next) => {
  const {
    name,
    code,
    credits,
    group,
    day,
    lesson,
    hours,
    numberRoom,
    basic,
    weeks,
  } = req.body;
  const updatedSubjectData = {
    name,
    code,
    credits,
    group,
    day,
    lesson,
    hours,
    numberRoom,
    basic,
    weeks,
  };

  const user = await SubjectModel.findByIdAndUpdate(
    req.user.id,
    updatedSubjectData,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    user,
  });
});
export const updateUserStatus = catchAsyncError(async (req, res, next) => {
  const user = await SubjectModel.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("Not found", 404));
  }

  user.status = !user.status; // change status

  await user.save();

  res.status(200).json({
    user,
    success: true,
  });
});

export const updateScores = catchAsyncError(async (req, res, next) => {
  const { scores } = req.body;

  let evaluate;
  if (scores < 5) {
    evaluate = true;
  } else {
    evaluate = false;
  }

  const updatedUserData = {
    scores,
    evaluate,
  };

  const user = await SubjectModel.findByIdAndUpdate(
    req.user.id,
    updatedUserData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});
