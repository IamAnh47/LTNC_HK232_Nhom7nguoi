import { ActivityModel } from "../models/index.js";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utills/errorHandle.js";

export const getAllActivity = catchAsyncError(async (_req, res, _next) => {
  const activities = await ActivityModel.find({});

  res.status(200).json({
    activities,
    success: true,
    message: "get all Activity successfully",
  });
});

export const createActivity = catchAsyncError(async (req, res, _next) => {
  const { name, code, desc } = req.body;

  const activityId = await ActivityModel.findOne({ code: code });
  if (activityId) {
    return _next(new ErrorHandler("code exist", 402));
  }
  const activity = await ActivityModel.create({
    name,
    code,
    desc,
  });

  res.status(200).json({
    success: true,
    activity,
    message: "create success",
  });
});

export const getDetail = catchAsyncError(async (req, res, next) => {
  const activity = await ActivityModel.findById(req.params.id);
  if (!activity) {
    return next(new ErrorHandler("Activity not found or not logged in", 404));
  }

  res.status(200).json({
    success: true,
    activity,
    message: "get Activity details successfully completed",
  });
});
export const updateActivity = catchAsyncError(async (req, res, next) => {
  const { name, code, desc } = req.body;
  const updatedActivityData = {
    name,
    code,
    desc,
  };

  const activity = await ActivityModel.findByIdAndUpdate(
    req.params.id,
    updatedActivityData,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    activity,
  });
});
