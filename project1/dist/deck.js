"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const fs = __importStar(require("fs"));
const card_1 = require("./card");
class Deck {
    constructor() {
        this.deck = [];
        this.dealer_hand = [];
        this.player_hand = [];
        this.newDeck();
        // TODO: double check to make sure this make sense logically and shouldnt be in game.ts instead
        this.newHand();
    }
    /*
    Reset deck of French cards, all hidden
    */
    newDeck() {
        // JavaScript function that I yoinked from its documentation
        for (const suit of Object.values(card_1.Suits))
            for (const value of Object.values(card_1.Values))
                this.deck.push(new card_1.Card(suit, value, card_1.Visibility.Hidden));
    }
    /*
    initialize hands: give dealer and player two cards each, make dealer's second card hidden
    */
    newHand() {
        for (let i = 0; i < 2; i++) {
            this.addCard(this.dealer_hand);
            this.addCard(this.player_hand);
        }
        // make the dealer's second card hidden
        this.dealer_hand[1].changeVisibility();
    }
    /*
    move the last card in deck onto the given hand. Make the card shown
    */
    addCard(hand) {
        const card = this.deck.pop();
        if (typeof card == "undefined") {
            console.log("Out of cards in deck. This shouldn't be possible.");
            return;
        }
        // push card to hand and flip it
        card.changeVisibility();
        hand.push(card);
    }
    shuffleDeck() {
        // TODO: make function
    }
    hit(id) {
        // don't print game here, only updates required
        // TODO:
        if (id === "player")
            this.addCard(this.player_hand);
        else if (id === "dealer")
            this.addCard(this.dealer_hand);
        console.log(id + " hit");
    }
    stay(id) {
        // don't print game here, only updates required
        // TODO:
        console.log(id + " stayed");
    }
    /*
    return the sum of ALL numeric value of player/dealer's cards.
    this is the score that's actually used to check for winning/losing.
    value of ace is added accordingly
    */
    getScore(hand) {
        let result = 0;
        for (let i = 0; i < hand.length; i++) {
            // current card iteration is an ace
            // TODO: update situation if it is ace
            if (hand[i].getValueName() === card_1.Values.Ace)
                result += this.getAce();
            else
                result += hand[i].getValueNum();
        }
        return result;
    }
    /*
    return getScore(), remove hidden cards' value.
    this is the "score" that's printed
    */
    getShownScore(hand) {
        let result = this.getScore(hand);
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].getVisibility() === card_1.Visibility.Hidden)
                // TODO: fix bug of this not removing ace's value
                result -= hand[i].getValueNum();
        }
        return result;
    }
    /*
    return value of ace depending on player/dealer score
    */
    getAce() {
        // TODO: update value of ace
        return 11;
    }
    /*
    prints the current decks, including hands and scores.
    I wanted to put this in tui.ts to match all the other print methods,
    but the fancy "text replacement with score" thing is just so much easier to do here.
    it'll be much cleaner too.
    this will swap the premade variables I shoved in the file with actual value
    */
    printDeck() {
        let content = this.updateDeckContent();
        // update number of cards left in deck 
        let deck = this.deck.length.toString(); // using a string for easy concatnation
        if (deck.length === 1) // fix formatting
            deck = deck + " ";
        content = content.replace("%deck", deck);
        // print the whole thingy
        console.log(content);
    }
    // get txt file of deck TUI and dynamically add ASCII art of cards to the content.
    // this could've been in printDeck(), 
    // but I start zooming out when a block of code gets too long so I'm breaking it into functions
    updateDeckContent() {
        // get file
        const input_file_path = 'tui/deck.txt';
        let content = fs.readFileSync(input_file_path, 'utf-8');
        // update dealer's cards
        for (let i = 0; i < this.dealer_hand.length; i++) {
            // place card templates
            content = content.replace("^", " +-----+$");
            content = content.replace("^", " |%d_v" + (i + 1) + "   |$");
            content = content.replace("^", " |  %d_s" + (i + 1) + "  |$");
            content = content.replace("^", " |   %d_v" + (i + 1) + "|$");
            content = content.replace("^", " +-----+$");
            content = content.replace(/\$/g, "^"); // trust the process
            // update card suit
            content = content.replace("%d_s" + (i + 1).toString(), this.dealer_hand[i].getSuit());
            // update card value
            let v1 = this.dealer_hand[i].getValueName();
            // fix formatting for "single values"
            if (v1.length === 1) {
                content = content.replace("%d_v" + (i + 1), v1 + " ");
                content = content.replace("%d_v" + (i + 1), " " + v1);
            }
            else {
                content = content.replace("%d_v" + (i + 1), v1);
                content = content.replace("%d_v" + (i + 1), v1);
            }
            // update dealer "score" (without the hidden card's value)
            content = content.replace("%d_score", this.getShownScore(this.dealer_hand).toString());
        }
        // update player's cards
        for (let i = 0; i < this.player_hand.length; i++) {
            // place card templates
            content = content.replace("&", " +-----+$");
            content = content.replace("&", " |%p_v" + (i + 1) + "   |$");
            content = content.replace("&", " |  %p_s" + (i + 1) + "  |$");
            content = content.replace("&", " |   %p_v" + (i + 1) + "|$");
            content = content.replace("&", " +-----+$");
            content = content.replace(/\$/g, "&"); // trust the process
            // update card suit
            content = content.replace("%p_s" + (i + 1).toString(), this.player_hand[i].getSuit());
            // update card value
            let v1 = this.player_hand[i].getValueName();
            // fix formatting for "single values"
            if (v1.length === 1) {
                content = content.replace("%p_v" + (i + 1), v1 + " ");
                content = content.replace("%p_v" + (i + 1), " " + v1);
            }
            else {
                content = content.replace("%p_v" + (i + 1), v1);
                content = content.replace("%p_v" + (i + 1), v1);
            }
            // update player "score" (without the hidden card's value)
            content = content.replace("%p_score", this.getShownScore(this.player_hand).toString());
        }
        // remove all the temporary "^"
        content = content.replace(/\^/g, "");
        content = content.replace(/\&/g, "");
        return content;
    }
}
exports.Deck = Deck;
