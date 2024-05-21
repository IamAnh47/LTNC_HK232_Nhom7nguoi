import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      default: "",
    },
    credits: {
      type: Number,
      required: true,
      default: 0,
    },
    group: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    lesson: {
      type: String,
      required: true,
    },
    hours: {
      type: String,
      required: true,
    },
    numberRoom: {
      type: String,
      require: true,
    },
    basic: {
      type: String,
      require: true,
    },
    weeks: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const SubjectModel = mongoose.model("Subject", SubjectSchema);
export default SubjectModel;
