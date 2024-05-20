// import { updateTableStudent } from "./firebaseAdmin.js";
let slideIndex = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    slideIndex += n;
    // var offset;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }

    const offset = -100 * slideIndex;
    document.querySelector('.slider-wrapper').style.transform = `translateX(${offset}%)`;
}

// Tự động chuyển slide sau một khoảng thời gian
setInterval(() => {
    moveSlide(1);
}, 3000); // Thay đổi số 5000 để điều chỉnh thời gian chuyển slide (ms)
//  Open Sidebar
function openSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-260px';
        sidebar.style.boxShadow = 'none';
    } else {
        sidebar.style.left = '0';
        sidebar.style.boxShadow = '5px 5px 5px 100vw rgba(0, 0, 0, 0.5)';
    }
 }
//  console.log('OK')
//  Open close submenu
function toggleSubMenu(event) {
    event.preventDefault();
    var submenus = document.querySelectorAll('.submenu');
    submenus.forEach(function(submenu) {
        if (submenu !== event.target.nextElementSibling && submenu.classList.contains('active')) {
            submenu.classList.remove('active');
        }
    });
    var submenu = event.target.nextElementSibling;
    submenu.classList.toggle('active');
}
//  Open Lựa chọn (áp dụng all)
function open_Options (event) {
    var optionDepartment = document.querySelector(event);
    if(optionDepartment.style.display === 'block') {
        optionDepartment.style.display = 'none';
    }
    else {
        optionDepartment.style.display = 'block';
    }
}
//  Nhập vào input các lựa chọn (Áp dụng all) | Dữ liệu lựa chọn | Input | Close
function select_input_student(department, select, close) {
    var input = document.querySelector(select);
    if (input) {
        input.value = department;
    }
    if (close) {
        open_Options(close);
    }
}

function select_input_teacher(department, select, close) {
    var input = document.querySelector(select);
    if (input) {
        input.value = department;
    }
    if (close) {
        open_Options(close);
    }
}


//////////////////////////////////

function showNotInpput(element) {
    alert('Data entry is not allowed');
    select_input_student('', element, '');
}
//  Hiện ngành theo khoa
function showSelect_major(option){
    var input = document.querySelector('.type-select-department_student');
    var select_major = document.querySelectorAll('.select-major');
    for(var i = 0; i < select_major.length - 1; i++) {
            if(select_major[i].style.display == 'none') {
                select_major[i].style.display = 'block';
            }
        }
    if (input.value === 'Tất cả') {
        open_Options (option);
    }
    if(input.value === '') {
        alert('Please select a department');
    }
    if(input.value === 'Trung tâm đào tạo Bảo dưỡng công nghiệp') {                
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 0) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Cơ khí') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 1) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Kỹ thuật Địa chất và Dầu khí') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 2) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Điện - Điện tử') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 3) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Kỹ thuật Giao thông') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 4) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Kỹ thuật Hóa học') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 5) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Môi trường và Tài nguyên') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 6) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Khoa học và Kỹ thuật Máy tính') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 7) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Quản lý Công nghiệp') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 8) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Khoa học Ứng dụng') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 9) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Công nghệ Vật liệu') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 10) {
                select_major[i].style.display = 'none';
            }
        }
    }
    if(input.value === 'Khoa Kỹ thuật Xây dựng') {
        open_Options (option);
        for(var i = 0; i < select_major.length - 1; i++) {
            if(i != 11) {
                select_major[i].style.display = 'none';
            }
        }
    }
}
//  Hiện lớp theo ngành (Vẫn còn phải sửa lại)
function showSelect_class(option) {
    // var input = document.querySelector('.type-select-major');
    // var select_class = document.querySelectorAll('.select-class');
    open_Options(option);
    // if(input.value != 'Ngành Khoa học Máy tính') {
    //     alert('Please select a major');
    // }
    // if(input.value === 'Ngành Khoa học Máy tính') {
    //     open_Options(option);
    // }
}

// Excel 
// Tải xuống từ bảng sang file Excel
function tableToExcel(table, filename = ''){
    var table = document.querySelector(table);
    var wb = XLSX.utils.table_to_book(table);
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});

    saveAs(blob, filename + ".xlsx");
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

