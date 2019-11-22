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
        const StoredBooks = [{
            title: 'Book One',
            author: 'John Doe',
            isbn: '334343'
        }];

        const books = StoredBooks;

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
    // Method to show alert when we add book, remove or dont fill inputs
    static showAlert() {

    }
    // Method to clear inputs after add book
    static clearInputs() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
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

    // Instatiate book
    const book = new Book(title, author, isbn);

    //Validate and add Book to UI
    if (title === "" || author === "" || isbn === "") {
        return
    } else {
        UI.addBookToList(book);
    }

    // Clear inputs value after submit
    UI.clearInputs();
})

// Event: Remove a Book
document.querySelector("#book-list").addEventListener('click', (e) => UI.deleteBook(e.target))