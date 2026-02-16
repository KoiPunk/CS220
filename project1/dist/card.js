"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.Visibility = exports.Values = exports.Suits = void 0;
var Suits;
(function (Suits) {
    Suits["Heart"] = "\u2665";
    Suits["Diamond"] = "\u2666";
    Suits["Club"] = "\u2663";
    Suits["Spade"] = "\u2660";
})(Suits || (exports.Suits = Suits = {}));
;
var Values;
(function (Values) {
    Values["Ace"] = "a";
    Values["Two"] = "2";
    Values["Three"] = "3";
    Values["Four"] = "4";
    Values["Five"] = "5";
    Values["Six"] = "6";
    Values["Seven"] = "7";
    Values["Eight"] = "8";
    Values["Nine"] = "9";
    Values["Ten"] = "10";
    Values["Jack"] = "j";
    Values["Queen"] = "q";
    Values["King"] = "k";
})(Values || (exports.Values = Values = {}));
var Visibility;
(function (Visibility) {
    Visibility["Shown"] = "shown";
    Visibility["Hidden"] = "hidden";
})(Visibility || (exports.Visibility = Visibility = {}));
class Card {
    constructor(suit, value, visibility) {
        this.suit = suit;
        this.value = value;
        this.visibility = visibility;
    }
    getSuit() {
        return this.suit;
    }
    getValueName() {
        return this.value;
    }
    getVisibility() {
        return this.visibility;
    }
    /*
    Make hidden card visible and visible card hidden
    */
    changeVisibility() {
        if (this.visibility === Visibility.Hidden)
            this.visibility = Visibility.Shown;
        else
            this.visibility = Visibility.Hidden;
    }
    // return the numeric value of the card (1, 2, 11...)
    getValueNum() {
        // ace is not in here, since its value is determined in deck.ts's getAce()
        if (this.value === Values.Two)
            return 2;
        else if (this.value === Values.Three)
            return 3;
        else if (this.value === Values.Four)
            return 4;
        else if (this.value === Values.Five)
            return 5;
        else if (this.value === Values.Six)
            return 6;
        else if (this.value === Values.Seven)
            return 7;
        else if (this.value === Values.Eight)
            return 8;
        else if (this.value === Values.Nine)
            return 9;
        else if ((this.value === Values.Ten) || (this.value === Values.Jack) || (this.value === Values.Queen) || (this.value === Values.King)) // ugly but works
            return 10;
        else
            return 10000; // shouldn't be used.
    }
}
exports.Card = Card;