// Upload
function handleExcelUpload(event, tableClass) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
        var data = event.target.result;
        var workbook = XLSX.read(data, { type: 'binary' });
        var sheet = workbook.Sheets[workbook.SheetNames[0]];
        var table = XLSX.utils.sheet_to_html(sheet);
            
        document.querySelector(tableClass).innerHTML = table;
    };
        
    reader.readAsBinaryString(file);
}

document.getElementById('upload-input_student').addEventListener('change', function(event) {
    handleExcelUpload(event, '.table-info-student');
});

// Open container
function open_container() {
    var container = document.getElementById('container');
    if(container.style.left != '-100%') {
        container.style.left = '0';
    }
}
//
function open_content(class0, class1, class2, class3) {
    // if(class0 == '.content-student') {updateTableStudent()};
    var content0 = document.querySelector(class0);
    // var content1 = document.querySelector(class1);
    open_container();
    if(content0.style.left != '1%') {
        content0.style.left = '1%';
    }
    exit_content(class1);
    exit_content(class2);
    exit_content(class3);
    openSidebar();
}

function exit_content(clasS) {
    var content_student = document.querySelector(clasS);
    content_student.style.left = '-100%';
}

function open_modal(clasS) {
    var modal = document.querySelector(clasS);
        modal.style.display = 'flex';
}

function close_modal(clasS) {
    var modal = document.querySelector(clasS);
    modal.style.display = 'none';
}
    const modal_std = document.querySelector('.info_student');

    modal_std.addEventListener('click', function(event) {
        event.stopPropagation();
    })

    const modal_std_edit = document.querySelector('.form_info_student');

    modal_std_edit.addEventListener('click', function(event) {
        event.stopPropagation();
    })

// Thông tin sinh viên
// {
    {
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
var MSSV_input = document.querySelector('.background_margin5px.student_MSSV p');
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


var birth_std_p = document.getElementById('birth_std').innerText;

var parts_std = birth_std_p.split('/');
var day_std = parts_std[0];
var month_std = parts_std[1];
var year_std = parts_std[2];

var formattedDate_std = year_std + '-' + month_std + '-' + day_std;
// Thay đổi thông tin
document.getElementById('birth-std').value = formattedDate_std;
    }
// MSSV_input.addEventListener('change', function(event) {
//     MSSV_p.textContent = MSSV_input.value;
// })
// lastname_std_input.addEventListener('change', function(event) {
//     lastname_std_p.textContent = lastname_std_input.value;
// })
// firstname_std_input.addEventListener('change', function(event) {
//     firstname_std_p.textContent = firstname_std_input.value;
// })
// sex_std_input.addEventListener('change', function(event) {
//     sex_std_p.textContent = sex_std_input.value;
// })
// hometown_std_input.addEventListener('change', function(event) {
//     hometown_std_p.textContent = hometown_std_input.value;
// })
// address_std_input.addEventListener('change', function(event) {
//     address_std_p.textContent = address_std_input.value;
// })
// year_std_input.addEventListener('change', function(event) {
//     year_std_p.textContent = year_std_input.value;
// })
// department_std_input.addEventListener('change', function(event) {
//     department_std_p.textContent = department_std_input.value;
// })
// major_std_input.addEventListener('change', function(event) {
//     major_std_p.textContent = major_std_input.value;
// })
// class_std_input.addEventListener('change', function(event) {
//     class_std_p.textContent = class_std_input.value;
// })
// status_std_input.addEventListener('change', function(event) {
//     status_std_p.textContent = status_std_input.value;
// })
// }

// Thông tin giảng viên

