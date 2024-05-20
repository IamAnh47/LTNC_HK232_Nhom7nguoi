// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import { getAnalytics} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// import { close_modal } from "./admin.js"
import { convertToDateInput, close_modal } from "./function.js"
// import { toLoca} from "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { getStorage, ref as sRef, uploadBytes, getDownloadURL, uploadBytesResumable} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

import { getAuth, createUserWithEmailAndPassword, deleteUser} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// import {getFirestore, collection, doc, setDoc, getDoc, where, query, getDocs} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getDatabase, push, ref as ref, set, get, remove, query, orderByChild, equalTo, child, update} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// import * as admin from "../node_modules/firebase-admin";
// import { initializeApp } from "firebase-admin";
// import { getDatabase, ref, push } from 'firebase/database';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

    const firebaseConfig = {
        // apiKey: "AIzaSyBDhC8vduqSSDQexsZNH-VkJ1eM3SW8_No",
        // authDomain: "test-a9146.firebaseapp.com",
        // databaseURL: "https://test-a9146-default-rtdb.europe-west1.firebasedatabase.app",
        // projectId: "test-a9146",
        // storageBucket: "test-a9146.appspot.com",
        // messagingSenderId: "29510291407",
        // appId: "1:29510291407:web:cffe2493939a2b2840ccba"
        apiKey: "AIzaSyBnihNKFFQo2oqJBP_SsgmTHSyeUQetVN0",
        authDomain: "ltnc232-8301c.firebaseapp.com",
        databaseURL: "https://ltnc232-8301c-default-rtdb.firebaseio.com",
        projectId: "ltnc232-8301c",
        storageBucket: "ltnc232-8301c.appspot.com",
        messagingSenderId: "636222150811",
        appId: "1:636222150811:web:a41d6fc9e6c0cd35dd8e3e"
    };
    // const admin = require("./node_modules/firebase-admin");
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app);
    const storage = getStorage(app);
    // const db = getFirestore(app);
    // const usersRef = ref(database, "users");
    
    updateTableStudent();
    // updateTableStudent();
    document.querySelector('.edit_edit-info_std').addEventListener('click', async function() {
        let MSSV = document.querySelector('.edit_student_MSSV input').value;
        let lastname = document.querySelector('.edit_student_lastname input').value;
        let firstname = document.querySelector('.edit_student_firstname input').value;
        let sex = document.querySelector('.edit_student_sex input').value;
        var birth_pre = document.querySelector('.edit_student_birth input').value;
        var date = new Date(birth_pre);
        var dayB = date.getDate();
        var monthB = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        var yearB = date.getFullYear();
        var birth = (dayB < 10 ? '0' : '') + dayB + '/' + (monthB < 10 ? '0' : '') + monthB + '/' + yearB;
        let hometown = document.querySelector('.edit_student_hometown input').value;
        let address = document.querySelector('.edit_student_address input').value;
        let year = document.querySelector('.edit_student_year input').value;
        let department = document.querySelector('.edit_student_department input').value;
        let major = document.querySelector('.edit_student_major input').value;
        let class_std = document.querySelector('.edit_student_class input').value;
        let status = document.querySelector('.edit_student_status input').value;

        const userQuery = query(ref(database, "users/students"), orderByChild("MSSV"), equalTo(MSSV));
        const snapshot = await get(userQuery);
        if (snapshot.exists()) {
            alert("MSSV đã tồn tại trong hệ thống");
            document.querySelector('.edit_student_MSSV input').value = "";
            return;    
        } 

        const student = {
            MSSV: MSSV,
            lastname: lastname,
            firstname: firstname,
            sex: sex,
            birth: birth,
            hometown: hometown,
            address: address,
            year: year,
            department: department,
            major: major,
            class: class_std,
            status: status,
            score: "",
            TBTL: "",
            progress: "",
        };

        let email = `${MSSV}@hcmut.edu.vn`;
        let password = MSSV;

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let uid = userCredential.user.uid;
            set(ref(database, `users/students/${uid}`), student)
            .then(() => {
                console.log("Tài khoản đăng nhập đã được tạo cho sinh viên và gắn với thông tin mới.");
                console.log("Email:", email);
                console.log("Mật khẩu:", password);

                document.getElementById("edit_form_info_student").reset();
                alert("Thêm sinh viên thành công!");
                updateTableStudent();
            })
            .catch((error) => {
                alert("Lỗi khi gắn tài khoản đăng nhập với thông tin sinh viên:", error);
            });
        })
        .catch((error) => {
            alert("Lỗi khi tạo tài khoản đăng nhập:", error);
            document.getElementById("edit_form_info_student").reset();
        });
    });

    async function viewDetailsStd(key) {
        var modal = document.querySelector('.modal_student');
        modal.style.display = 'flex';
        // alert(key);
        const MSSV = document.getElementById('MSSV');
        const lastname = document.getElementById('lastname_std');
        const firstname = document.getElementById('firstname_std');
        const sex = document.getElementById('sex_std');
        const birth = document.getElementById('birth_std');
        const hometown = document.getElementById('hometown_std');
        const address = document.getElementById('address_std');
        const year = document.getElementById('year_std');
        const department = document.getElementById('department_std');
        const major = document.getElementById('major_std');
        const class_std = document.getElementById('class_std');
        const status = document.getElementById('status_std');
        const scores = document.getElementById('scores_std');
        const TBTL = document.getElementById('TBTL_std');
        const progress = document.getElementById('progress_std');
        
        // Đoạn mã để xem chi tiết sinh viên
        try {
            const snapshot = await get(child(ref(database, `users/students`), key));
            if (snapshot.exists()) {
                const studentData = snapshot.val();
                // alert(studentData.birth);
                MSSV.innerText = studentData.MSSV;
                lastname.innerText = studentData.lastname;
                firstname.innerText = studentData.firstname;
                sex.innerText = studentData.sex;
                birth.innerText = studentData.birth;
                hometown.innerText = studentData.hometown;
                address.innerText = studentData.address;
                year.innerText = studentData.year;
                department.innerText = studentData.department;
                major.innerText = studentData.major;
                class_std.innerText = studentData.class;
                status.innerText = studentData.status;
                scores.innerText = studentData.score;
                TBTL.innerText = studentData.TBTL;
                progress.innerText = studentData.progress;
            } else {
                console.log('Không có sinh viên trong cơ sở dữ liệu.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sinh viên:', error);
        }
    }
    document.querySelector('.modal_student .edit_a_student button').addEventListener('click', function() {
        var outside_form_info_std = document.querySelector('.outside-form-info_std');
        outside_form_info_std.style.display = 'flex';

        var MSSV_p = document.getElementById('MSSV');
        var lastname_std_p = document.getElementById('lastname_std');
        var firstname_std_p = document.getElementById('firstname_std');
        var sex_std_p = document.getElementById('sex_std');
        var hometown_std_p = document.getElementById('hometown_std');
        var address_std_p = document.getElementById('address_std');
        var year_std_p = document.getElementById('year_std');
        var department_std_p = document.getElementById('department_std');
        var major_std_p = document.getElementById('major_std');
        var class_std_p = document.getElementById('class_std');
        var status_std_p = document.getElementById('status_std');
        
        // Lấy các ô input
        const MSSV_input = document.getElementById("mssv");
        var lastname_std_input = document.querySelector('.background_margin5px.student_lastname input');
        var firstname_std_input = document.querySelector('.background_margin5px.student_firstname input');
        var sex_std_input = document.querySelector('.background_margin5px.student_sex input');
        var hometown_std_input = document.querySelector('.background_margin5px.student_hometown input');
        var address_std_input = document.querySelector('.background_margin5px.student_address input');
        var year_std_input = document.querySelector('.background_margin5px.student_year input');
        var department_std_input = document.querySelector('.background_margin5px.student_department input');
        var major_std_input = document.querySelector('.background_margin5px.student_major input');
        var class_std_input = document.querySelector('.background_margin5px.student_class input');
        var status_std_input = document.querySelector('.background_margin5px.student_status input');
        
        MSSV_input.innerText = MSSV_p.textContent;
        lastname_std_input.value = lastname_std_p.textContent;
        firstname_std_input.value = firstname_std_p.textContent;
        sex_std_input.value = sex_std_p.textContent;
        hometown_std_input.value = hometown_std_p.textContent;
        address_std_input.value = address_std_p.textContent;
        year_std_input.value = year_std_p.textContent;
        department_std_input.value = department_std_p.textContent;
        major_std_input.value = major_std_p.textContent;
        class_std_input.value = class_std_p.textContent;
        status_std_input.value = status_std_p.textContent;

        var birth_std_p = document.getElementById('birth_std').textContent;
        var birth_std_input = document.querySelector('.background_margin5px.student_birth input');
        birth_std_input.value = convertToDateInput(birth_std_p);
    });
    async function updateTableStudent() {
        // const studentTableBody = document.getElementById('studentTableBody');
        document.querySelector('.table-info-student table tbody').innerHTML = '';
        const studentTableBody = document.getElementById('studentTableBody');
                    get(ref(database, `users/students`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                let index = 1; // Biến để đếm số thứ tự
                                snapshot.forEach((childSnapshot) => {
                                    const studentData = childSnapshot.val();
                                    const studentMSSV = childSnapshot.key;
                                    
                                    // Tạo một hàng mới cho sinh viên
                                    const newRow = document.createElement('tr');

                                    // Thêm dữ liệu của sinh viên vào hàng
                                    newRow.innerHTML = `
                                        <td>${index}</td>
                                        <td>${studentData.lastname}</td>
                                        <td>${studentData.firstname}</td>
                                        <td class="MSSV">${studentData.MSSV}</td>
                                        <td>${studentData.status}</td>
                                        <td>${studentData.score}</td>
                                        <td><button class="view-details-btn">Xem chi tiết</button></td>
                                        <td><input type="checkbox" name="selectStd"></td>
                                    `;
                                    // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>

                                    // Thêm hàng vào bảng
                                    studentTableBody.appendChild(newRow);
                                    // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                                        const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                                        viewDetailsBtn.onclick = function() {
                                            viewDetailsStd(studentMSSV);
                                        };
                                    // Tăng biến đếm số thứ tự
                                    index++;
                                });
                            } else {
                                console.log("Không tìm thấy sinh viên nào.");
                            }
                        })
                        .catch((error) => {
                            console.error("Lỗi khi lấy dữ liệu sinh viên:", error);
                        });
    };
    
    document.getElementById("selectAllStd").addEventListener("change", function() {
        document.querySelectorAll("input[name='selectStd']").forEach(selectStd => {
            selectStd.checked = document.getElementById("selectAllStd").checked;
        });
    });

    // Tìm kiếm bằng MSSV
    document.querySelector('.outside-select-MSSV button').addEventListener('click', function() {
    const searchText = document.querySelector('.type-select-MSSV').value.trim();
    // Kiểm tra nếu không có giá trị MSSV được nhập vào
    if (searchText === '') {
        alert('Vui lòng nhập MSSV để tìm kiếm.');
        return;
    }
    // const studentTableBody = document.getElementById('studentTableBody');
    // Xóa dữ liệu cũ trong bảng
    document.querySelector('.table-info-student table tbody').innerHTML = '';
    // Lấy dữ liệu sinh viên từ cơ sở dữ liệu
    get(ref(database, `users/students`)).then((snapshot) => {
        if (snapshot.exists()) {
            // let index = 1;
            // Lặp qua các sinh viên
            snapshot.forEach((childSnapshot) => {
                const studentMSSV = childSnapshot.key;
                const studentData = childSnapshot.val();
                // alert(searchText);
                
                // Kiểm tra nếu MSSV của sinh viên trùng khớp với giá trị tìm kiếm
                if (studentData.MSSV == searchText) {
                        // Tạo một hàng mới cho sinh viên
                        const newRow = document.createElement('tr');
                        // alert(searchText);

                        // Thêm dữ liệu của sinh viên vào hàng
                        newRow.innerHTML = `
                            <td>1</td>
                            <td>${studentData.lastname}</td>
                            <td>${studentData.firstname}</td>
                            <td class="MSSV">${studentData.MSSV}</td>
                            <td>${studentData.status}</td>
                            <td>${studentData.score}</td>
                            <td><button class="view-details-btn">Xem chi tiết</button></td>
                            <td><input type="checkbox" name="selectStd"></td>
                        `;
                        // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>
                        // alert(searchText);
                        // Thêm hàng vào bảng
                        studentTableBody.appendChild(newRow);
                    // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                        const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                        viewDetailsBtn.onclick = function() {
                            viewDetailsStd(studentMSSV);
                        };
                    // Thêm hàng sinh viên vào bảng
                };
            });
        } else {
            console.log('Không có sinh viên trong cơ sở dữ liệu.');
        }
    }).catch((error) => {
        console.error('Lỗi khi lấy dữ liệu sinh viên:', error);
    });
    });
    document.querySelector('.button-enter_student').addEventListener('click', function() {
        const searchStatus = document.querySelector('.type-select-status').value.trim();
        const searchYear = document.querySelector('.type-select-year').value.trim();
        const searchDepartment = document.querySelector('.type-select-department_student').value.trim();
        const searchMajor = document.querySelector('.type-select-major').value.trim();
        if(searchStatus !== '' && searchStatus !== 'Tất cả' && searchYear !== '' && searchYear !== 'Tất cả' && searchMajor !== '' && searchMajor !== 'Tất cả') {
            // Xóa dữ liệu cũ trong bảng
            document.querySelector('.table-info-student table tbody').innerHTML = '';
            get(ref(database, `users/students`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
                    // Lặp qua các sinh viên
                    snapshot.forEach((childSnapshot) => {
                        const studentMSSV = childSnapshot.key;
                        const studentData = childSnapshot.val();
                        //   && (studentData.major == searchMajor)
                        // alert(studentData.year);
                        // alert(studentData.major);
                        // Kiểm tra nếu MSSV của sinh viên trùng khớp với giá trị tìm kiếm
                        if ((studentData.status == searchStatus) && (studentData.year == searchYear) && (studentData.major == searchMajor)) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${studentData.lastname}</td>
                                <td>${studentData.firstname}</td>
                                <td class="MSSV">${studentData.MSSV}</td>
                                <td>${studentData.status}</td>
                                <td>${studentData.score}</td>
                                <td><button class="view-details-btn">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectStd"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            studentTableBody.appendChild(newRow);
                        // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                            const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                            viewDetailsBtn.onclick = function() {
                                viewDetailsStd(studentMSSV);
                            };
                        // Thêm hàng sinh viên vào bảng
                            index += 1;
                        }
                    });
                } else {
                    alert('Không có sinh viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {});
            // return;
        }
        else if (searchStatus !== '' && searchStatus !== 'Tất cả' && searchYear !== '' && searchYear !== 'Tất cả' && searchDepartment !== '' && searchDepartment !== 'Tất cả') {
                        // Xóa dữ liệu cũ trong bảng
            document.querySelector('.table-info-student table tbody').innerHTML = '';
            get(ref(database, `users/students`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
                    // Lặp qua các sinh viên
                    snapshot.forEach((childSnapshot) => {
                        const studentMSSV = childSnapshot.key;
                        const studentData = childSnapshot.val();
                        //   && (studentData.major == searchMajor)
                        // alert(studentData.year);
                        // alert(studentData.major);
                        // Kiểm tra nếu MSSV của sinh viên trùng khớp với giá trị tìm kiếm
                        if ((studentData.status == searchStatus) && (studentData.year == searchYear) && (studentData.department == searchDepartment)) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${studentData.lastname}</td>
                                <td>${studentData.firstname}</td>
                                <td class="MSSV">${studentData.MSSV}</td>
                                <td>${studentData.status}</td>
                                <td>${studentData.score}</td>
                                <td><button class="view-details-btn">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectStd"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            studentTableBody.appendChild(newRow);
                        // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                            const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                            viewDetailsBtn.onclick = function() {
                                viewDetailsStd(studentMSSV);
                            };
                        // Thêm hàng sinh viên vào bảng
                            index += 1;
                        }
                    });
                } else {
                    alert('Không có sinh viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {});
        } 
        else if (searchStatus !== '' && searchStatus !== 'Tất cả' && searchYear !== ''  && searchYear !== 'Tất cả') {
             // Xóa dữ liệu cũ trong bảng
            document.querySelector('.table-info-student table tbody').innerHTML = '';
            get(ref(database, `users/students`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
                    // Lặp qua các sinh viên
                    snapshot.forEach((childSnapshot) => {
                        const studentMSSV = childSnapshot.key;
                        const studentData = childSnapshot.val();
                        //   && (studentData.major == searchMajor)
                        // alert(studentData.year);
                        // alert(studentData.major);
                        // Kiểm tra nếu MSSV của sinh viên trùng khớp với giá trị tìm kiếm
                        if ((studentData.status == searchStatus) && (studentData.year == searchYear)) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${studentData.lastname}</td>
                                <td>${studentData.firstname}</td>
                                <td class="MSSV">${studentData.MSSV}</td>
                                <td>${studentData.status}</td>
                                <td>${studentData.score}</td>
                                <td><button class="view-details-btn">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectStd"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            studentTableBody.appendChild(newRow);
                        // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                            const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                            viewDetailsBtn.onclick = function() {
                                viewDetailsStd(studentMSSV);
                            };
                        // Thêm hàng sinh viên vào bảng
                            index += 1;
                        }
                    });
                } else {
                    alert('Không có sinh viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {});
        }
        else if(searchStatus !== '' && searchStatus !== 'Tất cả' && searchDepartment !== '' && searchDepartment !== 'Tất cả') {
                         // Xóa dữ liệu cũ trong bảng
            document.querySelector('.table-info-student table tbody').innerHTML = '';
            get(ref(database, `users/students`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
                    // Lặp qua các sinh viên
                    snapshot.forEach((childSnapshot) => {
                        const studentMSSV = childSnapshot.key;
                        const studentData = childSnapshot.val();
                        //   && (studentData.major == searchMajor)
                        // alert(studentData.year);
                        // alert(studentData.major);
                        // Kiểm tra nếu MSSV của sinh viên trùng khớp với giá trị tìm kiếm
                        if ((studentData.status == searchStatus) && (studentData.department == searchDepartment)) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${studentData.lastname}</td>
                                <td>${studentData.firstname}</td>
                                <td class="MSSV">${studentData.MSSV}</td>
                                <td>${studentData.status}</td>
                                <td>${studentData.score}</td>
                                <td><button class="view-details-btn">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectStd"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            studentTableBody.appendChild(newRow);
                        // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                            const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                            viewDetailsBtn.onclick = function() {
                                viewDetailsStd(studentMSSV);
                            };
                        // Thêm hàng sinh viên vào bảng
                            index += 1;
                        }
                    });
                } else {
                    alert('Không có sinh viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {});
        }
        else if (searchYear !== ''  && searchYear !== 'Tất cả' && searchDepartment !== '' && searchDepartment !== 'Tất cả') {
            // Xóa dữ liệu cũ trong bảng
            document.querySelector('.table-info-student table tbody').innerHTML = '';
            get(ref(database, `users/students`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
                    // Lặp qua các sinh viên
                    snapshot.forEach((childSnapshot) => {
                        const studentMSSV = childSnapshot.key;
                        const studentData = childSnapshot.val();
                        //   && (studentData.major == searchMajor)
                        // alert(studentData.year);
                        // alert(studentData.major);
                        // Kiểm tra nếu MSSV của sinh viên trùng khớp với giá trị tìm kiếm
                        if ((studentData.year == searchYear) && (studentData.department == searchDepartment)) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${studentData.lastname}</td>
                                <td>${studentData.firstname}</td>
                                <td class="MSSV">${studentData.MSSV}</td>
                                <td>${studentData.status}</td>
                                <td>${studentData.score}</td>
                                <td><button class="view-details-btn">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectStd"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            studentTableBody.appendChild(newRow);
                        // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                            const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                            viewDetailsBtn.onclick = function() {
                                viewDetailsStd(studentMSSV);
                            };
                        // Thêm hàng sinh viên vào bảng
                            index += 1;
                        }
                    });
                } else {
                    alert('Không có sinh viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {});
        }
        else if(searchYear !== '') {
            if(searchYear === 'Tất cả') {
                updateTableStudent();
            }
            else {
            // Xóa dữ liệu cũ trong bảng
            document.querySelector('.table-info-student table tbody').innerHTML = '';
            get(ref(database, `users/students`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
                    // Lặp qua các sinh viên
                    snapshot.forEach((childSnapshot) => {
                        const studentMSSV = childSnapshot.key;
                        const studentData = childSnapshot.val();
                        //   && (studentData.major == searchMajor)
                        // alert(studentData.year);
                        // alert(studentData.major);
                        // Kiểm tra nếu MSSV của sinh viên trùng khớp với giá trị tìm kiếm
                        if ((studentData.year == searchYear)) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${studentData.lastname}</td>
                                <td>${studentData.firstname}</td>
                                <td class="MSSV">${studentData.MSSV}</td>
                                <td>${studentData.status}</td>
                                <td>${studentData.score}</td>
                                <td><button class="view-details-btn">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectStd"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            studentTableBody.appendChild(newRow);
                        // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                            const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                            viewDetailsBtn.onclick = function() {
                                viewDetailsStd(studentMSSV);
                            };
                        // Thêm hàng sinh viên vào bảng
                            index += 1;
                        }
                    });
                } else {
                    alert('Không có sinh viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {});
        }
        }
        else if(searchDepartment !== '') {
            if(searchDepartment === 'Tất cả') {
                updateTableStudent();
            }
            else {
            // Xóa dữ liệu cũ trong bảng
            document.querySelector('.table-info-student table tbody').innerHTML = '';
            get(ref(database, `users/students`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
                    // Lặp qua các sinh viên
                    snapshot.forEach((childSnapshot) => {
                        const studentMSSV = childSnapshot.key;
                        const studentData = childSnapshot.val();
                        //   && (studentData.major == searchMajor)
                        // alert(studentData.year);
                        // alert(studentData.major);
                        // Kiểm tra nếu MSSV của sinh viên trùng khớp với giá trị tìm kiếm
                        if ((studentData.department == searchDepartment)) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${studentData.lastname}</td>
                                <td>${studentData.firstname}</td>
                                <td class="MSSV">${studentData.MSSV}</td>
                                <td>${studentData.status}</td>
                                <td>${studentData.score}</td>
                                <td><button class="view-details-btn">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectStd"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            studentTableBody.appendChild(newRow);
                        // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                            const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                            viewDetailsBtn.onclick = function() {
                                viewDetailsStd(studentMSSV);
                            };
                        // Thêm hàng sinh viên vào bảng
                            index += 1;
                        }
                    });
                } else {
                    alert('Không có sinh viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {});
        }
        }
        else if(searchStatus !== '') {
            if(searchStatus === 'Tất cả') {
                updateTableStudent();
            }
            else {
            // Xóa dữ liệu cũ trong bảng
            document.querySelector('.table-info-student table tbody').innerHTML = '';
            get(ref(database, `users/students`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
                    // Lặp qua các sinh viên
                    snapshot.forEach((childSnapshot) => {
                        const studentMSSV = childSnapshot.key;
                        const studentData = childSnapshot.val();
                        //   && (studentData.major == searchMajor)
                        // alert(studentData.year);
                        // alert(studentData.major);
                        // Kiểm tra nếu MSSV của sinh viên trùng khớp với giá trị tìm kiếm
                        if ((studentData.status == searchStatus)) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${studentData.lastname}</td>
                                <td>${studentData.firstname}</td>
                                <td class="MSSV">${studentData.MSSV}</td>
                                <td>${studentData.status}</td>
                                <td>${studentData.score}</td>
                                <td><button class="view-details-btn">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectStd"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${studentMSSV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            studentTableBody.appendChild(newRow);
                        // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                            const viewDetailsBtn = newRow.querySelector('.view-details-btn');
                            viewDetailsBtn.onclick = function() {
                                viewDetailsStd(studentMSSV);
                            };
                        // Thêm hàng sinh viên vào bảng
                            index += 1;
                        }
                    });
                } else {
                    alert('Không có sinh viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {});
        }
        }
        else if((searchStatus == '' || searchStatus == 'Tất cả') && (searchYear == '' || searchYear == 'Tất cả') && (searchMajor == '' || searchMajor == 'Tất cả') && (searchDepartment == '' || searchDepartment == 'Tất cả')) {
            updateTableStudent();
        };
    });

    // Function để xóa đối tượng theo MSSV
    document.querySelector('.delete-student button').addEventListener('click', async function() {
        const checkboxes = document.querySelectorAll('input[name="selectStd"]');
        let deletePromises = []; // Mảng chứa các promise của các thao tác xóa
        let i = 0;
    
        checkboxes.forEach(checkbox => {  
            if (checkbox.checked) {
                // Lấy phần tử tr cùng hàng với checkbox được chọn
                const row = checkbox.closest('tr');
                if (row) {
                    // Tìm phần tử có class là 'MSSV' trong hàng đó
                    const MSSVElement = row.querySelector('.MSSV');
                    if (MSSVElement) {
                        const MSSV = MSSVElement.textContent;
                        deletePromises.push(deleteUserByMSSV(database, MSSV));
                        i++;
                    } else {
                        console.error("Không tìm thấy MSSV trong hàng này.");
                    }
                } else {
                    console.error("Không tìm thấy hàng chứa checkbox.");
                }
            }
        });
    
        try {
            await Promise.all(deletePromises);
            if(i > 0) {
                alert("Đã xóa " + i + " sinh viên.");
            }
            // Cập nhật bảng sau khi tất cả các sinh viên đã bị xóa
            updateTableStudent();
        } catch (error) {
            console.error("Lỗi khi xóa sinh viên:", error);
        }
    });
    async function deleteUserByMSSV(database, mssvToDelete) {
        try {

            // Tìm đối tượng có MSSV tương ứng
            const userQuery = query(ref(database, `users/students`), orderByChild("MSSV"), equalTo(mssvToDelete));
            const snapshot = await get(userQuery);

            if (snapshot.exists()) {
                // Xóa đối tượng
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    remove(ref(database, `users/students/${key}`))
                        .then(() => {
                            console.log(`Đã xóa đối tượng có MSSV ${mssvToDelete}`);
                            // updateTableStudent();
                        })
                        .catch((error) => {
                            console.error("Lỗi khi xóa đối tượng:", error);
                        });
                });
            } else {
                console.log(`Không tìm thấy đối tượng có MSSV ${mssvToDelete}`);
            }
        } catch (error) {
            console.error("Lỗi khi tìm và xóa đối tượng:", error);
        }
    };

    document.querySelector('.outside-form-info_std .edit_a_student .edit-info_std').addEventListener('click', async function() {
        try {
            const mssv = document.getElementById('mssv').textContent;
            const userQuery = await query(ref(database, `users/students`), orderByChild("MSSV"), equalTo(mssv));
            // alert(userQuery.key);
            const snapshots = await get(userQuery);
            // alert(snapshots.key);
            // const snapshot = await get(snapshots);
            if (snapshots.exists()) {
                // Xóa đối tượng
                snapshots.forEach(async (childSnapshot) => {
                    const key = childSnapshot.key;
                    // alert(childSnapshot.key);
                    const snapshot = await get(child(ref(database, `users/students`), key));
                        var lastname_std_input = document.querySelector('.background_margin5px.student_lastname input');
                        var firstname_std_input = document.querySelector('.background_margin5px.student_firstname input');
                        var sex_std_input = document.querySelector('.background_margin5px.student_sex input');
                        var hometown_std_input = document.querySelector('.background_margin5px.student_hometown input');
                        var address_std_input = document.querySelector('.background_margin5px.student_address input');
                        var year_std_input = document.querySelector('.background_margin5px.student_year input');
                        var department_std_input = document.querySelector('.background_margin5px.student_department input');
                        var major_std_input = document.querySelector('.background_margin5px.student_major input');
                        var class_std_input = document.querySelector('.background_margin5px.student_class input');
                        var status_std_input = document.querySelector('.background_margin5px.student_status input');
                        
                        var birth_std_input = document.querySelector('.background_margin5px.student_birth input').value;
                        var date = new Date(birth_std_input);
                        var dayB = date.getDate();
                        var monthB = date.getMonth() + 1;
                        var yearB = date.getFullYear();

                        var birth = (dayB < 10 ? '0' : '') + dayB + '/' + (monthB < 10 ? '0' : '') + monthB + '/' + yearB;
                    if(snapshot.exists()) {
                        update(ref(database, `users/students/${snapshot.key}`), {
                            firstname: firstname_std_input.value,
                            lastname: lastname_std_input.value,
                            sex: sex_std_input.value,
                            hometown: hometown_std_input.value,
                            address: address_std_input.value,
                            birth: birth,
                            year: year_std_input.value,
                            department: department_std_input.value,
                            major: major_std_input.value,
                            class: class_std_input.value,
                            status: status_std_input.value,
                        })
                        .then(() => {
                            alert("Cập nhật thành công");
                            close_modal('.outside-form-info_std');
                            viewDetailsStd(snapshot.key);
                            updateTableStudent();
                        })
                        .catch(() => {
                            alert("Cập nhật thất bại");
                        });
                    };
                });
            } else {
                console.log(`Không tìm thấy đối tượng có MSSV ${mssv}`);
            }
        } catch (error) {
            console.error("Lỗi khi tìm và xóa đối tượng:", error);
        }
    });

    // Phần giảng viên =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================
    updateTableTeacher();
    // updateTableTeacher();
    document.querySelector('.edit_edit-info_tch').addEventListener('click', async function() {
        let MSGV = document.querySelector('.edit_teacher_MSGV input').value;
        let lastname = document.querySelector('.edit_teacher_lastname input').value;
        let firstname = document.querySelector('.edit_teacher_firstname input').value;
        let sex = document.querySelector('.edit_teacher_sex input').value;
        var birth_pre = document.querySelector('.edit_teacher_birth input').value;
        var date = new Date(birth_pre);
        var dayB = date.getDate();
        var monthB = date.getMonth() + 1;
        var yearB = date.getFullYear();
        var birth = (dayB < 10 ? '0' : '') + dayB + '/' + (monthB < 10 ? '0' : '') + monthB + '/' + yearB;
        let hometown = document.querySelector('.edit_teacher_hometown input').value;
        let address = document.querySelector('.edit_teacher_address input').value;
        let department = document.querySelector('.edit_teacher_department input').value;
        let major = document.querySelector('.edit_teacher_major input').value;
        let degree = document.querySelector('.edit_teacher_status input').value;
        // let status = "active"; // Assuming the status for a new teacher is active
    
        const userQuery = query(ref(database, "users/teachers/"), orderByChild("MSGV"), equalTo(MSGV));
        const snapshot = await get(userQuery);
        if (snapshot.exists()) {
            alert("MSGV đã tồn tại trong hệ thống");
            document.querySelector('.edit_teacher_MSGV input').value = "";
            return;
        } 
    
        const teacher = {
            MSGV: MSGV,
            lastname: lastname,
            firstname: firstname,
            sex: sex,
            birth: birth,
            hometown: hometown,
            address: address,
            department: department,
            major: major,
            degree: degree,
            progress: "",
        };
    
        let email = `${MSGV}gv@hcmut.edu.vn`;
        let password = MSGV;
    
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let uid = userCredential.user.uid;
    
            set(ref(database, `users/teachers/${uid}`), teacher)
            .then(() => {
                console.log("Tài khoản đăng nhập đã được tạo cho giảng viên và gắn với thông tin mới.");
                console.log("Email:", email);
                console.log("Mật khẩu:", password);
    
                document.getElementById("edit_form_info_teacher").reset();
                updateTableTeacher();
                alert("Thêm giảng viên thành công!");
            })
            .catch((error) => {
                alert("Lỗi khi gắn tài khoản đăng nhập với thông tin giảng viên:", error);
            });
        })
        .catch((error) => {
            alert("Lỗi khi tạo tài khoản đăng nhập:", error);
            document.getElementById("edit_form_info_teacher").reset();
        });
    });

    async function updateTableTeacher() {
        // document.getElementById('teacherTableBody').innerHTML = '';
            document.getElementById('teacherTableBody').innerHTML = '';
                // teacherTableBody.innerHTML = '';
                    get(ref(database, `users/teachers`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                let index = 1; // Biến để đếm số thứ tự
                                snapshot.forEach((childSnapshot) => {
                                    const teacherData = childSnapshot.val();
                                    const teacherMSGV = childSnapshot.key;
                                    
                                    // Tạo một hàng mới cho sinh viên
                                    const newRow = document.createElement('tr');

                                    // Thêm dữ liệu của sinh viên vào hàng
                                    newRow.innerHTML = `
                                        <td>${index}</td>
                                        <td>${teacherData.lastname}</td>
                                        <td>${teacherData.firstname}</td>
                                        <td class="MSGV">${teacherData.MSGV}</td>
                                        <td>${teacherData.degree}</td>
                                        <td>${teacherData.department}</td>
                                        <td><button class="view-details-btn_teacher">Xem chi tiết</button></td>
                                        <td><input type="checkbox" name="selectTch"></td>
                                    `;
                                    // <td><button onclick="viewDetailsStd('${teacherMSGV}')">Xem chi tiết</button></td>

                                    // Thêm hàng vào bảng
                                    teacherTableBody.appendChild(newRow);
                                    // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                                        const viewDetailsBtn = newRow.querySelector('.view-details-btn_teacher');
                                        viewDetailsBtn.onclick = function() {
                                            viewDetailsTch(teacherMSGV);
                                        };
                                    // Tăng biến đếm số thứ tự
                                    index++;
                                })
                            } else {
                                console.log("Không tìm thấy giảng viên nào.");
                            };
                        })
                        .catch((error) => {
                            console.error("Lỗi khi lấy dữ liệu giảng viên:", error);
                        });
    };

    async function viewDetailsTch(key) {
        var modal = document.querySelector('.modal_teacher');
        modal.style.display = 'flex';
        // alert(key);
        const MSGV = document.getElementById('MSGV');
        const lastname = document.getElementById('lastname_tch');
        const firstname = document.getElementById('firstname_tch');
        const sex = document.getElementById('sex_tch');
        const birth = document.getElementById('birth_tch');
        const hometown = document.getElementById('hometown_tch');
        const address = document.getElementById('address_tch');
        const department = document.getElementById('department_tch');
        const degree = document.getElementById('status_tch');
        const major = document.getElementById('major_tch');
        // const progress = document.getElementById('progress_tch');
        
        // Đoạn mã để xem chi tiết sinh viên
        try {
            const snapshot = await get(child(ref(database, `users/teachers`), key));
            if (snapshot.exists()) {
                const teacherData = snapshot.val();
                // alert(teacherData.birth);
                MSGV.innerText = teacherData.MSGV;
                lastname.innerText = teacherData.lastname;
                firstname.innerText = teacherData.firstname;
                sex.innerText = teacherData.sex;
                birth.innerText = teacherData.birth;
                hometown.innerText = teacherData.hometown;
                address.innerText = teacherData.address;
                department.innerText = teacherData.department;
                major.innerText = teacherData.major;
                degree.innerText = teacherData.degree;
                // progress.innerText = teacherData.progress;
            } else {
                console.log('Không có giảng viên trong cơ sở dữ liệu.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu giảng viên:', error);
        }
    };

    document.querySelector('.modal_teacher .edit_a_teacher button').addEventListener('click', function() {
        var outside_form_info_std = document.querySelector('.outside-form-info_tch');
        outside_form_info_std.style.display = 'flex';

        var MSGV = document.getElementById('MSGV');
        var lastname = document.getElementById('lastname_tch');
        var firstname = document.getElementById('firstname_tch');
        var sex = document.getElementById('sex_tch');
        var hometown = document.getElementById('hometown_tch');
        var address = document.getElementById('address_tch');
        var department = document.getElementById('department_tch');
        var degree = document.getElementById('status_tch');
        var major = document.getElementById('major_tch');
        // var progress = document.getElementById('progress_tch');
        
        // Lấy các ô input
        const MSGV_input = document.getElementById('msgv');
        var lastname_input = document.querySelector('.background_margin5px.teacher_lastname input');
        var firstname_input = document.querySelector('.background_margin5px.teacher_firstname input');
        var sex_input = document.querySelector('.background_margin5px.teacher_sex input');
        var hometown_input = document.querySelector('.background_margin5px.teacher_hometown input');
        var address_input = document.querySelector('.background_margin5px.teacher_address input');
        var department_input = document.querySelector('.background_margin5px.teacher_department input');
        var degree_input = document.querySelector('.background_margin5px.teacher_status input');
        var major_input = document.querySelector('.background_margin5px.teacher_major input');

        MSGV_input.innerText = MSGV.textContent;
        lastname_input.value = lastname.textContent;
        firstname_input.value = firstname.textContent;
        sex_input.value = sex.textContent;
        hometown_input.value = hometown.textContent;
        address_input.value = address.textContent;
        department_input.value = department.textContent;
        major_input.value = major.textContent;
        degree_input.value = degree.textContent;

        var birth = document.getElementById('birth_tch').textContent;
        var birth_input = document.querySelector('.background_margin5px.teacher_birth input');
        birth_input.value = convertToDateInput(birth);
    });

    document.querySelector('.outside-form-info_tch .edit_a_teacher button').addEventListener('click', async function() {
        try {
            const msgv = document.getElementById('msgv').textContent;
            const userQuery = await query(ref(database, `users/teachers`), orderByChild("MSGV"), equalTo(msgv));
            // alert(userQuery.key);
            const snapshots = await get(userQuery);
            // alert(snapshots.key);
            // const snapshot = await get(snapshots);
            if (snapshots.exists()) {
                // Xóa đối tượng
                snapshots.forEach(async (childSnapshot) => {
                    const key = childSnapshot.key;
                    // alert(childSnapshot.key);
                    const snapshot = await get(child(ref(database, `users/teachers`), key));
                    var lastname_input = document.querySelector('.background_margin5px.teacher_lastname input');
                    var firstname_input = document.querySelector('.background_margin5px.teacher_firstname input');
                    var sex_input = document.querySelector('.background_margin5px.teacher_sex input');
                    var hometown_input = document.querySelector('.background_margin5px.teacher_hometown input');
                    var address_input = document.querySelector('.background_margin5px.teacher_address input');
                    var department_input = document.querySelector('.background_margin5px.teacher_department input');
                    var degree_input = document.querySelector('.background_margin5px.teacher_status input');
                    var major_input = document.querySelector('.background_margin5px.teacher_major input');
                    
                    var birth_input = document.querySelector('.background_margin5px.teacher_birth input').value;
                    var date = new Date(birth_input);
                    var dayB = date.getDate();
                    var monthB = date.getMonth() + 1;
                    var yearB = date.getFullYear();

                    var birth = (dayB < 10 ? '0' : '') + dayB + '/' + (monthB < 10 ? '0' : '') + monthB + '/' + yearB;
                    if(snapshot.exists()) {
                        update(ref(database, `users/teachers/${snapshot.key}`), {
                            lastname: lastname_input.value,
                            firstname: firstname_input.value,
                            sex: sex_input.value,
                            birth: birth,
                            hometown: hometown_input.value,
                            address: address_input.value,
                            department: department_input.value,
                            major: major_input.value,
                            degree: degree_input.value,
                        })
                        .then(() => {
                            alert("Cập nhật thành công");
                            close_modal('.outside-form-info_tch');
                            viewDetailsTch(snapshot.key);
                            updateTableTeacher();
                        })
                        .catch(() => {
                            alert("Cập nhật thất bại");
                        });
                    };
                });
            } else {
                console.log(`Không tìm thấy đối tượng có MSGV ${msgv}`);
            }
        } catch (error) {
            console.error("Lỗi khi tìm và xóa đối tượng:", error);
        }
    });

    document.getElementById("selectAllTch").addEventListener("change", function() {
        document.querySelectorAll("input[name='selectTch']").forEach(selectStd => {
            selectStd.checked = document.getElementById("selectAllTch").checked;
        });
    });

    document.querySelector('.delete-teacher button').addEventListener('click', async function() {
        const checkboxes = document.querySelectorAll('input[name="selectTch"]');
        let deletePromises = []; // Mảng chứa các promise của các thao tác xóa
        let i = 0;
    
        checkboxes.forEach(checkbox => {  
            if (checkbox.checked) {
                // Lấy phần tử tr cùng hàng với checkbox được chọn
                const row = checkbox.closest('tr');
                if (row) {
                    // Tìm phần tử có class là 'MSSV' trong hàng đó
                    const MSGVElement = row.querySelector('.MSGV');
                    if (MSGVElement) {
                        const MSGV = MSGVElement.textContent;
                        deletePromises.push(deleteUserByMSGV(database, MSGV));
                        i++;
                    } else {
                        console.error("Không tìm thấy MSGV trong hàng này.");
                    }
                } else {
                    console.error("Không tìm thấy hàng chứa checkbox.");
                }
            }
        });
    
        try {
            await Promise.all(deletePromises);
            if(i > 0) {
                alert("Đã xóa " + i + " giảng viên.");
            }
            updateTableTeacher();
        } catch (error) {
            console.error("Lỗi khi xóa giảng:", error);
        }
    });

    async function deleteUserByMSGV(database, msgvToDelete) {
        try {
            // Tìm đối tượng có MSSV tương ứng
            const userQuery = query(ref(database, `users/teachers`), orderByChild("MSGV"), equalTo(msgvToDelete));
            const snapshot = await get(userQuery);

            if (snapshot.exists()) {
                // Xóa đối tượng
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    remove(ref(database, `users/teachers/${key}`))
                        .then(() => {
                            console.log(`Đã xóa đối tượng có MSGV ${msgvToDelete}`);
                            // updateTableTeacher();
                        })
                        .catch((error) => {
                            console.error("Lỗi khi xóa đối tượng:", error);
                        });
                });
            } else {
                console.log(`Không tìm thấy đối tượng có MSGV ${msgvToDelete}`);
            }
        } catch (error) {
            console.error("Lỗi khi tìm và xóa đối tượng:", error);
        }
    }

    document.querySelector('.outside-select-MSGV button').addEventListener('click', function() {
        const searchText = document.querySelector('.type-select-MSGV').value.trim();
        // Kiểm tra nếu không có giá trị MSGV được nhập vào
        if (searchText === '') {
            alert('Vui lòng nhập MSGV để tìm kiếm.');
            return;
        }
        // const studentTableBody = document.getElementById('studentTableBody');
        // Xóa dữ liệu cũ trong bảng
        document.querySelector('.table-info-teacher table tbody').innerHTML = '';
        // Lấy dữ liệu sinh viên từ cơ sở dữ liệu
        get(ref(database, `users/teachers`)).then((snapshot) => {
            if (snapshot.exists()) {
                // let index = 1;
                // Lặp qua các sinh viên
                snapshot.forEach((childSnapshot) => {
                    const teacherMSGV = childSnapshot.key;
                    const teacherData = childSnapshot.val();
                    // alert(searchText);
                    
                    // Kiểm tra nếu MSGV của sinh viên trùng khớp với giá trị tìm kiếm
                    if (teacherData.MSGV == searchText) {
                            // Tạo một hàng mới cho sinh viên
                            const newRow = document.createElement('tr');
                            // alert(searchText);
    
                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>1</td>
                                <td>${teacherData.lastname}</td>
                                <td>${teacherData.firstname}</td>
                                <td class="MSGV">${teacherData.MSGV}</td>
                                <td>${teacherData.degree}</td>
                                <td>${teacherData.department}</td>
                                <td><button class="view-details-btn_teacher">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectTch"></td>
                                `;
                                    // <td><button onclick="viewDetailsStd('${teacherMSGV}')">Xem chi tiết</button></td>

                                    // Thêm hàng vào bảng
                                teacherTableBody.appendChild(newRow);
                                    // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                                const viewDetailsBtn = newRow.querySelector('.view-details-btn_teacher');
                                viewDetailsBtn.onclick = function() {
                                    viewDetailsTch(teacherMSGV);
                                };
                        // Thêm hàng sinh viên vào bảng
                    };
                });
            } else {
                console.log('Không có giảng viên trong cơ sở dữ liệu.');
            }
        }).catch((error) => {
            console.error('Lỗi khi lấy dữ liệu giảng viên:', error);
        });
    });

    document.querySelector('.button-enter_teacher').addEventListener('click', function() {
        const searchDepartment = document.querySelector('.type-select-department_teacher').value.trim();
        const searchDegree = document.querySelector('.type-select-degree_teacher').value.trim();
        if(searchDepartment != '' && searchDepartment !== 'Tất cả' && searchDegree != '' && searchDegree !== 'Tất cả') {
            document.getElementById('teacherTableBody').innerHTML = '';
            get(ref(database, `users/teachers`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1; // Biến để đếm số thứ tự
                    snapshot.forEach((childSnapshot) => {
                        const teacherData = childSnapshot.val();
                        const teacherMSGV = childSnapshot.key;
                        if(searchDepartment == teacherData.department && searchDegree == teacherData.degree) {
                        // Tạo một hàng mới cho sinh viên
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${teacherData.lastname}</td>
                                <td>${teacherData.firstname}</td>
                                <td class="MSGV">${teacherData.MSGV}</td>
                                <td>${teacherData.degree}</td>
                                <td>${teacherData.department}</td>
                                <td><button class="view-details-btn_teacher">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectTch"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${teacherMSGV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            teacherTableBody.appendChild(newRow);
                            // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                                const viewDetailsBtn = newRow.querySelector('.view-details-btn_teacher');
                                viewDetailsBtn.onclick = function() {
                                    viewDetailsTch(teacherMSGV);
                                };
                            // Tăng biến đếm số thứ tự
                            index++;
                        }
                    })
                } else {
                    console.log("Không tìm thấy giảng viên nào.");
                };
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu giảng viên:", error);
            });
        }
        else if (searchDepartment !== '' && searchDepartment !== 'Tất cả') {
            document.getElementById('teacherTableBody').innerHTML = '';
            get(ref(database, `users/teachers`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1; // Biến để đếm số thứ tự
                    snapshot.forEach((childSnapshot) => {
                        const teacherData = childSnapshot.val();
                        const teacherMSGV = childSnapshot.key;
                        if(searchDepartment == teacherData.department) {
                        // Tạo một hàng mới cho sinh viên
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${teacherData.lastname}</td>
                                <td>${teacherData.firstname}</td>
                                <td class="MSGV">${teacherData.MSGV}</td>
                                <td>${teacherData.degree}</td>
                                <td>${teacherData.department}</td>
                                <td><button class="view-details-btn_teacher">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectTch"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${teacherMSGV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            teacherTableBody.appendChild(newRow);
                            // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                                const viewDetailsBtn = newRow.querySelector('.view-details-btn_teacher');
                                viewDetailsBtn.onclick = function() {
                                    viewDetailsTch(teacherMSGV);
                                };
                            // Tăng biến đếm số thứ tự
                            index++;
                        }
                    })
                } else {
                    console.log("Không tìm thấy giảng viên nào.");
                };
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu giảng viên:", error);
            });
        }
        else if (searchDegree !== '' && searchDegree !== 'Tất cả') {
            document.getElementById('teacherTableBody').innerHTML = '';
            get(ref(database, `users/teachers`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1; // Biến để đếm số thứ tự
                    snapshot.forEach((childSnapshot) => {
                        const teacherData = childSnapshot.val();
                        const teacherMSGV = childSnapshot.key;
                        if(searchDegree == teacherData.degree) {
                        // Tạo một hàng mới cho sinh viên
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td>${teacherData.lastname}</td>
                                <td>${teacherData.firstname}</td>
                                <td class="MSGV">${teacherData.MSGV}</td>
                                <td>${teacherData.degree}</td>
                                <td>${teacherData.department}</td>
                                <td><button class="view-details-btn_teacher">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectTch"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${teacherMSGV}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            teacherTableBody.appendChild(newRow);
                            // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                                const viewDetailsBtn = newRow.querySelector('.view-details-btn_teacher');
                                viewDetailsBtn.onclick = function() {
                                    viewDetailsTch(teacherMSGV);
                                };
                            // Tăng biến đếm số thứ tự
                            index++;
                        }
                    })
                } else {
                    console.log("Không tìm thấy giảng viên nào.");
                };
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu giảng viên:", error);
            });
        }
        else {
            updateTableTeacher();
        };
    });

    // Phần khóa học =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================
    // =======================================================================================================================

    updateTableCourse();
    document.querySelector('.select_add_new_sc .select_add_new_sc_yes').addEventListener('click', async function() {
        const MSKH = document.querySelector('.add_new_sc_mskh input').value.trim();
        const add_new_sc_mt = document.querySelector('.add_new_sc_mt input').value.trim();
        const add_new_sc_describe = document.querySelector('.add_new_sc_describe textarea').value.trim();
        if(MSKH == '' || add_new_sc_mt == '') {
            alert('Vui lòng điền đầy đủ thông tin.');
            document.querySelector('.add_new_sc_mskh input').value = "";
            document.querySelector('.add_new_sc_mt input').value = "";
            document.querySelector('.add_new_sc_describe textarea').value = "";
            return;
        }
        const userQuery = query(ref(database,`courses`), orderByChild("MSKH"), equalTo(MSKH));
        const snapshot = await get(userQuery);
        if (snapshot.exists()) {
            alert("MSKH đã tồn tại trong hệ thống");
            document.querySelector('.add_new_sc_mskh input').value = "";
            return;
        } 
        const sc = {
            MSKH: MSKH,
            name: add_new_sc_mt,
            describe: add_new_sc_describe,
            teacher:"",
        };
        const ID = await generateCourseId(MSKH);
        set(ref(database, `courses/${ID}`), sc)
        .then(() => {
            alert('Thêm khóa học thành công.');
            updateTableCourse();
            document.querySelector('.add_new_sc_mskh input').value = "";
            document.querySelector('.add_new_sc_mt input').value = "";
            document.querySelector('.add_new_sc_describe textarea').value = "";
        })
        .catch(error => {
            alert("Lỗi khi thêm khóa học:", error);
            document.querySelector('.add_new_sc_mskh input').value = "";
            document.querySelector('.add_new_sc_mt input').value = "";
            document.querySelector('.add_new_sc_describe textarea').value = "";
        });
    });
    
    
    async function generateCourseId(MSKH) {
        const timestamp = Date.now().toString();
        return timestamp + '_' + MSKH;
    }

    async function updateTableCourse() {
        document.getElementById('courseTableBody').innerHTML = '';
        get(ref(database, `courses`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                let index = 1; // Biến để đếm số thứ tự
                snapshot.forEach((childSnapshot) => {
                    const courseData = childSnapshot.val();
                    const keyMSKH = childSnapshot.key;
                    
                    // Tạo một hàng mới cho sinh viên
                    const newRow = document.createElement('tr');

                    // Thêm dữ liệu của sinh viên vào hàng
                    newRow.innerHTML = `
                        <td>${index}</td>
                        <td class="MSKH">${courseData.MSKH}</td>
                        <td>${courseData.name}</td>
                        <td><button class="view-details-btn_course">Xem chi tiết</button></td>
                        <td><input type="checkbox" name="selectSc"></td>
                    `;
                    // <td><button onclick="viewDetailsStd('${keyMSKH}')">Xem chi tiết</button></td>

                    // Thêm hàng vào bảng
                    courseTableBody.appendChild(newRow);
                    // Tạo một sự kiện nghe cho nút "Xem chi tiết"
                        const viewDetailsBtn = newRow.querySelector('.view-details-btn_course');
                        viewDetailsBtn.onclick = function() {
                            viewDetailsSc(keyMSKH);
                        };
                    // Tăng biến đếm số thứ tự
                    index++;
                })
            } else {
                console.log("Không tìm thấy khóa học nào.");
            };
        })
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu khóa học:", error);
        });
    };

    async function updateTableTeacher_Sc(key) {
        // Xóa nội dung hiện tại của bảng
        document.getElementById('selectTeacherToSc_Body').innerHTML = '';
    
        try {
            const teacherSnapshot = await get(ref(database, 'users/teachers'));
            if (!teacherSnapshot.exists()) {
                console.log("Không tìm thấy giảng viên nào.");
                return;
            }
    
            const courseSnapshot = await get(child(ref(database, 'courses'), key));
            if (!courseSnapshot.exists()) {
                console.log("Không tìm thấy khóa học.");
                return;
            }
    
            const courseTeachers = courseSnapshot.val().teacher ? Object.keys(courseSnapshot.val().teacher) : [];
            
            let index = 1;
    
            teacherSnapshot.forEach((childSnapshot) => {
                const teacherId = childSnapshot.key;
                const teacherData = childSnapshot.val();
    
                if (!courseTeachers.includes(teacherId)) {
                    const newRow = document.createElement('tr');
    
                    newRow.innerHTML = `
                        <td>${index}</td>
                        <td class="MSGV">${teacherData.MSGV}</td>
                        <td>${teacherData.lastname}</td>
                        <td>${teacherData.firstname}</td>
                        <td>${teacherData.department}</td>
                        <td><input type="checkbox" name="selectTTch_Sc"></td>
                    `;
    
                    selectTeacherToSc_Body.appendChild(newRow);
    
                    index++;
                }
            });
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu giảng viên hoặc khóa học:", error);
        }
    };
    document.getElementById("selectTAddAllTch_Sc").addEventListener("change", function() {
        document.querySelectorAll("input[name='selectTTch_Sc']").forEach(selectStd => {
            selectStd.checked = document.getElementById("selectTAddAllTch_Sc").checked;
        });
    });
    async function viewDetailsSc(key) {
        updateTeacherHaveSc(key);
        displayFileUrls(key, 'outline', 'fileTableOutline');
        displayFileUrls(key, 'document', 'fileTableDocument');
        document.querySelector('.outside_modal_detail_sc').style.display = 'block';
        const mskh = document.querySelector('.header_detail_sc_mskh span');
        const name = document.querySelector('.header_detail_sc_name span');
        const describe = document.getElementById('detail_text_mt_sc');
        try {
            const snapshot = await get(child(ref(database, `courses`), key));
            if (snapshot.exists()) {
                const courseData = snapshot.val();
                mskh.innerText = courseData.MSKH;
                name.innerText = courseData.name;
                describe.innerText = courseData.describe;
            } else {
                console.log('Không có khóa học trong cơ sở dữ liệu.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu khóa học:', error);
        }
    };

    document.querySelector('.detail_sc_teacher_button button').addEventListener('click', async function() {
        const MSKH = document.querySelector('.header_detail_sc_mskh span').textContent;
        const courseKey = await getCourseKeybyMSKH(MSKH);
        // alert(lastkey);
        updateTableTeacher_Sc(courseKey);
    });

    document.querySelector('.yes_add_tch_to_sc').addEventListener('click', async function() {
        const MSKH = document.querySelector('.header_detail_sc_mskh span').textContent;
        const courseKey = await getCourseKeybyMSKH(MSKH);
        const checkboxes = document.querySelectorAll('input[name="selectTTch_Sc"]');
        let addPromises = []; 
        let i = 0;
    
        checkboxes.forEach(checkbox => {  
            if (checkbox.checked) {
                const row = checkbox.closest('tr');
                if (row) {
                    const MSGVElement = row.querySelector('.MSGV');
                    if (MSGVElement) {
                        const MSGV = MSGVElement.textContent;
                        addPromises.push(addTeacherToCourse(courseKey, MSGV));
                        i++;
                    } else {
                        console.error("Không tìm thấy MSGV trong hàng này.");
                    }
                } else {
                    console.error("Không tìm thấy hàng chứa checkbox.");
                }
            }
        });
    
        try {
            await Promise.all(addPromises);
            if(i > 0) {
                alert("Đã thêm " + i + " giảng viên vào khóa học");
            }
            updateTeacherHaveSc(courseKey);
            updateTableTeacher_Sc(courseKey);
        } catch (error) {
            console.error("Lỗi khi thêm giảng viên:", error);
        }
    });
    
    async function getCourseKeybyMSKH(MSKH) {
        const userQuery = query(ref(database, `courses`), orderByChild("MSKH"), equalTo(MSKH));
        const snapshots = await get(userQuery);
            
        if (snapshots.exists()) {
            const firstSnapshot = snapshots.val();
            const courseKey = Object.keys(firstSnapshot)[0];
            return courseKey;
        } else {
            console.log("Không tìm thấy khóa học với MSKH là " + MSKH);
        }
    }
    
    async function getTeacherKeyByMSGV(MSGV) {
        const userQuery = query(ref(database, `users/teachers`), orderByChild("MSGV"), equalTo(MSGV));
        const snapshots = await get(userQuery);
            
        if (snapshots.exists()) {
            const firstSnapshot = snapshots.val();
            const teacherKey = Object.keys(firstSnapshot)[0];
            return teacherKey;
        } else {
            console.log("Không tìm thấy khóa học với MSGV là " + MSGV);
        }
    }
    
    async function addTeacherToCourse(courseKey, MSGV) {
        try {
            const teacherKey = await getTeacherKeyByMSGV(MSGV);
            
            const updates = {};
            updates[`courses/${courseKey}/teacher/${teacherKey}/${"temp"}`] = true;
            
            await update(ref(database), updates);
            
            const updatesTch = {};
            updatesTch[`users/teachers/${teacherKey}/course/${courseKey}/${"temp"}`] = true;

            await update(ref(database), updatesTch);
            console.log("Key teacher mới đã được thêm vào trường teacher của khóa học thành công.");
        } catch (error) {
            console.error("Lỗi khi thêm key teacher mới vào trường teacher của khóa học:", error);
        }
    }
    

    document.getElementById('button_search_tch_sc').addEventListener('click', async function() {
        const searchMSKH = document.getElementById('input_search_tch_sc').value.trim();
        const searchDepartment = document.querySelector('.outside_select_department_tch_sc input').value.trim();
        // if (searchMSKH === '') {
        //     alert('Nhập MSGV để tìm kiếm');
        //     return;
        // }
    
        const MSKH = document.querySelector('.header_detail_sc_mskh span').textContent;
        let lastkey = await getCourseKeybyMSKH(MSKH);
    
        // Lấy danh sách các teacher hiện tại của khóa học
        const courseTeacherSnapshot = await get(ref(database, `courses/${lastkey}/teacher`));
        let teachers = courseTeacherSnapshot.val() || {};
    
        document.getElementById('selectTeacherToSc_Body').innerHTML = '';
        if(searchMSKH !== '') {
            get(ref(database, `users/teachers`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
        
                    snapshot.forEach((childSnapshot) => {
                        const teacherData = childSnapshot.val();
                        if (searchMSKH !== '' && teacherData.MSGV === searchMSKH && !teachers.hasOwnProperty(childSnapshot.key)) {
                            const newRow = document.createElement('tr');
        
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td class="MSGV">${teacherData.MSGV}</td>
                                <td>${teacherData.lastname}</td>
                                <td>${teacherData.firstname}</td>
                                <td>${teacherData.department}</td>
                                <td><input type="checkbox" name="selectTTch_Sc"></td>
                            `;
        
                            document.getElementById('selectTeacherToSc_Body').appendChild(newRow);
                            index++;
                        }
                    });
                } else {
                    console.log('Không có giảng viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {
                console.error('Lỗi khi lấy dữ liệu giảng viên:', error);
            });
        }
        else if(searchDepartment!== '' && searchDepartment !== 'Tất cả') {
            get(ref(database, `users/teachers`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
        
                    snapshot.forEach((childSnapshot) => {
                        const teacherData = childSnapshot.val();
                        if (searchDepartment !== '' && teacherData.department == searchDepartment && !teachers.hasOwnProperty(childSnapshot.key)) {
                            const newRow = document.createElement('tr');
        
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td class="MSGV">${teacherData.MSGV}</td>
                                <td>${teacherData.lastname}</td>
                                <td>${teacherData.firstname}</td>
                                <td>${teacherData.department}</td>
                                <td><input type="checkbox" name="selectTTch_Sc"></td>
                            `;
        
                            document.getElementById('selectTeacherToSc_Body').appendChild(newRow);
                            index++;
                        }
                    });
                } else {
                    console.log('Không có giảng viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {
                console.error('Lỗi khi lấy dữ liệu giảng viên:', error);
            });
        }
        else if(searchDepartment == 'Tất cả') {
            get(ref(database, `users/teachers`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1;
        
                    snapshot.forEach((childSnapshot) => {
                        const teacherData = childSnapshot.val();
                        if (!teachers.hasOwnProperty(childSnapshot.key)) {
                            const newRow = document.createElement('tr');
        
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td class="MSGV">${teacherData.MSGV}</td>
                                <td>${teacherData.lastname}</td>
                                <td>${teacherData.firstname}</td>
                                <td>${teacherData.department}</td>
                                <td><input type="checkbox" name="selectTTch_Sc"></td>
                            `;
        
                            document.getElementById('selectTeacherToSc_Body').appendChild(newRow);
                            index++;
                        }
                    });
                } else {
                    console.log('Không có giảng viên trong cơ sở dữ liệu.');
                }
            }).catch((error) => {
                console.error('Lỗi khi lấy dữ liệu giảng viên:', error);
            });
        }
        // Lấy danh sách các giảng viên trong cơ sở dữ liệu
    });

    document.getElementById('edit_sc_mt_Button').addEventListener('click', async function() {
            try {
                const mskh = document.querySelector('.header_detail_sc_mskh span').textContent;
                const userQuery = await query(ref(database, `courses`), orderByChild("MSKH"), equalTo(mskh));
                // alert(userQuery.key);
                const snapshots = await get(userQuery);

                if (snapshots.exists()) {
                    // Xóa đối tượng
                    snapshots.forEach(async (childSnapshot) => {
                        const key = childSnapshot.key;
                        // alert(childSnapshot.key);
                        const snapshot = await get(child(ref(database, `courses`), key));
                        const describe = document.getElementById('detail_text_mt_sc');
                        if(snapshot.exists()) {
                            update(ref(database, `courses/${snapshot.key}`), {
                                describe: describe.value,
                            })
                            .then(() => {
                                alert("Cập nhật thành công");
                                // updateTableCourse();
                            })
                            .catch(() => {
                                alert("Cập nhật thất bại");
                            });
                        };
                    });
                } else {
                    console.log(`Không tìm thấy đối tượng có MSGV ${msgv}`);
                }
            } catch (error) {
                console.error("Lỗi khi tìm và xóa đối tượng:", error);
            }
    });

    async function fdeleteTchToSc(keyMSGV) {
        const MSKH = document.querySelector('.header_detail_sc_mskh span').textContent;
        const keyMSKH = await getCourseKeybyMSKH(MSKH);
        const confirmation = confirm("Bạn có chắc chắn muốn xóa giáo viên này khỏi khóa học?");
        if (confirmation) {
            try {

                await remove(ref(database, `users/teachers/${keyMSGV}/courses/${keyMSKH}`));
                await remove(ref(database, `courses/${keyMSKH}/teacher/${keyMSGV}`));
                updateTeacherHaveSc(keyMSKH);
                console.log("Đã xóa giáo viên khỏi khóa học thành công.");
                alert("Giáo viên đã được xóa khỏi khóa học.");
            } catch (error) {
                console.error("Lỗi khi xóa giáo viên khỏi khóa học:", error);
                alert("Đã xảy ra lỗi khi xóa giáo viên.");
            }
        }
        else {
            alert("Hủy xóa giáo viên khỏi khóa học.");
        }
    };

    async function updateTeacherHaveSc(key) {
        document.getElementById('courseTableBody_Tch').innerHTML = '';
        // Lấy danh sách các teacher hiện tại của khóa học
        const courseTeacherSnapshot = await get(ref(database, `courses/${key}/teacher`));
        let teachers = courseTeacherSnapshot.val() || {};
    
        document.getElementById('selectTeacherToSc_Body').innerHTML = '';
    
        get(ref(database, `users/teachers`)).then((snapshot) => {
            if (snapshot.exists()) {
                let index = 1;
    
                snapshot.forEach((childSnapshot) => {
                    const teacherData = childSnapshot.val();
                    const keyMSGV = childSnapshot.key;
                    if (teachers.hasOwnProperty(childSnapshot.key)) {
                        const newRow = document.createElement('tr');
                        // <td><button>Sửa</button></td>
                        newRow.innerHTML = `
                            <td>${index}</td>
                            <td class="MSGV">${teacherData.MSGV}</td>
                            <td>${teacherData.lastname}</td>
                            <td>${teacherData.firstname}</td>
                            
                            <td class="DeleteTchToSc"><button>Xóa</button></td>
                            <td class="DetailAllSc_std_tch"><button>Xem chi tiết</button></td>
                        `;
    
                        document.getElementById('courseTableBody_Tch').appendChild(newRow);
                        const DeleteTchToSc = newRow.querySelector('.DeleteTchToSc');
                        DeleteTchToSc.onclick = function() {
                            fdeleteTchToSc(keyMSGV);
                        };
                        const DetailAllSc_std_tch = newRow.querySelector('.DetailAllSc_std_tch');
                        DetailAllSc_std_tch.onclick = function() {
                            fdetailAllSc_std_tch(keyMSGV);
                        };
                        index++;
                    }
                });
            } else {
                console.log('Không có giảng viên trong cơ sở dữ liệu.');
            }
        }).catch((error) => {
            console.error('Lỗi khi lấy dữ liệu giảng viên:', error);
        });
    };
    


    document.querySelector('.buttonYesOutline').addEventListener('click', async function() {
    await handleFileUpload('outline', 'upload_outline_sc', 'fileTableOutline');
    });

    document.querySelector('.buttonYesDocument').addEventListener('click', async function() {
        await handleFileUpload('document', 'upload_document_sc', 'fileTableDocument');
    });

    async function handleFileUpload(resourceType, fileInputId, tableBodyId) {
        const fileInput = document.getElementById(fileInputId);
        if (fileInput.files.length === 0) {
            alert("Vui lòng chọn một file để upload");
            return;
        }
        // alert(fileInput.files[0].name);
        const MSKH = document.querySelector('.header_detail_sc_mskh span').textContent;
        const courseKey = await getCourseKeybyMSKH(MSKH);

        if (!courseKey) {
            alert("Không tìm thấy khóa học với MSKH là " + MSKH);
            return;
        }

        try {
            const file = fileInput.files[0];
            const progressElement = document.getElementById('uploadProgress');
            progressElement.style.display = 'block'; 

            const fileUrl = await uploadFileToStorage(file, courseKey, resourceType, progressElement);
            await saveFileUrlToCourse(courseKey, fileUrl, resourceType, file.name);
            alert("File đã được upload và lưu thành công");
            progressElement.style.display = 'none'; 
            displayFileUrls(courseKey, resourceType, tableBodyId);
            // fileInput.files[0] = '';
        } catch (error) {
            console.error("Lỗi khi upload file:", error);
            alert("Đã xảy ra lỗi khi upload file");
        }
    }

    async function uploadFileToStorage(file, courseKey, resourceType, progressElement) {
        const storageRef = sRef(storage, `courses/${courseKey}/${resourceType}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
                (snapshot) => {
                   
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progressElement.textContent = `Upload is ${progress.toFixed(2)}% done`;
                    progressElement.value = progress;
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    try {
                        const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(fileUrl);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    }

    async function saveFileUrlToCourse(courseKey, fileUrl, resourceType, name) {
        const courseResourceRef = ref(database, `courses/${courseKey}/resources/${resourceType}`);
        const newResourceRef = push(courseResourceRef);
        await set(newResourceRef, { url: fileUrl, name: name});
        // fileUrl.split('/').pop()
    }

    async function getFileUrlsOfCourse(courseKey, resourceType) {
        const courseResourceRef = ref(database, `courses/${courseKey}/resources/${resourceType}`);
        const snapshots = await get(courseResourceRef);

        if (snapshots.exists()) {
            const resources = snapshots.val();
            const fileUrls = Object.keys(resources).map(key => ({
                key,
                url: resources[key].url,
                name: resources[key].name
            }));
            return fileUrls;
        } else {
            console.log("Không có tài nguyên nào cho khóa học này.");
            return [];
        }
    }

    async function displayFileUrls(courseKey, resourceType, tableBodyId) {
        const fileUrls = await getFileUrlsOfCourse(courseKey, resourceType);
        
        const fileTable = document.getElementById(tableBodyId);
        fileTable.innerHTML = '';

        fileUrls.forEach((file, index) => {
            const row = document.createElement('tr');

            if (resourceType === 'document') {
                const sttCell = document.createElement('td');
                sttCell.textContent = index + 1;
                row.appendChild(sttCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = file.name; 
                row.appendChild(nameCell);
            }

            const fileCell = document.createElement('td');
            const linkElement = document.createElement('a');
            linkElement.href = file.url;
            linkElement.textContent = "Xem File";
            linkElement.target = '_blank';
            fileCell.appendChild(linkElement);

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Xóa';
            deleteButton.addEventListener('click', () => deleteFile(courseKey, file.key, resourceType, tableBodyId));
            deleteCell.appendChild(deleteButton);

            row.appendChild(fileCell);
            row.appendChild(deleteCell);
            
            fileTable.appendChild(row);
        });
    }

    async function deleteFile(courseKey, fileKey, resourceType, tableBodyId) {
        if (confirm("Bạn có chắc chắn muốn xóa file này?")) {
            try {
                const fileRef = ref(database, `courses/${courseKey}/resources/${resourceType}/${fileKey}`);
                await set(fileRef, null); 
                // alert(fileKey);
                alert("File đã được xóa thành công");
                displayFileUrls(courseKey, resourceType, tableBodyId); 
            } catch (error) {
                console.error("Lỗi khi xóa file:", error);
                alert("Đã xảy ra lỗi khi xóa file");
            }
        }
    }

    document.getElementById("selectAllSc").addEventListener("change", function() {
        document.querySelectorAll("input[name='selectSc']").forEach(selectStd => {
            selectStd.checked = document.getElementById("selectAllSc").checked;
        });
    });
    document.querySelector('.form_delete_select_sc_yes').addEventListener('click', async function() {
        document.querySelector('.modal_delete_select_sc').style.display = 'none';
        const checkboxes = document.querySelectorAll('input[name="selectSc"]');
        let deletePromises = []; // Mảng chứa các promise của các thao tác xóa
        let i = 0;
    
        checkboxes.forEach(checkbox => {  
            if (checkbox.checked) {
                // Lấy phần tử tr cùng hàng với checkbox được chọn
                const row = checkbox.closest('tr');
                if (row) {
                    // Tìm phần tử có class là 'MSSV' trong hàng đó
                    const MSKHElement = row.querySelector('.MSKH');
                    if (MSKHElement) {
                        const MSKH = MSKHElement.textContent;
                        deletePromises.push(deleteUserByMSKH(database, MSKH));
                        i++;
                    } else {
                        console.error("Không tìm thấy MSKH trong hàng này.");
                    }
                } else {
                    console.error("Không tìm thấy hàng chứa checkbox.");
                }
            }
        });
    
        try {
            await Promise.all(deletePromises);
            if(i > 0) {
                alert("Đã xóa " + i + " khóa học.");
            }
            updateTableCourse();
        } catch (error) {
            console.error("Lỗi khi xóa khóa học:", error);
        }
    });
    async function deleteUserByMSKH(database, mskhDelete) {
        try {
            // Tìm đối tượng có MSSV tương ứng
            const userQuery = query(ref(database, `courses`), orderByChild("MSKH"), equalTo(mskhDelete));
            const snapshot = await get(userQuery);

            if (snapshot.exists()) {
                // Xóa đối tượng
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    remove(ref(database, `courses/${key}`))
                        .then(() => {
                            console.log(`Đã xóa đối tượng có MSKH ${mskhDelete}`);
                            // updateTableTeacher();
                        })
                        .catch((error) => {
                            console.error("Lỗi khi xóa đối tượng:", error);
                        });
                });
            } else {
                console.log(`Không tìm thấy đối tượng có MSKH ${mskhDelete}`);
            }
        } catch (error) {
            console.error("Lỗi khi tìm và xóa đối tượng:", error);
        }
    }

    document.querySelector('.search_mskh button').addEventListener('click', function () {
        const mskh = document.querySelector('.edit_content_mskh input').value.trim();
        const name_sc = document.querySelector('.edit_content_name_sc input').value.trim();
        if(mskh == '' && name_sc == '') {
            alert("Vui lòng nhập MSKH hoặc tên khóa học để tìm kiếm.");
            return;
        }
        if(mskh !== '' && name_sc !== '') {
            document.getElementById('courseTableBody').innerHTML = '';
            get(ref(database, `courses`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1; // Biến để đếm số thứ tự
                    snapshot.forEach((childSnapshot) => {
                        const courseData = childSnapshot.val();
                        const keyMSKH = childSnapshot.key;
                        
                        if(mskh == courseData.MSKH && name_sc == courseData.name) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td class="MSKH">${courseData.MSKH}</td>
                                <td>${courseData.name}</td>
                                <td><button class="view-details-btn_course">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectSc"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${keyMSKH}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            courseTableBody.appendChild(newRow);
                                const viewDetailsBtn = newRow.querySelector('.view-details-btn_course');
                                viewDetailsBtn.onclick = function() {
                                    viewDetailsSc(keyMSKH);
                                };
                            // Tăng biến đếm số thứ tự
                            index++;
                        }
                    })
                } else {
                    console.log("Không tìm thấy khóa học nào.");
                };
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu khóa học:", error);
            });
        }
        else if (mskh !== '') {
            document.getElementById('courseTableBody').innerHTML = '';
            get(ref(database, `courses`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1; // Biến để đếm số thứ tự
                    snapshot.forEach((childSnapshot) => {
                        const courseData = childSnapshot.val();
                        const keyMSKH = childSnapshot.key;
                        
                        if(mskh == courseData.MSKH) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td class="MSKH">${courseData.MSKH}</td>
                                <td>${courseData.name}</td>
                                <td><button class="view-details-btn_course">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectSc"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${keyMSKH}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            courseTableBody.appendChild(newRow);
                                const viewDetailsBtn = newRow.querySelector('.view-details-btn_course');
                                viewDetailsBtn.onclick = function() {
                                    viewDetailsSc(keyMSKH);
                                };
                            // Tăng biến đếm số thứ tự
                            index++;
                        }
                    })
                } else {
                    console.log("Không tìm thấy khóa học nào.");
                };
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu khóa học:", error);
            });
        }
        else if(name_sc !== ''){
            document.getElementById('courseTableBody').innerHTML = '';
            get(ref(database, `courses`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let index = 1; // Biến để đếm số thứ tự
                    snapshot.forEach((childSnapshot) => {
                        const courseData = childSnapshot.val();
                        const keyMSKH = childSnapshot.key;
                        
                        if(name_sc == courseData.name) {
                            const newRow = document.createElement('tr');

                            // Thêm dữ liệu của sinh viên vào hàng
                            newRow.innerHTML = `
                                <td>${index}</td>
                                <td class="MSKH">${courseData.MSKH}</td>
                                <td>${courseData.name}</td>
                                <td><button class="view-details-btn_course">Xem chi tiết</button></td>
                                <td><input type="checkbox" name="selectSc"></td>
                            `;
                            // <td><button onclick="viewDetailsStd('${keyMSKH}')">Xem chi tiết</button></td>

                            // Thêm hàng vào bảng
                            courseTableBody.appendChild(newRow);
                                const viewDetailsBtn = newRow.querySelector('.view-details-btn_course');
                                viewDetailsBtn.onclick = function() {
                                    viewDetailsSc(keyMSKH);
                                };
                            // Tăng biến đếm số thứ tự
                            index++;
                        }
                    })
                } else {
                    console.log("Không tìm thấy khóa học nào.");
                };
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu khóa học:", error);
            });
        };
    });

    //Add Student To Sc
    document.getElementById("selectAddAllStd_to_sc").addEventListener("change", function() {
        document.querySelectorAll("input[name='selectAddStd_to_sc']").forEach(selectStd => {
            selectStd.checked = document.getElementById("selectAddAllStd_to_sc").checked;
        });
    });
    document.getElementById("selectAllStd_in_sc").addEventListener("change", function() {
        document.querySelectorAll("input[name='selectStd_in_sc']").forEach(selectStd => {
            selectStd.checked = document.getElementById("selectAllStd_in_sc").checked;
        });
    });
    async function fdetailAllSc_std_tch(key) {
        document.querySelector('.modal_detailAllSc_std_tch').style.display = 'grid';
        const MSKH = document.querySelector('.header_detail_sc_mskh span').textContent;
        const courseKey = await getCourseKeybyMSKH(MSKH);
        tableStd_in_scBody(key);
        document.querySelector('.addSthToSc').addEventListener('click', async function() {
            document.querySelector('.modal_add_std_to_sc').style.display = 'grid';
            await list_to_add_std_to_sc(key);
            document.querySelector('.yesadd_std_to_sc').addEventListener('click', async function() {
                const checkboxes = document.querySelectorAll('input[name="selectAddStd_to_sc"]');
                let addPromises = []; 
                let i = 0;
            
                checkboxes.forEach(checkbox => {  
                    if (checkbox.checked) {
                        const row = checkbox.closest('tr');
                        if (row) {
                            const MSSVElement = row.querySelector('.MSSV');
                            if (MSSVElement) {
                                const MSSV = MSSVElement.textContent;
                                addPromises.push(addStdToCourse(courseKey, MSSV, key));
                                i++;
                            } else {
                                console.error("Không tìm thấy MSSV trong hàng này.");
                            }
                        } else {
                            console.error("Không tìm thấy hàng chứa checkbox.");
                        }
                    }
                });
            
                try {
                    await Promise.all(addPromises);
                    if(i > 0) {
                        alert("Đã thêm " + i + " sinh viên vào khóa học");
                    }
                    // updateTeacherHaveSc(courseKey);
                    // updateTableTeacher_Sc(courseKey);
                    tableStd_in_scBody(key);
                    list_to_add_std_to_sc(key);
                } catch (error) {
                    console.error("Lỗi khi thêm sinh viên:", error);
                }
            });
        });
        document.querySelector('.delSthToSc').addEventListener('click', async function() {
            const checkboxes = document.querySelectorAll('input[name="selectStd_in_sc"]');
            let deletePromises = []; // Mảng chứa các promise của các thao tác xóa
            let i = 0;
        
            checkboxes.forEach(checkbox => {  
                if (checkbox.checked) {
                    // Lấy phần tử tr cùng hàng với checkbox được chọn
                    const row = checkbox.closest('tr');
                    if (row) {
                        // Tìm phần tử có class là 'MSSV' trong hàng đó
                        const MSSVElement = row.querySelector('.MSSV');
                        if (MSSVElement) {
                            const MSSV = MSSVElement.textContent;
                            deletePromises.push(delStdToSc(database, courseKey, MSSV, key));
                            i++;
                        } else {
                            console.error("Không tìm thấy MSSV trong hàng này.");
                        }
                    } else {
                        console.error("Không tìm thấy hàng chứa checkbox.");
                    }
                }
            });
        
            try {
                await Promise.all(deletePromises);
                if(i > 0) {
                    alert("Đã xóa " + i + " sinh viên.");
                }
                tableStd_in_scBody(key);
                // list_to_add_std_to_sc(key);
            } catch (error) {
                console.error("Lỗi khi xóa sinh viên:", error);
            }
        });
    }
    async function delStdToSc(database, courseKey, mssvToDelete, keyMSGV) {
        try {
            const stdKey = await getStudentKeyByMSSV(mssvToDelete);
                // Remove stdKey from courses/${courseKey}/teacher/${keyMSGV}
                await remove(ref(database, `courses/${courseKey}/teacher/${keyMSGV}/${stdKey}`));
                
                // Remove courseKey from users/students/${stdKey}/course
                // await remove(ref(database, `users/students/${stdKey}/course/${courseKey}`));
                
                // Remove stdKey from users/teachers/${keyMSGV}/course/${courseKey}
                // await remove(ref(database, `users/teachers/${keyMSGV}/course/${courseKey}/${stdKey}`));
        } catch (error) {
            console.error("Lỗi khi tìm và xóa đối tượng:", error);
        }
    };
    async function list_to_add_std_to_sc(key) {
        const MSKH = document.querySelector('.header_detail_sc_mskh span').textContent;
        // alert(MSKH);
        let lastkey = await getCourseKeybyMSKH(MSKH);
        document.getElementById('list_to_add_std_to_sc').innerHTML = '';
        const courseTeacherSnapshot = await get(ref(database, `courses/${lastkey}/teacher/${key}`));
        let students = courseTeacherSnapshot.val() || {};
        get(ref(database, `users/students`)).then((snapshot) => {
            if (snapshot.exists()) {
                let index = 1;

                snapshot.forEach((childSnapshot) => {
                    const studentData = childSnapshot.val();
                    // const keyMSSV = childSnapshot.key;
                    if(!students.hasOwnProperty(childSnapshot.key)) {
                        const newRow = document.createElement('tr');
                        // <td><button>Sửa</button></td>
                        newRow.innerHTML = `
                            <td>${index}</td>
                            <td class="MSSV">${studentData.MSSV}</td>
                            <td>${studentData.lastname}</td>
                            <td>${studentData.firstname}</td>
                            
                            <td><input type="checkbox" name="selectAddStd_to_sc" id="selectAddStd_to_sc"></td>
                        `;
                        // Thêm hàng vào bảng
                        document.getElementById('list_to_add_std_to_sc').appendChild(newRow);
                        // Tăng biến đếm số thứ tự
                        index++;
                    }
                })
            }
        })
    };
    
    async function getStudentKeyByMSSV(MSSV) {
        const userQuery = query(ref(database, `users/students`), orderByChild("MSSV"), equalTo(MSSV));
        const snapshots = await get(userQuery);
            
        if (snapshots.exists()) {
            const firstSnapshot = snapshots.val();
            const studentKey = Object.keys(firstSnapshot)[0];
            return studentKey;
        } else {
            console.log("Không tìm thấy khóa học với MSSV là " + MSSV);
        }
    }
    async function addStdToCourse(courseKey, MSSV, keyMSGV) {
        try {
            const stdKey = await getStudentKeyByMSSV(MSSV);
            
            const updates = {};
            updates[`courses/${courseKey}/teacher/${keyMSGV}/${stdKey}`] = true;
            
            await update(ref(database), updates);
            
            const updatesStd = {};
            updatesStd[`users/students/${stdKey}/course/${courseKey}`] = true;

            await update(ref(database), updatesStd);

            const updatesTch = {};
            updatesTch[`users/teachers/${keyMSGV}/course/${courseKey}/${stdKey}`] = true;

            await update(ref(database), updatesTch);

            console.log("Key teacher mới đã được thêm vào trường teacher của khóa học thành công.");
        } catch (error) {
            console.error("Lỗi khi thêm key teacher mới vào trường teacher của khóa học:", error);
        }
    }

    async function tableStd_in_scBody(key) {
        const MSKH = document.querySelector('.header_detail_sc_mskh span').textContent;
        // alert(MSKH);
        let lastkey = await getCourseKeybyMSKH(MSKH);
        document.getElementById('tableStd_in_scBody').innerHTML = '';
        const courseTeacherSnapshot = await get(ref(database, `courses/${lastkey}/teacher/${key}`));
        let students = courseTeacherSnapshot.val() || {};
        get(ref(database, `users/students`)).then((snapshot) => {
            if (snapshot.exists()) {
                let index = 1;

                snapshot.forEach((childSnapshot) => {
                    const studentData = childSnapshot.val();
                    // const keyMSSV = childSnapshot.key;
                    if(students.hasOwnProperty(childSnapshot.key)) {
                        const newRow = document.createElement('tr');
                        // <td><button>Sửa</button></td>
                        newRow.innerHTML = `
                            <td>${index}</td>
                            <td class="MSSV">${studentData.MSSV}</td>
                            <td>${studentData.lastname}</td>
                            <td>${studentData.firstname}</td>
                            <td><button>Xem chi tiết</button></td>
                            <td><input type="checkbox" name="selectStd_in_sc" id="selectStd_in_sc"></td>
                        `;
                        // Thêm hàng vào bảng
                        document.getElementById('tableStd_in_scBody').appendChild(newRow);
                        // Tăng biến đếm số thứ tự
                        index++;
                    }
                })
            }
        })
    };
