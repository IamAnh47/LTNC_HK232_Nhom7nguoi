$(document).ready(function () {
  $("#inline-picker").simpleCalendar({
    fixedStartDay: false,
    selectCallback: function (date) {
      console.log("date selected = " + date);
    },
  });

  $("#rp_button-collapse").click((e) => {
    if (!$("#right-panel-container").hasClass("hide")) {
      $("#right-panel-container").addClass("hide");
    } else $("#right-panel-container").removeClass("hide");
  });
});
function truncateString(str) {
  if (str.length <= 20) {
    return str;
  }
  return str.slice(0, 20) + "...";
}
async function fetchAllCourses() {
  try {
    const response = await fetch("http://localhost:4000/api/v1/course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const courseContainer = document.getElementById("my-course-api");
    data.courses.forEach((course) => {
      const courseItem = document.createElement("div");
      courseItem.className = "col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3";

      courseItem.innerHTML = `
            <div class="main_course-item bg-white border" onclick="showModalDetailCourse('${course._id
        }')">
              <div class="main_course-cover">
                <img src="${course.image
          ? course.image
          : "https://www.ntuclearninghub.com/documents/51786/4216795/Python-Symbol.png/369e410e-a90f-f887-c2dc-61f7ef761476?t=1679043970578"
        }" alt="${course.name}" width="100%" />
              </div>
              <div class="main_course-item-title text-justify p-2">
                ${course.name}
              </div>
              <div class="main_course-item-code text-center">${truncateString(
          course.desc
        )}</div>
            </div>
          `;

      courseContainer.appendChild(courseItem);
    });
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
fetchAllCourses();

async function fetchAllActivity() {
  try {
    const response = await fetch("http://localhost:4000/api/v1/activity", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const activityContainer = document.getElementById("my-activity-api");
    data.activities.forEach((activity) => {
      const activityItem = document.createElement("div");
      activityItem.className = "col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4";

      activityItem.innerHTML = `
      <div class="main_course-item bg-white border" onclick="showModalDetailActivity('${activity._id}')">
        <div class="main_course-cover">
          <img src="./assets/img/Pensive-robot-feat.jpg" alt="" srcset="" width="100%" />
        </div>
        <div class="main_course-item-title text-justify p-2">
          ${activity.name}
        </div>
        <div class="main_course-item-code text-center">${activity.code}</div>
      </div>
          `;

      activityContainer.appendChild(activityItem);
    });
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
fetchAllActivity();

async function fetchAllStudents() {
  try {
    const response = await fetch("http://localhost:4000/api/v1/study", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const studentContainer = document.getElementById("table-student-api");
    studentContainer.innerHTML = "";
    data.users.forEach((student, index) => {
      const studentItem = document.createElement("tr");

      studentItem.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${student.username}</td>
                <td>${student.code}</td>
                <td>${student.sex}</td>
                <td>${student.scores == 0 ? '_' : student.scores}</td>
                <td>${student.evaluate == "false" ? "Đạt" : "Không Đạt"}</td>
          `;

      studentContainer.appendChild(studentItem);
    });
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
fetchAllStudents();

async function importExcelStudent() {
  const input = document.getElementById("inputGroupFile04");
  const file = input.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("excel", file);

  try {
    const response = await fetch("http://localhost:4000/study/import-excel", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    alert("File imported successfully");
    fetchAllStudents();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function exportExcelStudent() {
  try {
    const response = await fetch("http://localhost:4000/study/export-excel", {
      method: "GET",
      credentials: "include",
      timeout: 60000, // Timeout in milliseconds (adjust as needed)
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let filename = "data_students.xlsx";
    const contentDisposition = response.headers.get("Content-Disposition");
    if (contentDisposition) {
      filename = contentDisposition.split("filename=")[1] || filename;
    }

    // Create a blob from the response
    const blob = await response.blob();

    // Create a temporary link and click it to trigger the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
async function fetchInfoStudent(id) {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/study/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    document
      .querySelector(".handlechangeinfo")
      .addEventListener("click", async () => {
        await updateUser(data.user._id);
      });
    const getSafeData = (value) => (value ? value : "");

    document.getElementById("fullname").value = getSafeData(data.user.username);
    document.getElementById("firstname").value = getSafeData(
      data.user.firstname
    );
    document.getElementById("birthdate").value = getSafeData(
      data.user.birthdate
    );
    document.getElementById("gender").value = getSafeData(data.user.sex);
    document.getElementById("degree").value = getSafeData(data.user.degree);
    document.getElementById("specialization").value = getSafeData(
      data.user.specialization
    );
    document.getElementById("department").value = getSafeData(
      data.user.department
    );
    document.getElementById("hometown").value = getSafeData(data.user.hometown);
    document.getElementById("avatar").src =
      getSafeData(data.user.avatarUrl) || "./assets/img/tuan-anh.jpg";
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

const studentId = getQueryParam("id");
if (studentId) {
  fetchInfoStudent(studentId);
} else {
  console.error("No student ID found in query parameters");
}

async function importExcelSchedule() {
  const input = document.getElementById("inputGroupFile05");
  const file = input.files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("excel", file);

  try {
    const response = await fetch("http://localhost:4000/subject/import-excel", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    alert("File imported successfully");
    fetchAllschedules();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function fetchAllschedules() {
  try {
    const response = await fetch("http://localhost:4000/api/v1/subject", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const scheduleContainer = document.getElementById("table-schedule-api");
    scheduleContainer.innerHTML = "";
    data.subjects.forEach((subject, index) => {
      const scheduleItem = document.createElement("tr");
      scheduleItem.innerHTML = `
              <td>${subject.code}</td>
              <td>${subject.name}</td>
              <td>${subject.credits}</td>
              <td>${subject.group}</td>
              <td>${subject.credits}</td>
              <td>${subject.lesson}</td>
              <td>${subject.hours}</td>
              <td>${subject.numberRoom}</td>
              <td>${subject.basic}</td>
              <td>${subject.weeks}</td>
        `;

      scheduleContainer.appendChild(scheduleItem);
    });
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
fetchAllschedules();

async function exportExcelSchedule() {
  try {
    const response = await fetch("http://localhost:4000/subject/export-excel", {
      method: "GET",
      credentials: "include",
      timeout: 60000, // Timeout in milliseconds (adjust as needed)
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let filename = "data_subject.xlsx";
    const contentDisposition = response.headers.get("Content-Disposition");
    if (contentDisposition) {
      filename = contentDisposition.split("filename=")[1] || filename;
    }

    // Create a blob from the response
    const blob = await response.blob();

    // Create a temporary link and click it to trigger the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function showModalDetailCourse(courseId) {
  try {
    // Fetch data from API using courseId
    const response = await fetch(
      `http://localhost:4000/api/v1/course/${courseId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch course data");
    }
    const courseData = await response.json();
    // Update modal content with fetched data
    const modalTitle = document.getElementById("staticBackdropLabel");
    modalTitle.innerText = courseData.course.name; // Assuming title is available in courseData

    const modalBody = document.querySelector(".modal-body.modal-course");
    modalBody.innerHTML = `
      <p>${courseData.course.content}</p>
      <p>${courseData.course.desc}</p>
      <div style="font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      margin: 4px;
      border-radius:15px;">
      <a href="${courseData.course.linkBG}" target="_blank" style="text-decoration : none">Slides Bài Giảng</a>
      </div>
      <div style="font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      margin: 4px;
      border-radius:15px;">
      <a href="${courseData.course.linkVideo}" target="_blank" style="text-decoration : none">Link to Video</a>
      </div>
    `;

    // Show the modal
    const modal = new bootstrap.Modal(
      document.getElementById("staticBackdrop")
    );
    modal.show();
  } catch (error) {
    console.error("Error fetching course data:", error);
    // Handle error appropriately, e.g., show an error message to the user
  }
}

async function showModalDetailActivity(activityId) {
  try {
    // Fetch data from API using activityId
    const response = await fetch(
      `http://localhost:4000/api/v1/activity/${activityId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch activity data");
    }
    const activityData = await response.json();
    // Update modal content with fetched data
    const modalTitle = document.getElementById("staticBackdropLabel2");
    modalTitle.innerText = activityData.activity.name; // Assuming title is available in activityData

    const modalBody = document.querySelector(".modal-body.modal-activity");
    modalBody.innerHTML = `
      <p>${activityData.activity.desc}</p>
    `;

    // Show the modal
    const modal = new bootstrap.Modal(
      document.getElementById("staticBackdrop2")
    );
    modal.show();
  } catch (error) {
    console.error("Error fetching course data:", error);
    // Handle error appropriately, e.g., show an error message to the user
  }
}

async function updateUser(id) {
  try {
    const username = document.getElementById("fullname").value;
    const firstname = document.getElementById("firstname").value;
    const sex = document.getElementById("gender").value;
    const degree = document.getElementById("degree").value;
    const birthdate = document.getElementById("birthdate").value;

    const specialization = document.getElementById("specialization").value;
    const department = document.getElementById("department").value;
    const hometown = document.getElementById("hometown").value;

    const updatedUserData = {
      username,
      firstname,
      sex,
      degree,
      specialization,
      department,
      hometown,
      birthdate,
    };

    const response = await fetch(`http://localhost:4000/api/v1/study/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    const result = await response.json();
  } catch (error) {
    console.error("Error updating user data:", error);
    // Handle error appropriately, e.g., show an error message to the user
  }
}
function closeModal() {
  const modal = new bootstrap.Modal(document.getElementById("staticBackdrop3"));
  modal.hide();
}
async function addStudent() {
  try {
    const username = document.getElementById("fullname").value;
    const sex = document.getElementById("gender").value;
    const code = document.getElementById("mssv").value;

    const updatedUserData = {
      username,
      sex,
      code,
    };

    const response = await fetch(`http://localhost:4000/api/v1/study`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    const result = await response.json();
    closeModal();
    fetchAllStudents();
  } catch (error) {
    console.error("Error updating user data:", error);
    // Handle error appropriately, e.g., show an error message to the user
  }
}
function closeModalUpdateMask() {
  const modal = new bootstrap.Modal(document.getElementById("staticBackdrop4"));
  modal.hide();
}
async function updateScores() {
  try {
    const scores = document.getElementById("masku").value.trim();
    const code = document.getElementById("mssvu").value.trim();

    const updatedUserData = {
      scores,
      code,
    };

    const response = await fetch(`http://localhost:4000/api/v1/study/mask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    const result = await response.json();
    closeModalUpdateMask();
    fetchAllStudents();
  } catch (error) {
    console.error("Error updating user data:", error);
    // Handle error appropriately, e.g., show an error message to the user
  }
}

async function searchCourses() {
  try {
    const searchValue = document.getElementById("fieldSearch").value.trim(); // Lấy giá trị từ ô tìm kiếm
    const response = await fetch("http://localhost:4000/api/v1/course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const filteredCourses = data.courses.filter((course) => {
      // Lọc khóa học dựa trên tên
      return course.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    // Xóa danh sách khóa học hiện có
    const courseContainer = document.getElementById("my-course-api");
    courseContainer.innerHTML = "";

    // Hiển thị danh sách khóa học đã lọc
    filteredCourses.forEach((course) => {
      const courseItem = document.createElement("div");
      courseItem.className = "col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3";

      courseItem.innerHTML = `
            <div class="main_course-item bg-white border" onclick="showModalDetailCourse('${course._id
        }')">
              <div class="main_course-cover">
                <img src="${course.image
          ? course.image
          : "https://www.ntuclearninghub.com/documents/51786/4216795/Python-Symbol.png/369e410e-a90f-f887-c2dc-61f7ef761476?t=1679043970578"
        }" alt="${course.name}" width="100%" />
              </div>
              <div class="main_course-item-title text-justify p-2">
                ${course.name}
              </div>
              <div class="main_course-item-code text-center">${truncateString(
          course.desc
        )}</div>
            </div>
          `;

      courseContainer.appendChild(courseItem);
    });
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