// var MSGV_input = document.querySelector('.background_margin5px.teacher_MSGV input');
// var lastname_tch_input = document.querySelector('.background_margin5px.teacher_lastname input');
// var firstname_tch_input = document.querySelector('.background_margin5px.teacher_firstname input');
// var sex_tch_input = document.querySelector('.background_margin5px.teacher_sex input');
// var hometown_tch_input = document.querySelector('.background_margin5px.teacher_hometown input');
// var address_tch_input = document.querySelector('.background_margin5px.teacher_address input');
// var year_tch_input = document.querySelector('.background_margin5px.teacher_year input');
// var department_tch_input = document.querySelector('.background_margin5px.teacher_department input');
// var major_tch_input = document.querySelector('.background_margin5px.teacher_major input');
// var class_tch_input = document.querySelector('.background_margin5px.teacher_class input');
// var status_tch_input = document.querySelector('.background_margin5px.teacher_status input');

// MSGV_input.value = MSGV_p.textContent;
// lastname_tch_input.value = lastname_tch_p.textContent;
// firstname_tch_input.value = firstname_tch_p.textContent;
// sex_tch_input.value = sex_tch_p.textContent;
// hometown_tch_input.value = hometown_tch_p.textContent;
// address_tch_input.value = address_tch_p.textContent;
// department_tch_input.value = department_tch_p.textContent;
// major_tch_input.value = major_tch_p.textContent;
// status_tch_input.value = status_tch_p.textContent;


// var birth_tch_p = document.getElementById('birth_tch').innerText;

// var parts_tch = birth_tch_p.split('/');
// var day_tch = parts_tch[0];
// var month_tch = parts_tch[1];
// var year_tch = parts_tch[2];

// var formattedDate_tch = year_tch + '-' + month_tch + '-' + day_tch;
// // Thay đổi thông tin
// document.getElementById('birth-tch').value = formattedDate_tch;

// 
    const modal_tch = document.querySelector('.info_teacher');

    modal_tch.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    const modal_tch_edit = document.querySelector('.form_info_teacher');

    modal_tch_edit.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    const modal_tch_edit_edit = document.getElementById('edit_form_info_teacher');

    modal_tch_edit_edit.addEventListener('click', function(event) {
        event.stopPropagation();
    });

{
    var selectAllTchCheckbox = document.getElementById('selectAllTch');
    var tch_checkboxes = document.querySelectorAll('tbody input[name="selectTch"]');

    selectAllTchCheckbox.addEventListener('change', function() {
        if (this.checked) {
            tch_checkboxes.forEach(function(checkbox) {
                checkbox.checked = true;
            });
        } else {
            tch_checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
            });
        }
    });

    tch_checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (!this.checked) {
                selectAllTchCheckbox.checked = false;
            }
        });
    });
}

{
    var modal_add_new_sc = document.querySelector('.modal_add_new_sc');

    modal_add_new_sc.addEventListener('click', function() {
        modal_add_new_sc.style.display = 'none';
    });

    var exit_modal_add_new_sc = document.querySelector('.outside_icon_exit_add_new_sc');

    exit_modal_add_new_sc.addEventListener('click', function() {
        modal_add_new_sc.style.display = 'none';
    });

    var form_add_new_sc = document.querySelector('.form_add_new_sc');

    form_add_new_sc.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    var select_add_new_sc_no = document.querySelector('.select_add_new_sc_no');

    select_add_new_sc_no.addEventListener('click', function() {
        modal_add_new_sc.style.display = 'none';
    });

    var edit_add_content_sc = document.querySelector('.edit_add_content_sc button');

    edit_add_content_sc.addEventListener('click', function() {
        modal_add_new_sc.style.display = 'grid';
    });
}

{

    var selectAllScCheckbox = document.getElementById('selectAllSc');
    var sc_checkboxes = document.querySelectorAll('tbody input[name="selectSc"]');

    selectAllScCheckbox.addEventListener('change', function() {
        if (this.checked) {
            sc_checkboxes.forEach(function(checkbox) {
                checkbox.checked = true;
            });
        } else {
            sc_checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
            });
        }
    });

    sc_checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (!this.checked) {
                selectAllScCheckbox.checked = false;
            }
        });
    });

}

