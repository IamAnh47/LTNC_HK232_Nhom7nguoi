import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function getCourseDetails(studentId, courseCode) {
    const dbRef = ref(db);
    return get(child(dbRef, `Student/${studentId}/Course/${courseCode}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val(); // This returns the entire course object
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

        if (subjectId === 'subject1') {
            getCourseDetails("123", "CO2003").then((course) => {
                let chaptersHtml1 = '';
                for (const [chapterName, chapterDetails] of Object.entries(course.Content)) { 
                    chaptersHtml1 +=`
                        <ul id="chapter_name">${chapterName}: ${chapterDetails.Context}
                        <div id="chapter_content">${chapterDetails.Content}</div>
                        <div id="chapter_document"><a href="${chapterDetails.Document}" target="_blank">Document for ${chapterName}</a></div>
                        </ul>
                    `;
                }
                mainContent.innerHTML = `
                    <div id="subject_name">${course.Name}</div>
                    <div id="subject_option">
                        <div id="subject_teacher">Teacher: ${course.Teacher}</div>
                    </div>
                    <div id="chapters">
                        ${chaptersHtml1}
                    </div>
                `;
            }).catch((error) => {
                mainContent.innerHTML = `<p>Error: ${error.message}</p>`;
            });
        } else if (subjectId === 'subject2') {
            getCourseDetails("123", "CO2007").then((course) => {
                let chaptersHtml2 = '';
                for (const [chapterName, chapterDetails] of Object.entries(course.Content)) {
                    chaptersHtml2 += `
                        <ul id="chapter_name">${chapterName}: ${chapterDetails.Context}
                        <div id="chapter_content">${chapterDetails.Content}</div>
                        <div id="chapter_document"><a href="${chapterDetails.Document}" target="_blank">Document for ${chapterName}</a></div>
                        </ul>
                    `;
                }
                mainContent.innerHTML = `
                    <div id="subject_name">${course.Name}</div>
                    <div id="subject_option">
                        <div id="subject_teacher">Teacher: ${course.Teacher}</div>
                    </div>
                    <div id="chapters">
                        ${chaptersHtml2}
                    </div>
                `;
            }).catch((error) => {
                mainContent.innerHTML = `<p>Error: ${error.message}</p>`;
            });

        }
        else if (subjectId === 'subject3') {
            getCourseDetails("123", "CO2011").then((course) => {
                let chaptersHtml2 = '';
                for (const [chapterName, chapterDetails] of Object.entries(course.Content)) {
                    chaptersHtml2 += `
                        <ul id="chapter_name">${chapterName}: ${chapterDetails.Context}
                        <div id="chapter_content">${chapterDetails.Content}</div>
                        <div id="chapter_document"><a href="${chapterDetails.Document}" target="_blank">Document for ${chapterName}</a></div>
                        </ul>
                    `;
                }
                mainContent.innerHTML = `
                    <div id="subject_name">${course.Name}</div>
                    <div id="subject_option">
                        <div id="subject_teacher">Teacher: ${course.Teacher}</div>
                    </div>
                    <div id="chapters">
                        ${chaptersHtml2}
                    </div>
                `;
            }).catch((error) => {
                mainContent.innerHTML = `<p>Error: ${error.message}</p>`;
            });

        }
        else if (subjectId === 'subject4') {
            getCourseDetails("123", "SP1009").then((course) => {
                let chaptersHtml2 = '';
                for (const [chapterName, chapterDetails] of Object.entries(course.Content)) {
                    chaptersHtml2 += `
                        <ul id="chapter_name">${chapterName}: ${chapterDetails.Context}
                        <div id="chapter_content">${chapterDetails.Content}</div>
                        <div id="chapter_document"><a href="${chapterDetails.Document}" target="_blank">Document for ${chapterName}</a></div>
                        </ul>
                    `;
                }
                mainContent.innerHTML = `
                    <div id="subject_name">${course.Name}</div>
                    <div id="subject_option">
                        <div id="subject_teacher">Teacher: ${course.Teacher}</div>
                    </div>
                    <div id="chapters">
                        ${chaptersHtml2}
                    </div>
                `;
            }).catch((error) => {
                mainContent.innerHTML = `<p>Error: ${error.message}</p>`;
            });

        }

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
