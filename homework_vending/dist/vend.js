"use strict";
// Domain: vending machine
class VendItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
class CocaCola extends VendItem {
    sayThanks() {
        console.log("Enjoy your Coke!");
    }
}
class Fanta extends VendItem {
    sayThanks() {
        console.log("Enjoy your Fanta!");
    }
}
class Soup extends VendItem {
    sayThanks() {
        console.log("Enjoy your soup!");
    }
}
class Pizza extends VendItem {
    sayThanks() {
        console.log("Enjoy your pizza!");
    }
}
var ChargeResult;
(function (ChargeResult) {
    ChargeResult[ChargeResult["NoConnection"] = 0] = "NoConnection";
    ChargeResult[ChargeResult["InsufficientFunds"] = 1] = "InsufficientFunds";
    ChargeResult[ChargeResult["Success"] = 2] = "Success";
})(ChargeResult || (ChargeResult = {}));
class PaymentMethod {
    constructor(name, fee = 0) {
        this.name = name;
        this.fee = fee;
    }
}
class CashPayment extends PaymentMethod {
    charge(amount) {
        // what
        return ChargeResult.Success;
    }
}
class VendingMachine {
    constructor(items) {
        this.items = new Map();
        this.items = items;
    }
}
// make two concrete vending machines and inherit
class DrinkVending extends VendingMachine {
    showMessage() {
        console.log("Here's your drink:");
    }
    buy(itemNo, method) {
        // could get undefined if the item does not exists
        const vend_item = this.items.get(itemNo);
        if (vend_item != undefined)
            return [vend_item, ChargeResult.Success];
        else
            throw Error("Drink does not exists!?");
    }
}
class FoodVending extends VendingMachine {
    showMessage() {
        console.log("Here's your food:");
    }
    buy(itemNo, method) {
        // could get undefined if the item does not exists
        const vend_item = this.items.get(itemNo);
        if (vend_item != undefined)
            return [vend_item, ChargeResult.Success];
        else
            throw Error("Food does not exists!?");
    }
}
const coke = new CocaCola("CocaCola", 4);
const fanta = new Fanta("Fanta", 3);
const tomato_soup = new Soup("Tomato Soup", 5);
const cheese_pizza = new Pizza("Cheese Pizza", 7);
let drink_catalog = new Map();
drink_catalog.set(1, coke);
drink_catalog.set(2, fanta);
let food_catalog = new Map();
food_catalog.set(1, tomato_soup);
food_catalog.set(2, cheese_pizza);
const payment_method = new CashPayment("cash", 100);
let drink_machine = new DrinkVending(drink_catalog);
console.log(drink_machine.buy(1, payment_method));
let food_machine = new FoodVending(food_catalog);
console.log(drink_machine.buy(1, payment_method));
console.log(drink_machine.buy(2, payment_method));
