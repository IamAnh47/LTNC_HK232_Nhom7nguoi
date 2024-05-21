// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoGQjpXJgWAmJAbrONBUJcR04s6ePoheo",
  authDomain: "database-8cc6c.firebaseapp.com",
  databaseURL: "https://database-8cc6c-default-rtdb.firebaseio.com",
  projectId: "database-8cc6c",
  storageBucket: "database-8cc6c.appspot.com",
  messagingSenderId: "836560995551",
  appId: "1:836560995551:web:a7e3e5d39386cc2a92956a",
  measurementId: "G-8P23C7RX1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);




function getCourseDetails(studentId, courseCode) {
  const dbRef = ref(db);
  return get(child(dbRef, `Student/${studentId}/Course/${courseCode}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("Course not found");
    }
  }).catch((error) => {
    console.error("Error fetching course details:", error);
    throw error;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  window.displaySubject = function (subjectId) {

    const mainContent = document.getElementById('main_content');
    let courseCode;

    switch (subjectId) {
      case 'subject1':
        courseCode = "CO2003";
        break;
      case 'subject2':
        courseCode = "CO2007";
        break;
      case 'subject3':
        courseCode = "CO2011";
        break;
      case 'subject4':
        courseCode = "SP1009";
        break;
      default:
        mainContent.innerHTML = `<p>Error: Subject not found</p>`;
        return false;
    }

    getCourseDetails("123", courseCode).then((course) => {
      let chaptersHtml = '';
      for (const [chapterName, chapterDetails] of Object.entries(course.Content)) {
        chaptersHtml += `
          <ul id="chapter_name"><b>${chapterName}: ${chapterDetails.Context}</b>
          <div  id="chapter_content">${chapterDetails.Content}</div>
          <div id="chapter_document"><a href="${chapterDetails.Document}" target="_blank">Document for ${chapterName}</a></div>
          </ul>
        `;
      }
      mainContent.innerHTML = `
        <div id="subject_name">${course.Name}</div>
        <div id="subject_option">
          <div id="subject_teacher"><b>Teacher:</b> ${course.Teacher}</div>
        </div>
        <div id="chapters">${chaptersHtml}</div>
      `;
    }).catch((error) => {
      mainContent.innerHTML = `<p>Error: ${error.message}</p>`;
    });

    toggleSidebar();
  };

  window.toggleSidebar = function () {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const toggleButton = document.getElementById('toggleButton');
    sidebar.classList.toggle('active');
    content.classList.toggle('margin-left');
    toggleButton.classList.toggle('hidden');
  };


});

function displayTestDates(studentId) {
  const testDateRef = ref(db, `Student/${studentId}/Course`);

  get(testDateRef)
    .then((snapshot) => {
      const courses = snapshot.val();
      const deadline = document.getElementById('rp_deadline-content');

      if (courses && deadline) {
        let testDateHtml = '';
        for (const courseId in courses) {
          const course = courses[courseId];
          if (course.TestDate) {
            testDateHtml += `<div style="border: 1px solid purple;padding:16px;border-radius:15px;" id="testdate"><b>${course.Name}:</b> ${course.TestDate}</div>`;

          }
        }
        deadline.innerHTML = testDateHtml;
      } else {
        // Handle the case where no test dates are found
        deadline.innerHTML = '<div>No test dates found.</div>';
      }
    })
    .catch((error) => {
      console.error('Error fetching test dates:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  displayTestDates("123");
});



function getUserInfo(studentId) {
  const dbRef = ref(db, `Student/${studentId}/Info/`);
  return get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw new Error("User not found");
      }
    })

}

document.addEventListener('DOMContentLoaded', () => {
  window.displayInfo = function () {
    const infoStudentId = document.getElementById("infoStudentId");
    const infoName = document.getElementById("infoName");
    const infoBirth = document.getElementById("infoBirth");
    const infoGender = document.getElementById("infoGender");
    const infoFaculty = document.getElementById("infoFaculty");
    const infoClass = document.getElementById("infoClass");
    const infoCountry = document.getElementById("infoCountry");
    getUserInfo("123").then((info) => {
      infoStudentId.innerHTML = `<b>Student Id:</b> ${info.studentId}`;
      infoName.innerHTML = `<b>Name:</b> ${info.Name}`;
      infoBirth.innerHTML = `<b>Date of Birth:</b> ${info.Birth}`;
      infoGender.innerHTML = `<b>Gender:</b> ${info.Gender}`;
      infoFaculty.innerHTML = `<b>Faculty:</b> ${info.Faculty}`;
      infoClass.innerHTML = `<b>Class:</b> ${info.Class}`;
      infoCountry.innerHTML = `<b>Countryside:</b> ${info.Country}`;
    })
  }
  displayInfo();
});

function redirectToSubjectPage(subjectId) {
  window.location.href = `subject.html?subject=${subjectId}`;
}
document.addEventListener('DOMContentLoaded', () => {
  const subjectLinks = document.querySelectorAll('.main_course-item-title');

  subjectLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a
      const subjectId = this.getAttribute('data-subject-id');
      redirectToSubjectPage(subjectId);
    });
  });
});



// Assuming you have the 'displayGrades' function from the previous response

function displayStudentInfo(data) {
  const studentId = Object.keys(data)[0];
  const studentData = data[studentId];
  const info = studentData.Info;

  document.getElementById('student-id').textContent = info.studentId;
  document.getElementById('student-name').textContent = info.Name;
  document.getElementById('student-class').textContent = info.Class;
  document.getElementById('student-faculty').textContent = info.Faculty;
  document.getElementById('student-gender').textContent = info.Gender;
  document.getElementById('student-birthdate').textContent = info.Birth;
}



const courseRef = ref(db, 'Student/123/Course/');

// Lấy dữ liệu từ Firebase và hiển thị trên bảng HTML
courseRef.on('value', (snapshot) => {
  const gradeTableBody = document.getElementById('gradeTableBody');
  gradeTableBody.innerHTML = ''; // Xóa nội dung cũ
  snapshot.forEach((childSnapshot) => {
    const courseData = childSnapshot.val();
    const courseName = courseData.Name;
    const grade = courseData.Grade;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${courseName}</td>
      <td>${grade}</td>
    `;
    gradeTableBody.appendChild(newRow);
  });
});