{
    var modal_delete_select_sc = document.querySelector('.modal_delete_select_sc');

    modal_delete_select_sc.addEventListener('click', function () {
        modal_delete_select_sc.style.display = 'none';
    });

    var form_delete_select_sc_no = document.querySelector('.form_delete_select_sc_no');

    form_delete_select_sc_no.addEventListener('click', function() {
        modal_delete_select_sc.style.display = 'none';
    });

    var form_delete_select_sc = document.querySelector('.form_delete_select_sc');

    form_delete_select_sc.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    var edit_delete_content_sc = document.querySelector('.edit_delete_content_sc button');

    edit_delete_content_sc.addEventListener('click', function() {
        modal_delete_select_sc.style.display = 'grid';
    })
}

{
    var modal_edit_open_register_sc = document.querySelector('.modal_edit_open_register_sc');

    modal_edit_open_register_sc.addEventListener('click', function() {
        modal_edit_open_register_sc.style.display = 'none';
    });

    var outside_icon_exit_form_register_sc = document.querySelector('.outside_icon_exit_form_register_sc');

    outside_icon_exit_form_register_sc.addEventListener('click', function() {
        modal_edit_open_register_sc.style.display = 'none';
    });

    var form_edit_open_register_sc = document.querySelector('.form_edit_open_register_sc');

    form_edit_open_register_sc.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    var edit_open_register_sc = document.querySelector('.edit_open_register_sc button');

    edit_open_register_sc.addEventListener('click', function() {
        modal_edit_open_register_sc.style.display = 'grid';
    });
}

{
    function autoResize_detail_sc() {
        const textarea = document.getElementById("detail_text_mt_sc");
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    window.addEventListener('load', autoResize_detail_sc);
}

function toggleDocuments() {
    var documents = document.querySelector('.documents');
    var arrow = document.querySelector('.arrow');
    if (documents.style.maxHeight === '0px') { // Kiểm tra trạng thái của maxHeight
        documents.style.maxHeight = '200px'; // Hiển thị tài liệu
        arrow.style.transform = 'rotate(180deg)'; // Quay mũi tên
    } else {
        documents.style.maxHeight = '0px'; // Ẩn tài liệu
        arrow.style.transform = 'rotate(0deg)'; // Đặt lại hướng mũi tên
    }
}


{
    var outside_modal_detail_sc = document.querySelector('.outside_modal_detail_sc');
    var icon_exit_detail_sc = document.querySelector('.icon_exit_detail_sc');

    icon_exit_detail_sc.addEventListener('click', function() {
        outside_modal_detail_sc.style.display = 'none';
    });

    // Dùng để tạm 
        // var icon_detail_sc = document.querySelector('.icon_detail_sc');

        // icon_detail_sc.addEventListener('click', function() {
        // outside_modal_detail_sc.style.display = 'block';
        // });
    //

    var header_detail_sc_image = document.querySelector('.header_detail_sc_image img');
    var header_detail_sc_image_edit = document.querySelector('.header_detail_sc_image_edit');
    var header_detail_sc_exit = document.querySelector('.header_detail_sc_exit');
    header_detail_sc_image.addEventListener('click', function() {
        if(!header_detail_sc_image_edit.style.display || header_detail_sc_image_edit.style.display == 'none') {
            header_detail_sc_image_edit.style.display = 'flex';
            header_detail_sc_exit.style.display = 'flex';
        } 
        else {
            header_detail_sc_image_edit.style.display = 'none';
            header_detail_sc_exit.style.display = 'none';
        }
    });
    header_detail_sc_exit.addEventListener('click', function() {
        if(header_detail_sc_image_edit.style.display == 'none') {
            header_detail_sc_image_edit.style.display = 'flex';
            header_detail_sc_exit.style.display = 'flex';
        } 
        else {
            header_detail_sc_image_edit.style.display = 'none';
            header_detail_sc_exit.style.display = 'none';
        }
    });
}
// Giảng viên phụ trách trong khóa học
{
    // var selectAllTch_ScCheckbox = document.getElementById('selectAllTch_Sc');
    // var tch_sc_checkboxes = document.querySelectorAll('tbody input[name="selectTch_Sc"]');

    // selectAllTch_ScCheckbox.addEventListener('change', function() {
    //     if (this.checked) {
    //         tch_sc_checkboxes.forEach(function(checkbox) {
    //             checkbox.checked = true;
    //         });
    //     } else {
    //         tch_sc_checkboxes.forEach(function(checkbox) {
    //             checkbox.checked = false;
    //         });
    //     }
    // });

    // tch_sc_checkboxes.forEach(function(checkbox) {
    //     checkbox.addEventListener('change', function() {
    //         if (!this.checked) {
    //             selectAllTch_ScCheckbox.checked = false;
    //         }
    //     });
    // });
}

{

    var outside_exit_icon_content_sc = document.querySelector('.outside_exit_icon_content_sc');
    var content_sc = document.querySelector('.content_sc');
    outside_exit_icon_content_sc.addEventListener('click', function() {
        if(content_sc.style.left != '1%') {
            content_sc.style.left = '1%';
        }
        else {
            content_sc.style.left = '-100%';
        }
    });
}

// Upload image_sc
{
    var no_upload_image_sc = document.querySelector('.no_upload_image_sc');
    var modal_detail_sc_image = document.querySelector('.modal_detail_sc_image');
    
    no_upload_image_sc.addEventListener('click', function() {
        modal_detail_sc_image.style.display = 'none';
    });

    var header_detail_sc_image_edit = document.querySelector('.header_detail_sc_image_edit');

    header_detail_sc_image_edit.addEventListener('click', function() {
        modal_detail_sc_image.style.display = 'grid';
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById('image_sc');
    const outsideImage = document.querySelector('.modal_detail_sc_image .outside_image_sc');
    const headerDetailImage = document.querySelector('.header_detail_sc_image');
    const img = headerDetailImage.querySelector('img');

    imageInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgSrc = e.target.result;
                outsideImage.style.backgroundImage = `url(${imgSrc})`;
                img.src = imgSrc;
            };
            reader.readAsDataURL(file);
        }
    });
});

