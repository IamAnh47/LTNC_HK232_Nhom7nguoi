import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    list: {
      type: String,
      default: false,
    },
    content: {
      type: String,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: false,
    },
    linkVideo: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", CourseSchema);
export default CourseModel;
