import "dotenv/config.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import routes from "./routes/index.js";
import fs from "fs";
import fileUpload from "express-fileupload";
import XLSX from "xlsx";
import StudyModel from "./models/study.js";
import SubjectModel from "./models/subject.js";
const uploadOpts = {
  useTempFiles: true,
  tempFileDir: "/tmp/",
};
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://localhost:3001"],
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

//Route
app.use(routes);
app.post("/study/import-excel", fileUpload(uploadOpts), async (req, res) => {
  try {
    const { excel } = req.files;
    if (
      excel.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      fs.unlinkSync(excel.tempFilePath);

      return res.status(400).json({ msg: "File is invalid !" });
    }
    const workbook = XLSX.readFile(excel.tempFilePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    let successData = [];
    let failureData = [];
    for (let i = 0; i < data.length; i++) {
      const { HOTEN, MSSV, GIOITINH, DIEM, DANHGIA } = data[i];

      const userId = await StudyModel.findOne({ code: MSSV });
      if (userId) {
        failureData.push({ ...data[i], error: "Code exists" });
        continue; // Skip to the next iteration
      }
      const user = await StudyModel.create({
        username: HOTEN,
        code: MSSV,
        sex: GIOITINH,
        scores: DIEM,
        evaluate: DANHGIA,
      });

      if (user) {
        successData.push(data[i]);
      } else {
        failureData.push(data[i]);
      }
    }
    fs.unlink(excel.tempFilePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
    return res.status(200).json({
      msg: "OK",
      data: { successData, failureData },
    });
  } catch (error) {
    res.status(500);
  }
});

app.post("/subject/import-excel", fileUpload(uploadOpts), async (req, res) => {
  try {
    const { excel } = req.files;
    if (
      excel.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      fs.unlinkSync(excel.tempFilePath);

      return res.status(400).json({ msg: "File is invalid !" });
    }
    const workbook = XLSX.readFile(excel.tempFilePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const successData = [];
    const failureData = [];
    for (let i = 0; i < data.length; i++) {
      const { MMH, TENMON, TINCHI, NHOM, THU, TIET, GIO, PHONG, COSO, TUAN } =
        data[i];

      const subjectId = await SubjectModel.findOne({ code: MMH });
      if (subjectId) {
        failureData.push({ ...data[i], error: "Code exists" });
        continue;
      }
      const subject = await SubjectModel.create({
        name: TENMON,
        code: MMH,
        credits: TINCHI,
        group: NHOM,
        day: THU,
        lesson: TIET,
        hours: GIO,
        numberRoom: PHONG,
        basic: COSO,
        weeks: TUAN,
      });

      if (subject) {
        successData.push(data[i]);
      } else {
        failureData.push(data[i]);
      }
    }
    fs.unlinkSync(excel.tempFilePath);
    return res.status(200).json({
      msg: "OK",
      data: { successData: successData, failureData: failureData },
    });
  } catch (error) {
    res.status(500);
  }
});

app.get("/study/export-excel", async (req, res) => {
  try {
    const studies = await StudyModel.find({});

    const data = studies.map((study, index) => ({
      STT: index + 1,
      HOTEN: study.username,
      MSSV: study.code,
      GIOITINH: study.sex,
      DIEM: study.scores,
      DANHGIA: study.evaluate == "true" ? "ĐẠT" : "KHÔNG ĐẠT",
    }));

    const heading = [["STT", "HOTEN", "MSSV", "GIOITINH", "DIEM", "DANHGIA"]];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(heading);

    XLSX.utils.sheet_add_json(worksheet, data, {
      origin: "A2",
      skipHeader: true,
    });
    const colWidths = heading[0].map((col, index) => {
      const maxLength = Math.max(
        col.length,
        ...data.map((row) => row[col.replace(/\s+/g, "")].toString().length)
      );
      return { wch: maxLength + 2 };
    });

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "books");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    res.attachment("data_students.xlsx");
    return res.send(buffer);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/subject/export-excel", async (req, res) => {
  try {
    const subjects = await SubjectModel.find({});

    // Chuyển đổi dữ liệu thành định dạng mong muốn
    const data = subjects.map((subject, index) => ({
      STT: index + 1,
      TENMON: subject.name,
      MMH: subject.code,
      TINCHI: subject.credits,
      NHOM: subject.group,
      THU: subject.day,
      TIET: subject.lesson,
      GIO: subject.hours,
      PHONG: subject.numberRoom,
      COSO: subject.basic,
      TUAN: subject.weeks,
    }));

    const heading = [
      [
        "STT",
        "TENMON",
        "MMH",
        "TINCHI",
        "NHOM",
        "THU",
        "TIET",
        "GIO",
        "PHONG",
        "COSO",
        "TUAN",
      ],
    ];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(heading);

    XLSX.utils.sheet_add_json(worksheet, data, {
      origin: "A2",
      skipHeader: true,
    });
    const colWidths = heading[0].map((col, index) => {
      const maxLength = Math.max(
        col.length,
        ...data.map((row) => row[col.replace(/\s+/g, "")].toString().length)
      );
      return { wch: maxLength + 2 }; // Thêm một khoảng đệm
    });

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "books");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    res.attachment("data_subject.xlsx");
    return res.send(buffer);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).send("Internal Server Error");
  }
});
// app.use(errorMiddleware);
//Connect
mongoose
  .connect(process.env.STRING_DB, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .then(() => {
    console.log("Database conection is ready.....!");
  })
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
