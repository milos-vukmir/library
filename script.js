const myLibrary = [];
const library = document.querySelector(".library");
const dialog = document.querySelector("dialog");
const add_book = document.querySelector(".add-book");
const close_btn = document.querySelector(".close-btn");
const add_new_book = document.querySelector(".add-new-book");

class Book {
  constructor(name, author, year, id, readStatus) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.id = id;
    this.readStatus = readStatus;
  }
}

Book.prototype.read = function () {
  if (this.readStatus === false) {
    this.readStatus = true;
  } else {
    this.readStatus = false;
  }
};

//Dodaje knjigu u niz tj. biblioteku
function addBookToLibrary(book) {
  myLibrary.push(book);
}

//Otvara dialog box za unos nove knjige
add_book.addEventListener("click", () => {
  dialog.showModal();
  document.querySelector("#book-name").focus();
});

//Zatvara dialog box
close_btn.addEventListener("click", () => {
  dialog.close();
});

//Dodaje knjigu u karticu na stranici
add_new_book.addEventListener("click", (event) => {
  const name = document.querySelector("#book-name");
  const author = document.querySelector("#book-author");
  const year = document.querySelector("#book-release");

  let book = new Book(
    name.value,
    author.value,
    year.value,
    crypto.randomUUID(),
    false
  );

  addBookToLibrary(book);

  //Dodavanje knjige u kartici na ekranu
  let bookDisplay = document.createElement("div");
  bookDisplay.classList = "book-card";

  library.appendChild(bookDisplay);
  bookDisplay.innerHTML = `<p>Knjiga: <span>${book.name}</span></p>
                            <p>Autor:<span>${book.author}</span>  </p>
                            <p>Godina:<span> ${book.year}</span> </p>`;

  //Status citanja knjige - procitano / neprocitano
  let changeReadStatus = document.createElement("button");
  changeReadStatus.innerHTML = "Procitano";
  changeReadStatus.classList = "read-status-btn";
  bookDisplay.appendChild(changeReadStatus);

  changeReadStatus.addEventListener("click", () => {
    bookDisplay.dataset.id = book.id;

    const bookStatus = myLibrary.find(
      (book) => book.id === bookDisplay.dataset.id
    );
    bookStatus.read();

    if (bookStatus.readStatus === false) {
      changeReadStatus.style.backgroundColor = "#FF605C";
      changeReadStatus.innerHTML = "Nije procitano";
    } else {
      changeReadStatus.style.backgroundColor = "#00CA4E";
      changeReadStatus.innerHTML = "Procitano";
    }
  });

  //Dugme za brisanje knjiga i iz niza i iz DOM-a
  bookDisplay.dataset.id = book.id;
  let removeBook = document.createElement("button");
  removeBook.classList = "remove-book-btn";
  removeBook.innerHTML = "Obrisi knjigu";
  bookDisplay.appendChild(removeBook);

  removeBook.addEventListener("click", () => {
    const index = myLibrary.findIndex(
      (book) => book.id === bookDisplay.dataset.id
    );

    if (index !== -1) {
      myLibrary.splice(index, 1);
      library.removeChild(bookDisplay);
    }
  });

  dialog.close();
  name.value = "";
  author.value = "";
  year.value = "";
  event.preventDefault();
});
