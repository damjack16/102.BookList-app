// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    // Method to display books in table
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book))
    }

    // Method to add book to list
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`

        list.appendChild(row);
    }

    // Method to delete book from list
    static deleteBook(element) {
        if (element.classList.contains("delete")) {
            element.parentElement.parentElement.remove();
        }
    }

    // Method to delete all books from list
    static deleteAllBooks() {
        const list = document.querySelector('#book-list');
        list.innerHTML = "";
    }

    // Method to show alert when we add book, remove or dont fill inputs
    static showAlert(message, className) {
        const div = document.createElement("div");
        const form = document.querySelector("#book-form");
        const container = document.querySelector(".container");
        div.appendChild(document.createTextNode(message));
        div.className = `alert alert-${className}`;
        container.insertBefore(div, form);

        // Remove alert after 2.5 seconds 
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2500);
    }

    // Method to clear inputs after add book
    static clearInputs() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

// Store class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeAllBooks() {
        localStorage.clear()
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get inputs values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    const storageBooks = Store.getBooks();
    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill the gaps!", "info");
    }
    // Validate ISBN
    else if (typeof (storageBooks.find(element => {
            return element.isbn === isbn;
        })) !== 'undefined') {
        UI.showAlert("You have book with this ISBN!", "info");
    } else {
        // Instatiate book
        const book = new Book(title, author, isbn);
        // Add book to UI
        UI.addBookToList(book);
        // Add book to local storage
        Store.addBook(book);
        //Show the alert when the book will be added
        UI.showAlert("Book added", "success");
        // Clear inputs value after submit
        UI.clearInputs();
    }
})

// Event: Remove a Book
document.querySelector("#book-list").addEventListener('click', (e) => {
    // Delete the targeted book
    UI.deleteBook(e.target);
    // Delete book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    // Show alert when book will be removed
    UI.showAlert("Book removed", "danger");
})

// Event: Remove all books
document.querySelector(".btn-warning").addEventListener('click', (e) => {

    const list = document.querySelector('#book-list');

    // Validate if we have empty book list
    if (list.childNodes.length > 0) {
        // Show alert when all books will be removed
        UI.showAlert("All books removed", "danger");
        // Delete all books from UI
        UI.deleteAllBooks();
        // Delete all books from local storage
        Store.removeAllBooks();
    } else {
        return
    }
})