class Employee {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    add(employee) {
        throw new Error("Method not implemented");
    }

    remove(employee) {
        throw new Error("Method not implemented");
    }

    getSubordinates() {
        throw new Error("Method not implemented");
    }

    getInfo(indent = 0) {
        throw new Error("Method not implemented");
    }

    find(name) {
        throw new Error("Method not implemented");
    }

    getCount() {
        throw new Error("Method not implemented");
    }
}


// IndividualEmployee
class IndividualEmployee extends Employee {
    constructor(name, position) {
        super(name, position);
    }

    add() {
        console.log("Cannot add to individual employee");
    }

    remove() {
        console.log("Cannot remove from individual employee");
    }

    getSubordinates() {
        return [];
    }

    getInfo(indent = 0) {
        console.log(`${" ".repeat(indent)}👤 ${this.name} (${this.position})`);
    }

    find(name) {
        return this.name === name ? this : null;
    }

    getCount() {
        return 1;
    }
}


// Department
class Department extends Employee {
    constructor(name, position) {
        super(name, position);
        this.subordinates = [];
    }

    add(employee) {
        // перевірка унікальності
        if (this.subordinates.includes(employee)) {
            console.log("Employee already exists in department!");
            return;
        }
        this.subordinates.push(employee);
    }

    remove(employee) {
        this.subordinates = this.subordinates.filter(e => e !== employee);
    }

    getSubordinates() {
        return this.subordinates;
    }

    getInfo(indent = 0) {
        console.log(`${" ".repeat(indent)}🏢 ${this.name} (${this.position})`);
        this.subordinates.forEach(emp => emp.getInfo(indent + 2));
    }

    find(name) {
        if (this.name === name) return this;

        for (let emp of this.subordinates) {
            const result = emp.find(name);
            if (result) return result;
        }
        return null;
    }

    getCount() {
        return this.subordinates.reduce((sum, emp) => sum + emp.getCount(), 0);
    }
}

// Клієнтський код
// створення співробітників
const dev1 = new IndividualEmployee("Іван", "Frontend Developer");
const dev2 = new IndividualEmployee("Марія", "Backend Developer");
const hr1 = new IndividualEmployee("Олена", "HR");

// створення відділів
const devDept = new Department("Розробка", "Department");
const hrDept = new Department("HR Відділ", "Department");

// додавання співробітників
devDept.add(dev1);
devDept.add(dev2);
hrDept.add(hr1);

// головний відділ
const company = new Department("Компанія", "Organization");

company.add(devDept);
company.add(hrDept);

// 🔹 Вивід структури
console.log("=== Структура компанії ===");
company.getInfo();

// 🔹 Пошук
console.log("\n=== Пошук ===");
const found = company.find("Марія");
console.log(found ? `Знайдено: ${found.name}` : "Не знайдено");

// 🔹 Кількість співробітників
console.log("\n=== Кількість співробітників ===");
console.log(company.getCount());
