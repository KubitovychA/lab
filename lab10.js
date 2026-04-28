// Інтерфейс Observer
class Observer {
    update(stockName, newPrice) {
        throw new Error("Method not implemented");
    }
}

// Інтерфейс Subject
class Subject {
    attach(observer) {
        throw new Error("Method not implemented");
    }

    detach(observer) {
        throw new Error("Method not implemented");
    }

    notifyObservers() {
        throw new Error("Method not implemented");
    }
}

 // StockExchange (Subject)
class StockExchange extends Subject {
    constructor(limit = Infinity) {
        super();
        this.observers = [];
        this.stockName = null;
        this.stockPrice = null;
        this.limit = limit; // ліміт підписників
    }

    attach(observer) {
        if (this.observers.length >= this.limit) {
            console.log("Досягнуто ліміт підписників!");
            return;
        }

        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    detach(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    notifyObservers() {
        this.observers.forEach(observer =>
            observer.update(this.stockName, this.stockPrice)
        );
    }

    setStockPrice(stockName, newPrice) {
        this.stockName = stockName;
        this.stockPrice = newPrice;
        console.log(`\n📈 ${stockName} -> ${newPrice}`);
        this.notifyObservers();
    }
}

// Investor (Observer)
class Investor extends Observer {
    constructor(name, interests = []) {
        super();
        this.name = name;
        this.interests = interests; // фільтр акцій
    }

    update(stockName, newPrice) {
        if (this.interests.length === 0 || this.interests.includes(stockName)) {
            console.log(`Інвестор ${this.name}: ${stockName} = ${newPrice}`);
        }
    }
}

// Broker (Observer)
class Broker extends Observer {
    constructor(name, interests = []) {
        super();
        this.name = name;
        this.interests = interests;
    }

    update(stockName, newPrice) {
        if (this.interests.length === 0 || this.interests.includes(stockName)) {
            console.log(`Брокер ${this.name}: ${stockName} тепер ${newPrice}`);
        }
    }
}

// Клієнтський код
// створюємо біржу (з лімітом 3 підписники)
const stockExchange = new StockExchange(3);

// підписники
const investor1 = new Investor("Олександр", ["Apple", "Google"]);
const investor2 = new Investor("Марія", ["Microsoft"]);
const broker1 = new Broker("TradeMax", ["Google"]);
const investor3 = new Investor("Іван");

// додаємо
stockExchange.attach(investor1);
stockExchange.attach(investor2);
stockExchange.attach(broker1);

// перевищення ліміту
stockExchange.attach(investor3); // не додасться

// зміни цін
stockExchange.setStockPrice("Apple", 145.5);
stockExchange.setStockPrice("Google", 2730.2);

// видаляємо підписника
stockExchange.detach(investor2);

// нова зміна
stockExchange.setStockPrice("Microsoft", 310.0);
