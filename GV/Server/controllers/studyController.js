import { StudyModel } from "../models/index.js";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utills/errorHandle.js";
// import multer from "multer";
import fs from "fs";
import fileUpload from "express-fileupload";
import XLSX from "xlsx";

const uploadOpts = {
  useTempFiles: true,
  tempFileDir: "/tmp/",
};

export const getAllUser = catchAsyncError(async (_req, res, _next) => {
  const users = await StudyModel.find({});

  res.status(200).json({
    users,
    success: true,
    message: "get all users successfully",
  });
});
export const getOneUser = catchAsyncError(async (req, res, _next) => {
  const user = await StudyModel.findById(req.params.id);

  if (!user) {
    return _next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    user,
    message: "get user successfully",
    success: true,
  });
});
export const createStudy = catchAsyncError(async (req, res, _next) => {
  const {
    username,
    code,
    sex,
  } = req.body;

  const userId = await StudyModel.findOne({ code: code });
  if (userId) {
    return _next(new ErrorHandler("code exist", 402));
  }
  const user = await StudyModel.create({
    username,
    code,
    sex,
  });

  res.status(200).json({
    success: true,
    user,
    message: "create success",
  });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await StudyModel.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found or not logged in", 404));
  }

  res.status(200).json({
    success: true,
    user,
    message: "get user details successfully completed",
  });
});
export const updateUser = catchAsyncError(async (req, res, next) => {
  const {
    username,
    firstname,
    sex,
    degree,
    specialization,
    birthdate,
    department,
    hometown,
  } = req.body;
  const updatedUserData = {
    username,
    firstname,
    sex,
    degree,
    specialization,
    birthdate,
    department,
    hometown,
  };

  const user = await StudyModel.findByIdAndUpdate(
    req.params.id,
    updatedUserData,
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
  const user = await StudyModel.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("Not found", 404));
  }

  user.status = !user.status;
  await user.save();

  res.status(200).json({
    user,
    success: true,
  });
});


export const updateScores = catchAsyncError(async (req, res, next) => {
  const { code, scores } = req.body;

  let evaluate;
  if (parseFloat(scores) < 5) {
    evaluate = "true";
  } else {
    evaluate = "false";
  }

  const updatedUserData = {
    scores,
    evaluate,
  };

  const user = await StudyModel.findOneAndUpdate(
    { code: code },
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
