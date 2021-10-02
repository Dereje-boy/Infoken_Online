console.log("admin is loaded successfully")
document.querySelector("title").innerHTML = 'Admin Dashboard'

let student;

const studentsButton = document.querySelector(".students-button");
const booksButton = document.querySelector(".books-button");
const rentsButton = document.querySelector(".rents-button");
const adminsButton = document.querySelector(".admins-button");
const searchBar = document.querySelector(".search-bar");
const returnButton = document.querySelector(".return-button");
const deleteStudent = document.querySelector(".delete-student input[type=button]");
const editModeButton = document.querySelector(".edit-mode-button");
const deleteStudentButton = document.querySelector(".delete-student-button");
const updateStudentButton = document.querySelector(".update-student-button");

const firstname = document.querySelector(".firstname input[type=text]")
const lastname = document.querySelector(".lastname input[type=text]")
const studentID = document.querySelector(".studentID input[type=text]")
const department = document.querySelector(".department input[type=text]")
const gender = document.querySelector(".gender input[type=text]")
const dorm = document.querySelector(".dorm input[type=text]")

const table = document.querySelector(".table");

table.addEventListener('click', tableEventListener)
const databases = document.querySelector(".databases");
const databasesContainer = document.querySelector(".databases-container");

databases.addEventListener('click', () => {
    retrieveBooks();
    // if (databasesContainer.style.display.toLowerCase() === "flex") {
    //     databasesContainer.style.display = "none";
    //     databases.innerHTML = "Show Databases";
    // } else {
    //     databasesContainer.style.display = "flex";
    //     databases.innerHTML = "Hide Databases";
    // }
})
studentsButton.addEventListener('click', () => {
    console.log("changing views....")
    databases.innerHTML = "Students"
    databasesContainer.style.display = "none"
    searchBar.placeholder = 'search students....'
})
booksButton.addEventListener('click', () => {
    console.log("changing views....")
    databases.innerHTML = "Books"
    databasesContainer.style.display = "none"
    searchBar.placeholder = 'search books....'
    retrieveBooks();
})
rentsButton.addEventListener('click', () => {
    console.log("changing views....")
    databases.innerHTML = "Rents"
    databasesContainer.style.display = "none"
    searchBar.placeholder = 'search rents....'
})
adminsButton.addEventListener('click', () => {
    console.log("changing views....")
    databases.innerHTML = "Admins"
    databasesContainer.style.display = "none"
    searchBar.placeholder = 'search admins....'
})
returnButton.addEventListener("click", () => {
    returnButtonEventListener()
})
deleteStudent.addEventListener('click', () => {
    console.log("welcome.....")
})
deleteStudentButton.addEventListener('click', () => {
    console.log('fetching delete student');
    deleteStudentEventListener(student);
})
editModeButton.addEventListener("click", () => {
    editModeEventListener();
})
updateStudentButton.addEventListener("click", () => {
    updateStudentEventListener(student);
})

async function updateStudentEventListener(student) {
    if (!editMode) return;
    // console.log("updating student...");

    student.newFirstname = firstname.value;
    student.newLastname = lastname.value;
    student.newStudentID = studentID.value;
    student.newDepartment = department.value;
    student.newGender = gender.value;
    student.newDorm = dorm.value;

    // console.log(student)

    let response = await fetch("../students/update", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(student)
    });
    console.log(await response.json())

}

let editMode = false;

function editModeEventListener() {
    if (!editMode) {//editing allowed
        firstname.readOnly = false;
        lastname.readOnly = false;
        studentID.readOnly = false;
        department.readOnly = false;
        gender.readOnly = false;
        dorm.readOnly = false;
        editMode = true;
        editModeButton.innerHTML = "Edit Mode is ON"
        editModeButton.style.backgroundColor = "blue";
        editModeButton.style.color = "white";
        updateStudentButton.disabled = false;
    } else {//editing not allowed or readonly
        firstname.readOnly = true;
        lastname.readOnly = true;
        studentID.readOnly = true;
        department.readOnly = true;
        gender.readOnly = true;
        dorm.readOnly = true;
        editMode = false;
        editModeButton.innerHTML = "Edit Mode is OFF"
        editModeButton.style.backgroundColor = "gray";
        editModeButton.style.color = "black";
        updateStudentButton.disabled = true;
    }

    console.log("changing mode....")
}

