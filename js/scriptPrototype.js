console.log("Welcome to project 2 prototype");
let tableBody = document.getElementById("tableBody");
showData();

// Function to check local storage
function checkLocalStorage() {
  let books = localStorage.getItem("books");
  if (books == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(books);
  }
}

// Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display Constructor
function Display() {}

// Add method to displary prototype
Display.prototype.add = function (book) {
  let uiString = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>`;
  tableBody.innerHTML += uiString;
};

// Implement the clear function
Display.prototype.clear = function () {
  document.getElementById("libraryForm").reset();
};

// Implement the validate function
Display.prototype.validate = function (book) {
  if (book.name.length > 2 || book.author.length > 2) {
    return true;
  } else return false;
};

// Implement the show function
Display.prototype.show = function (alert, displayMessage) {
    let submitMessage = document.getElementById("submitMessage")
    submitMessage.innerHTML = `<div class="alert alert-${alert} alert-dismissible fade show" role="alert">
                                                            <strong>Message:</strong> ${displayMessage}
                                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>`
    setTimeout(() => {
        submitMessage.innerHTML = ``;
    }, 5000)
};


// If user add a book, add in the local storage
document
.getElementById("libraryForm")
.addEventListener("submit", libraryFormSubmit);

// Add submit event listener to libraryForm
function libraryFormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
  let literature = document.getElementById("literature");
  let programming = document.getElementById("programming");
  let history = document.getElementById("history");
  let type;
  if (literature.checked) {
    type = literature.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (history.checked) {
    type = history.value;
  }
  let book = new Book(name, author, type);
  let display = new Display();

  checkLocalStorage();
  if (display.validate(book)) {
    let myObj = {
      bookTitle: name,
      bookAuthor: author,
      bookType: type
    };
      booksObj.push(myObj);
    localStorage.setItem("books", JSON.stringify(booksObj));
    console.log(booksObj)
    // display.add(book);
    showData();
    display.clear();
    display.show("success", "Your book has been successfully added");
  } else {
    display.show("danger", "Sorry you cannot be add your book");
  }
}

// Function to show data
function showData(){
  checkLocalStorage();
  let html = "";
  booksObj.forEach((element, index) => {
    html += `<tr class="showContent">
              <th scope="row">${index + 1}</th>
              <td>${element.bookTitle}</td>
              <td class="searchTitle">${element.bookAuthor}</td>
              <td>${element.bookType}</td>
              <td><a id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</a></td>
            </tr>`;
    if (booksObj.length != 0) {
      tableBody.innerHTML = html;
    } else {
      tableBody.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
  });
}

// Function to delete a note
function deleteNote(index) {
  checkLocalStorage();
  booksObj.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(booksObj));
  showData();
}

// Function to search note
document.getElementById("search").addEventListener("click", e => e.preventDefault());

document.getElementById("input").addEventListener("input", ()=>{
  let inputVal = input.value.toLowerCase();
  Array.from(document.getElementsByClassName("showContent")).forEach(element => {
    let text = element.getElementsByClassName("searchTitle")[0].innerText;
    if(text.includes(inputVal)){
      element.style.display = "block";
    }else{
      element.style.display = "none";
    }
  });
})
