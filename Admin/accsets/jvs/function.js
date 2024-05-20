// Chuyển string thành Date
export function convertToDateInput(dateString) {
    var parts = dateString.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    var date = new Date(year, month - 1, day + 1);

    var formattedDate = date.toISOString().split('T')[0];

    return formattedDate;
}

export function close_modal(clasS) {
    var modal = document.querySelector(clasS);
    modal.style.display = 'none';
}

export function openSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-260px';
        sidebar.style.boxShadow = 'none';
    } else {
        sidebar.style.left = '0';
        sidebar.style.boxShadow = '5px 5px 5px 100vw rgba(0, 0, 0, 0.5)';
    }
 }

 export function open_container() {
    var container = document.getElementById('container');
    if(container.style.left != '-100%') {
        container.style.left = '0';
    }
}
//
export function open_content(class0, class1, class2, class3) {
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