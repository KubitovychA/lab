class Author {
    constructor(firstName, lastName, birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.books = new Set();
    }

    addBook(book) {
        this.books.add(book);
    }
}

class Rating {
    constructor() {
        this.reviews = [];
    }

    addReview(user, score, comment) {
        this.reviews.push({ user, score, comment });
    }

    getAverage() {
        if (this.reviews.length === 0) return 0;
        return this.reviews.reduce((sum, r) => sum + r.score, 0) / this.reviews.length;
    }
}

class LibraryItem {
    constructor(title, year) {
        this.title = title;
        this.year = year;
        this.rating = new Rating();
    }

    getInfo() {
        return `${this.title} (${this.year})`;
    }
}

class Book extends LibraryItem {
    constructor(title, author, year) {
        super(title, year);
        this.author = author;
        author.addBook(this);
    }

    getInfo() {
        return `${this.title} - ${this.author.firstName} ${this.author.lastName}`;
    }
}

class EBook extends Book {
    constructor(title, author, year, format, size) {
        super(title, author, year);
        this.format = format;
        this.size = size;
    }

    getInfo() {
        return `${super.getInfo()} [${this.format}, ${this.size}MB]`;
    }
}

class DVD extends LibraryItem {
    constructor(title, year, format) {
        super(title, year);
        this.format = format;
    }
}

class AudioBook extends LibraryItem {
    constructor(title, year, duration) {
        super(title, year);
        this.duration = duration;
    }
}

class Magazine extends LibraryItem {
    constructor(title, year, issueNumber) {
        super(title, year);
        this.issueNumber = issueNumber;
    }
}

class Newspaper extends LibraryItem {
    constructor(title, year, issueNumber) {
        super(title, year);
        this.issueNumber = issueNumber;
    }
}

class Section {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }
}

class Library {
    constructor(name, address, foundedYear) {
        this.name = name;
        this.address = address;
        this.foundedYear = foundedYear;
        this.sections = [];
    }

    addSection(section) {
        this.sections.push(section);
    }

    removeSection(section) {
        this.sections = this.sections.filter(s => s !== section);
    }
}

class Reader {
    constructor(name) {
        this.name = name;
    }

    getLimit() {
        throw new Error("Not implemented");
    }
}

class Student extends Reader {
    getLimit() {
        return 10;
    }
}

class Worker extends Reader {
    getLimit() {
        return 7;
    }
}

class Guest extends Reader {
    getLimit() {
        return 3;
    }
}

const library = new Library("Central Library", "Main St", 1990);

const fiction = new Section("Fiction");
library.addSection(fiction);

const author = new Author("George", "Orwell", "1903-06-25");

const book = new Book("1984", author, 1949);
const ebook = new EBook("Animal Farm", author, 1945, "PDF", 2);

fiction.addItem(book);
fiction.addItem(ebook);

book.rating.addReview("User1", 5, "Great");
book.rating.addReview("User2", 4, "Good");

console.log(book.getInfo());
console.log(book.rating.getAverage());

const student = new Student("Ivan");
const guest = new Guest("Petro");

console.log(student.getLimit());
console.log(guest.getLimit());