// {
//     const edit_sc_mt_Button = document.getElementById('edit_sc_mt_Button');
//     var detail_text_mt_sc = document.getElementById('detail_text_mt_sc');
//     var old_description = detail_text_mt_sc.value;
//     edit_sc_mt_Button.addEventListener('click', function() {
//         if(detail_text_mt_sc.value == old_description) {
//             alert('Bạn chưa thực hiện bất cứ thay đổi gì');
//         }
//         else {
//             var confirmation = confirm('Bạn có muốn thay đổi mô tả khóa học?');
//             if(confirmation) {
//                 // Bla bla
//                 old_description = detail_text_mt_sc.value;
//             }
//         }
//     });
// }
{
    function select_input_tch_sc(department, select, close) {
        var input = document.querySelector(select);
        if (input) {
            input.value = department;
        }
        if (close) {
            open_Options(close);
        }
    }
}
// Điều chỉnh background cho list_adde_tch_to_sc button
{
    var main_list_add_tch_sc = document.querySelector('.main_list_add_tch_sc');
    var main_list_added_tch_sc = document.querySelector('.main_list_added_tch_sc');
    var list_added_tch_to_sc = document.querySelector('.list_added_tch_to_sc button');
    var list_tch_to_sc = document.querySelector('.list_tch_to_sc button');
    // list_tch_to_sc.addEventListener('click', function() {
    //     list_tch_to_sc.style.background = '#01a3d5';
    //     list_added_tch_to_sc.style.background = '#fff0f0';

    //     main_list_add_tch_sc.style.display = 'block';
    //     main_list_added_tch_sc.style.display = 'none';
    // });
    // list_added_tch_to_sc.addEventListener('click', function() {
    //     list_added_tch_to_sc.style.background = '#01a3d5';
    //     list_tch_to_sc.style.background = '#fff0f0';

    //     main_list_added_tch_sc.style.display = 'block';
    //     main_list_add_tch_sc.style.display = 'none';
    // });

    var modal_add_tch_to_sc = document.querySelector('.modal_add_tch_to_sc');
    var exit_add_tch_to_sc = document.querySelector('.exit_add_tch_to_sc');
    exit_add_tch_to_sc.addEventListener('click', function() {
        modal_add_tch_to_sc.style.display = 'none';
    });

    var detail_sc_teacher_button = document.querySelector('.detail_sc_teacher_button button');
    detail_sc_teacher_button.addEventListener('click', function() {
        modal_add_tch_to_sc.style.display = 'grid';
    });

    modal_add_tch_to_sc.addEventListener('click', function() {
        modal_add_tch_to_sc.style.display = 'none';
    });
    var add_tch_to_sc = document.querySelector('.add_tch_to_sc');
    add_tch_to_sc.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}