function returnButtonEventListener() {
    console.log("returning books....");
    const table = document.querySelector(".table");
    const tr = document.createElement("tr");

    const id = document.createElement("td");
    const firstname = document.createElement("td");
    const lastname = document.createElement("td");
    const studentid = document.createElement("td");
    const department = document.createElement("td");
    const gender = document.createElement("td");
    const password = document.createElement("td");
    const check = document.createElement("Button");

    id.innerText = "6138d33573c3a84e10cc68bc";
    firstname.innerText = "Eskedar";
    lastname.innerText = "Wakuma";
    studentid.innerText = "EskadarWakuma@gmail.com";
    department.innerText = "Urban Planning";
    gender.innerText = "Male";
    password.innerText = "eskadar@chickLover";
    check.innerText = "show detail";

    tr.insertAdjacentElement("beforeend", id)
    tr.insertAdjacentElement("beforeend", firstname)
    tr.insertAdjacentElement("beforeend", lastname)
    tr.insertAdjacentElement("beforeend", studentid)
    tr.insertAdjacentElement("beforeend", department)
    tr.insertAdjacentElement("beforeend", gender)
    tr.insertAdjacentElement("beforeend", password)
    tr.insertAdjacentElement("beforeend", check)
    table.insertAdjacentElement("beforeend", tr)

}

function tableEventListener(e) {
    // console.log("the table is clicked")
    // console.log(e.path)
    let length = e.path[1].children.length;
    let row = e.path[1].children;
    if (length > 1) {
        fillPreview(row);
        e.path[1].children[0].style.backgroundColor = "black;";
    }
}
let before;

function fillPreview(row) {
    if (row[1].innerHTML.toLowerCase() == "first name") {
        erasePreview();
        if (before !== undefined)
            for (let i=0; i<before.length; i++){
                before[i].style.backgroundColor="white";
            }
        return;
    }
    if (before !== undefined)
    for (let i=0; i<before.length; i++){
        before[i].style.backgroundColor="white";
    }

    firstname.value = row[1].innerHTML
    lastname.value = row[2].innerHTML
    studentID.value = row[3].innerHTML
    department.value = row[4].innerHTML
    gender.value = row[5].innerHTML
    dorm.value = row[6].innerHTML;
    student = {
        _id: row[0].innerHTML,
        firstname: row[1].innerHTML,
        lastname: row[2].innerHTML,
        studentID: row[3].innerHTML,
        department: row[4].innerHTML,
        gender: row[5].innerHTML,
        dorm: row[6].innerHTML
    }

    //showing the selected item
    for (let i=0; i<row.length; i++){
        row[i].style.backgroundColor="#00ea27";
    }
    before = row;
    // console.log("data is filled out....")
}

function erasePreview() {
    firstname.value = ""
    lastname.value = ""
    studentID.value = ""
    department.value = ""
    gender.value = ""
    dorm.value = ""
}

async function deleteStudentEventListener(student) {
    let response = await fetch("students/delete", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            firstname: student.firstname,
            lastname: student.lastname,
            studentID: student.studentID,
            department: student.department,
            gender: student.gender,
            dorm: student.dorm
        })
    })
    if (response.status != 200) {
        console.log("problem with your network....")
        return;
    }
    let value = await response.json();
    if (value.acknowledged) {
        if (value.deletedCount > 0) {
            console.log(value.deletedCount + " students deleted")
        } else {
            console.log("no matching student found....")
            console.log("unable to delete the student.")
        }
    } else {
        console.log("problem with the database.....")
    }
}

// retrieveBooks();