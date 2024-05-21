import mongoose from "mongoose";

const studySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    firstname: {
      type: String,
      require: false,
      default: "",
    },
    birthdate: {
      type: String,
      require: false,
      default: "",
    },
    degree: {
      type: String,
      require: false,
      default: "",
    },
    code: {
      type: String,
      require: true,
    },
    sex: {
      type: String,
      require: true,
    },
    specialization: {
      type: String,
      require: false,
    },
    hometown: {
      type: String,
      require: false,
      default: "",
    },
    department: {
      type: String,
      require: false,
      default: "",
    },
    avatarUrl: {
      type: String,
      require: false,
      default: "",
    },
    scores: {
      type: Number,
      default: 0,
    },
    evaluate: {
      type: String,
      require: true,
      default: "true",
    },
  },
  { timestamps: true }
);

const StudyModel = mongoose.model("Study", studySchema);

export default StudyModel;