// Thoát quản lý khóa học
{
    var icon_exit_detail_sc = document.querySelector('.icon_exit_detail_sc');
    var outside_modal_detail_sc = document.querySelector('.outside_modal_detail_sc');
    icon_exit_detail_sc.addEventListener('click', function() {
        outside_modal_detail_sc.style.display = 'none';
    });   
}

// Thoát thông báo 

{
    var exit_notion_from_admin = document.querySelector('.exit_notion_from_admin');
    var content_notion_from_admin = document.querySelector('.content_notion_from_admin');
    exit_notion_from_admin.addEventListener('click', exit_content('.content_notion_from_admin'));
}

// Thêm một sinh viên

{
    var edit_edit_info_std = document.querySelector('.edit_edit-info_std');
    var edit_outside_form_info_std = document.querySelector('.edit_outside-form-info_std');

    edit_edit_info_std.addEventListener('click', function() {
        // alert('Thêm sinh viên thành công');
    });
}

{


const departmentInput = document.querySelector('.edit_student_department input');
const majorList = document.getElementById('edit_majorList');

// Danh sách các ngành học theo từng khoa
const majorsByDepartment = {
    "Trung tâm đào tạo Bảo dưỡng công nghiệp": ["Ngành Bảo dưỡng Công nghiệp"],
    "Khoa Cơ khí": ["Ngành Kỹ thuật Cơ khí", "Ngành Công nghệ May", "Ngành Kỹ thuật Cơ điện tử", "Ngành Kỹ thuật Dệt", "Ngành Kỹ thuật Hệ thống Công nghiệp", "Ngành Logistics và Quản lý Chuỗi cung ứng", "Ngành Kỹ thuật Nhiệt"],
    "Khoa Kỹ thuật Địa chất và Dầu khí": ["Ngành Kỹ thuật Địa chất", "Ngành Kỹ thuật Dầu khí"],
    "Khoa Điện - Điện tử": [
        "Ngành Kỹ thuật Điều khiển và Tự động hóa",
        "Ngành Kỹ thuật Điện tử - Viễn thông",
        "Ngành Kỹ thuật Điện - Điện tử",
        "Song ngành: Kỹ thuật Điện tử - Viễn thông - Kỹ thuật Điện",
        "Song ngành: Kỹ thuật Điện tử - Viễn thông - Kỹ thuật Điều khiển & Tự động hóa",
        "Song ngành: Kỹ thuật Điện - Kỹ thuật Điện tử - Viễn thông",
        "Song ngành: Kỹ thuật Điện - Kỹ thuật Điều khiển & Tự động hóa",
        "Song ngành: Kỹ thuật Điều khiển & Tự động hóa - Kỹ thuật Điện tử - Viễn thông",
        "Song ngành: Kỹ thuật Điều khiển & Tự động hóa - Kỹ thuật Điện"
    ],
    "Khoa Kỹ thuật Giao thông": [
        "Ngành Kỹ thuật Hàng không",
        "Ngành Kỹ thuật Ô tô",
        "Ngành Kỹ thuật Tàu thủy",
        "Song ngành Kỹ thuật Tàu thủy - Hàng không"
    ],
    "Khoa Kỹ thuật Hóa học": [
        "Ngành Công nghệ Sinh học",
        "Ngành Kỹ thuật Hóa học",
        "Ngành Công nghệ Thực phẩm"
    ],
    "Khoa Môi trường và Tài nguyên": ["Ngành Kỹ thuật Môi trường", "Ngành Quản lý Tài nguyên và Môi trường"],
    "Khoa Khoa học và Kỹ thuật Máy tính": ["Ngành Khoa học Máy tính", "Ngành Kỹ thuật máy tính", "Ngành Công nghệ Thông tin (Đào tạo từ xa)"],
    "Khoa Quản lý Công nghiệp": ["Ngành Quản lý công nghiệp"],
    "Khoa Khoa học Ứng dụng": ["Ngành Cơ Kỹ thuật", "Ngành Vật lý Kỹ thuật"],
    "Khoa Công nghệ Vật liệu": ["Ngành Kỹ thuật Vật liệu"],
    "Khoa Kỹ thuật Xây dựng": [
        "Ngành Kỹ thuật Công trình biển",
        "Ngành Kỹ thuật Cơ sở hạ tầng",
        "Ngành Công nghệ Kỹ thuật Vật liệu Xây dựng",
        "Ngành Kỹ thuật Công trình Xây dựng",
        "Ngành Kiến trúc",
        "Ngành Kỹ thuật Trắc địa - Bản đồ",
        "Ngành Kỹ thuật Công trình Thủy",
        "Ngành Kỹ thuật Xây dựng Công trình Giao thông"
    ],
    // Thêm các khoa và ngành học tương ứng tại đây
};

// Lắng nghe sự kiện khi người dùng thay đổi khoa
if (departmentInput) {
    departmentInput.addEventListener('click', function () {
        let selectedDepartment = departmentInput.value;
        // Xóa danh sách ngành học hiện tại
        majorList.innerHTML = "";
        if (majorsByDepartment[selectedDepartment]) {
            majorsByDepartment[selectedDepartment].forEach(major => {
                let option = document.createElement('option');
                option.value = major;
                majorList.appendChild(option);
            });
        } else {
            console.log("Không tìm thấy ngành học cho khoa này");
        }
    });
} else {
    console.log("Phần tử 'departmentInput' không tồn tại");
}

    // Lắng nghe sự kiện khi người dùng chọn ngành học
    // majorInput.addEventListener('input', function () {
    //     // Bạn có thể thêm bất kỳ xử lý nào khác tại đây nếu cần
    // });
}

