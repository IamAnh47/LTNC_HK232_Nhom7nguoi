import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const ActivityModel = mongoose.model("Activity", ActivitySchema);
export default ActivityModel;
