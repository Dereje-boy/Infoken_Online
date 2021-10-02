console.log("admin table is loaded successfully")


const bookTable = document.querySelector(".book-table");
const adminTable = document.querySelector(".admin-table");
const rentTable = document.querySelector(".rent-table");

const infoFirstname = document.querySelector(".firstname");
const infoLastname = document.querySelector(".lastname");
const infoStudentID = document.querySelector(".studentID");
const infoDepartment = document.querySelector(".department");
const infoGender = document.querySelector(".gender");
const infoDorm = document.querySelector(".dorm");
console.log(infoFirstname);


async function retrieveBooks() {
    const response = await fetch("../books/all",{
        method:"get",
    });
    const json_response = await response.json();
    // console.log(json_response);

    let tbody = table.children[0];//container for all tr/s
    let tr_1 = tbody.children[1];//column headers or fields=th

    // for (let i = 0; i<tbody.children.length; i++){
    //     let allrow = tbody.children[i];
    //     console.log(tbody.children[i].children[1].innerHTML)
    // }

    // console.log(tbody.children.length)
    // let i=0;
    // for (i=0; i<tbody.children.length; i++){
    //     console.log(tbody.children[i])
    //     tbody.children[i].remove();
    // }
    // console.log(tbody.remove())

    // console.log(table);

    setupRentTable(json_response);
}

// retrieveBooks();

function setupRentTable(books) {
    table.style.display = "none";
    bookTable.style.display = "block";

    console.log(bookTable);
    books.forEach(book=>console.log(book.title))

    //removing the table's body;
    console.log(bookTable)
    bookTable.children[0].remove();
    let tableBody = document.createElement("tbody");

    const rentColumnsString = ["No.","Title","Category","Quantity","Author","RegistrarID"];
    //attaching columns with their corresponding name
    for (let i=0; i<rentColumnsString.length; i++){
       let theColumn = document.createElement("th");
        theColumn.innerHTML = rentColumnsString[i];
        tableBody.append(theColumn);
    }

    for (let i=0; i<books.length; i++){
        let tr = document.createElement("tr");//one row for this book[i]

        let no = document.createElement('td');//one td for each info about single book
        let title = document.createElement("td");
        let category = document.createElement("td");
        let quantity = document.createElement("td");
        let author = document.createElement("td");
        let registrarid = document.createElement("td");

        no.innerHTML = books[i]._id;
        title.innerHTML = books[i].title;
        category.innerHTML = books[i].category;
        quantity.innerHTML = books[i].quantity;
        author.innerHTML = books[i].author;
        registrarid.innerHTML = books[i].registrarID == undefined ? "not found" : books[i].registrarID;

        tr.append(no,title,category,quantity,author,registrarid);
        tableBody.append(tr)
    }

    bookTable.append(tableBody);

    setupInfoBox("rent")

}

function setupInfoBox(render) {
    if (render.toLowerCase() == "rent"){
        infoFirstname.style.display = "none";
        infoLastname.style.display = "none";
        infoStudentID.style.display = "none";
        infoDepartment.style.display = "none";
        infoGender.style.display = "none";
        infoDorm.style.display = "none";
    }
}