{
    const departmentInputEdit = document.querySelector('.student_department input');
    const majorList = document.getElementById('majorList');
    var creat_majorList = document.querySelector('.student_major input');
    var select_majorList = document.querySelector('.background_margin5px.edit_student_major');
    // Danh sách các ngành học theo từng khoa
    const majorsByDepartment = {
        "Trung tâm đào tạo Bảo dưỡng công nghiệp": ["Ngành Bảo dưỡng Công nghiệp"],
        "Khoa Cơ khí": ["Ngành Kỹ thuật Cơ khí", "Ngành Công nghệ May", "Ngành Kỹ thuật Cơ điện tử", "Ngành Kỹ thuật Dệt", "Ngành Kỹ thuật Hệ thống Công nghiệp", "Ngành Logistics và Quản lý Chuỗi cung ứng", "Ngành Kỹ thuật Nhiệt"],
        "Khoa Kỹ thuật Địa chất và Dầu khí": ["Ngành Kỹ thuật Địa chất", "Ngành Kỹ thuật Dầu khí"],
        "Khoa Điện - Điện tử": [
            "Ngành Kỹ thuật Điều khiển và Tự động hóa",
            "Ngành Kỹ thuật Điện tử - Viễn thông",
            "Ngành Kỹ thuật Điện - Điện tử",
            "Song ngành: Kỹ thuật Điện tử - Viễn thông - Kỹ thuật Điện",
            "Song ngành: Kỹ thuật Điện tử - Viễn thông - Kỹ thuật Điều khiển & Tự động hóa",
            "Song ngành: Kỹ thuật Điện - Kỹ thuật Điện tử - Viễn thông",
            "Song ngành: Kỹ thuật Điện - Kỹ thuật Điều khiển & Tự động hóa",
            "Song ngành: Kỹ thuật Điều khiển & Tự động hóa - Kỹ thuật Điện tử - Viễn thông",
            "Song ngành: Kỹ thuật Điều khiển & Tự động hóa - Kỹ thuật Điện"
        ],
        "Khoa Kỹ thuật Giao thông": [
            "Ngành Kỹ thuật Hàng không",
            "Ngành Kỹ thuật Ô tô",
            "Ngành Kỹ thuật Tàu thủy",
            "Song ngành Kỹ thuật Tàu thủy - Hàng không"
        ],
        "Khoa Kỹ thuật Hóa học": [
            "Ngành Công nghệ Sinh học",
            "Ngành Kỹ thuật Hóa học",
            "Ngành Công nghệ Thực phẩm"
        ],
        "Khoa Môi trường và Tài nguyên": ["Ngành Kỹ thuật Môi trường", "Ngành Quản lý Tài nguyên và Môi trường"],
        "Khoa Khoa học và Kỹ thuật Máy tính": ["Ngành Khoa học Máy tính", "Ngành Kỹ thuật máy tính", "Ngành Công nghệ Thông tin (Đào tạo từ xa)"],
        "Khoa Quản lý Công nghiệp": ["Ngành Quản lý công nghiệp"],
        "Khoa Khoa học Ứng dụng": ["Ngành Cơ Kỹ thuật", "Ngành Vật lý Kỹ thuật"],
        "Khoa Công nghệ Vật liệu": ["Ngành Kỹ thuật Vật liệu"],
        "Khoa Kỹ thuật Xây dựng": [
            "Ngành Kỹ thuật Công trình biển",
            "Ngành Kỹ thuật Cơ sở hạ tầng",
            "Ngành Công nghệ Kỹ thuật Vật liệu Xây dựng",
            "Ngành Kỹ thuật Công trình Xây dựng",
            "Ngành Kiến trúc",
            "Ngành Kỹ thuật Trắc địa - Bản đồ",
            "Ngành Kỹ thuật Công trình Thủy",
            "Ngành Kỹ thuật Xây dựng Công trình Giao thông"
        ],
        // Thêm các khoa và ngành học tương ứng tại đây
    };
    // Lắng nghe sự kiện khi người dùng thay đổi khoa
    if (departmentInputEdit) {
        departmentInputEdit.addEventListener('click', function () {
            let selectedDepartment = departmentInputEdit.value;
            // Xóa danh sách ngành học hiện tại
            creat_majorList.value = "";
            majorList.innerHTML = "";
            if (majorsByDepartment[selectedDepartment]) {
                majorsByDepartment[selectedDepartment].forEach(major => {
                    let option = document.createElement('option');
                    option.value = major;
                    majorList.appendChild(option);
                });
            } else {
                console.log("Không tìm thấy ngành học cho khoa này");
            }
        });
    } else {
        console.log("Phần tử 'departmentInput' không tồn tại");
    }
    // select_majorList.addEventListener('click', function () {
    //     let selectedDepartment = departmentInputEdit.value;
    //     // Xóa danh sách ngành học hiện tại
    //     alert(selectedDepartment);
    //     majorList.innerHTML = "";
    //     if (majorsByDepartment[selectedDepartment]) {
    //         majorsByDepartment[selectedDepartment].forEach(major => {
    //             let option = document.createElement('option');
    //             option.value = major;
    //             majorList.appendChild(option);
    //         });
    //     } else {
    //         console.log("Không tìm thấy ngành học cho khoa này");
    //     }
    // });
    }
    function checkInput(input) {
        var validOptions = Array.from(input.list.options).map(option => option.value);
        var inputValue = input.value;
        
        if (!validOptions.includes(inputValue)) {
        input.value = ''; // Xóa giá trị nếu không hợp lệ
        alert("Không được phép");
        }
    }

    document.getElementById('logout').addEventListener('click', function() {
        openSidebar();
        window.location.href = "../Login/index.html";
    })
    document.querySelector('.exit_deltail_sc_std_tch').addEventListener('click', function() {
        document.querySelector('.modal_detailAllSc_std_tch').style.display = 'none';
    });
    document.querySelector('.exit_add_sc_std_tch').addEventListener('click', function() {
        document.querySelector('.modal_add_std_to_sc').style.display = 'none';
    });