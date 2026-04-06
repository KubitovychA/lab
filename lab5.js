class Author {
    constructor(name, birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    }

    getInfo() {
        return `Ім'я: ${this.name}, Рік народження: ${this.birthYear}`;
    }
}

class Book {
    constructor(title, author, year, annotation = "") {
        this.title = title;
        this.author = author; // посилання на Author
        this.year = year;
        this.annotation = annotation;
    }

    getInfo() {
        let info = `Назва: ${this.title}, Рік видання: ${this.year}, Автор: ${this.author ? this.author.name : "Невідомий"}`;
        
        if (this.annotation) {
            info += `\n${this.annotation}`;
        }

        return info;
    }
}

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        // перевірка на дублювання
        const exists = this.books.some(
            b => b.title === book.title && b.author.name === book.author.name
        );

        if (!exists) {
            this.books.push(book);
        } else {
            console.log("Така книга вже існує!");
        }
    }

    listBooks() {
        return this.books.map(book => book.getInfo()).join("\n\n");
    }

    findBooksByAuthor(authorName) {
        return this.books
            .filter(book => book.author.name === authorName)
            .map(book => book.getInfo())
            .join("\n\n");
    }

    findBooksByYear(year) {
        return this.books
            .filter(book => book.year === year)
            .map(book => book.getInfo())
            .join("\n\n");
    }

    findBooksByTitle(keyword) {
        return this.books
            .filter(book => book.title.toLowerCase().includes(keyword.toLowerCase()))
            .map(book => book.getInfo())
            .join("\n\n");
    }

    removeBook(title) {
        this.books = this.books.filter(book => book.title !== title);
    }
}

class Reader {
    constructor(name) {
        this.name = name;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        this.borrowedBooks.push(book);
    }

    listBorrowedBooks() {
        return this.borrowedBooks.map(b => b.title).join(", ");
    }
}



const author1 = new Author("Тарас Шевченко", 1814);
const author2 = new Author("Іван Франко", 1856);

const book1 = new Book("Кобзар", author1, 1840, "Збірка поезій");
const book2 = new Book("Захар Беркут", author2, 1883);
const book3 = new Book("Іван Підкова", author1, 1839);

const library = new Library("Моя бібліотека");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

library.addBook(book1);

console.log("=== Всі книги ===");
console.log(library.listBooks());

console.log("\n=== Книги Шевченка ===");
console.log(library.findBooksByAuthor("Тарас Шевченко"));

console.log("\n=== Книги 1840 року ===");
console.log(library.findBooksByYear(1840));

console.log("\n=== Пошук 'Іван' ===");
console.log(library.findBooksByTitle("Іван"));

library.removeBook("Кобзар");

console.log("\n=== Після видалення ===");
console.log(library.listBooks());

const reader = new Reader("Олег");
reader.borrowBook(book2);

console.log("\n=== Читач взяв ===");
console.log(reader.listBorrowedBooks());
