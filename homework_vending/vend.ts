// Domain: vending machine

abstract class VendItem {
    name: string;
    price: number;
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
    abstract sayThanks(): void;
}

class CocaCola extends VendItem {
    override sayThanks(): void {
        console.log("Enjoy your Coke!")
    }
}

class Fanta extends VendItem {
    override sayThanks(): void {
        console.log("Enjoy your Fanta!");
    }
}

class Soup extends VendItem {
    override sayThanks(): void {
        console.log("Enjoy your soup!");
    }
}

class Pizza extends VendItem {
    override sayThanks(): void {
        console.log("Enjoy your pizza!");
    }
}


enum ChargeResult {
    NoConnection,
    InsufficientFunds,
    Success
}


abstract class PaymentMethod {
    name: string;
    fee: number;
    constructor(name: string, fee: number = 0) {
        this.name = name;
        this.fee = fee;
    }
    abstract charge(amount: number): ChargeResult;
}


class CashPayment extends PaymentMethod {

    override charge(amount: number): ChargeResult {
        // what
        return ChargeResult.Success;
    }
}


// I don't like how VendItem is the key and not its number...
// so I flipped it
type VendInventory = Map<number, VendItem>;


abstract class VendingMachine {
    items: VendInventory = new Map();

    constructor(items: Map<number, VendItem>) {
        this.items = items;
    }

    abstract showMessage(): void;

    abstract buy(itemNo: number, method: PaymentMethod): [VendItem, ChargeResult]; // WHAT, so PaymentResponse is an interface?you just declare one in here? ok? 

}


// make two concrete vending machines and inherit
class DrinkVending extends VendingMachine {

    override showMessage(): void {
        console.log("Here's your drink:");
    }

    override buy(itemNo: number, method: PaymentMethod): [VendItem, ChargeResult] {

        // could get undefined if the item does not exists
        const vend_item: VendItem|undefined = this.items.get(itemNo);

        if (vend_item != undefined)
            return [vend_item, ChargeResult.Success];
        else 
            throw Error("Drink does not exists!?");
    }
}


class FoodVending extends VendingMachine {
    
    override showMessage(): void {
        console.log("Here's your food:");
    }

    override buy(itemNo: number, method: PaymentMethod): [VendItem, ChargeResult] {

        // could get undefined if the item does not exists
        const vend_item: VendItem|undefined = this.items.get(itemNo);

        if (vend_item != undefined)
            return [vend_item, ChargeResult.Success];
        else 
            throw Error("Food does not exists!?");
    }
}

const coke: CocaCola = new CocaCola("CocaCola", 4);
const fanta: Fanta = new Fanta("Fanta", 3);
const tomato_soup: Soup = new Soup("Tomato Soup", 5);
const cheese_pizza: Pizza = new Pizza("Cheese Pizza", 7);

let drink_catalog: VendInventory = new Map();
drink_catalog.set(1, coke);
drink_catalog.set(2, fanta);
let food_catalog: VendInventory = new Map();
food_catalog.set(1, tomato_soup);
food_catalog.set(2, cheese_pizza);

const payment_method: PaymentMethod = new CashPayment("cash", 100);

let drink_machine: DrinkVending = new DrinkVending(drink_catalog);
console.log(drink_machine.buy(1, payment_method));

let food_machine: FoodVending = new FoodVending(food_catalog);
console.log(drink_machine.buy(1, payment_method));
console.log(drink_machine.buy(2, payment_method));
