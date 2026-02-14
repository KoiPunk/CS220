"use strict";
var Suits;
(function (Suits) {
    Suits["Heart"] = "heart";
    Suits["Diamond"] = "diamond";
    Suits["Club"] = "club";
    Suits["Spade"] = "spade";
})(Suits || (Suits = {}));
;
var Values;
(function (Values) {
    Values["Ace"] = "ace";
    Values["Two"] = "2";
    Values["Three"] = "3";
    Values["Four"] = "4";
    Values["Five"] = "5";
    Values["Six"] = "6";
    Values["Seven"] = "7";
    Values["Eight"] = "8";
    Values["Nine"] = "9";
    Values["Ten"] = "10";
    Values["Jack"] = "jack";
    Values["Queen"] = "queen";
    Values["King"] = "king";
})(Values || (Values = {}));
class Cards {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    getSuit() {
        return this.suit;
    }
    getValueName() {
        return this.value;
    }
    // TODO: 1 or 11 if ace
    getValueNum() { }
}
class Deck {
    shuffleDeck() { }
}
let card = new Cards(Suits.Heart, Values.Ace);
console.log(card.getSuit());
console.log(card.getValueName());
