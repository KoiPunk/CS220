import * as fs from 'fs';
// I used a package/library for the shuffling, install with:
// npm install @types/shuffle-array
// npm install shuffle-array
// hopefully this is allowed
import shuffle from 'shuffle-array';
import { Card, Suits, Values, Visibility } from './card';

export class Deck {
    
    private deck: Card[] = [];
    private dealer_hand: Card[] = [];
    private player_hand: Card[] = [];

    constructor() {
        this.newDeck();
    }

    /* 
    Reset deck of French cards, all hidden
    */
    newDeck() {
        // clear deck first
        this.deck = [];
        
        // JavaScript function that I yoinked from its documentation
        for (const suit of Object.values(Suits)) 
            for (const value of Object.values(Values))
                this.deck.push(new Card(suit, value, Visibility.Hidden));
        
        shuffle(this.deck);
    }

    /* 
    initialize hands: give dealer and player two cards each, make dealer's second card hidden
    */
    newHand(): void {
        // clear hands first
        this.dealer_hand = [];
        this.player_hand = [];
        
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
    addCard(hand: Card[]): void {
        const card = this.deck.pop();
        
        if (typeof card == "undefined") {
            console.log("Out of cards in deck. This shouldn't be possible.");
            return;
        }

        // push card to hand and flip it
        card.changeVisibility();
        hand.push(card);
    }

    /*
    shuffle deck using a package function that uses the Fisher-Yates algorithmn
    */
    shuffleDeck() {
        shuffle(this.deck);
    }
    
    hit(id: string): void {
        // don't print game here, only updates required
        if (id === "p")
            this.addCard(this.player_hand);
        else if (id === "d")
            this.addCard(this.dealer_hand);
    }

    showAllCard(): void {
        if (this.dealer_hand[1].getVisibility() === Visibility.Hidden)
            this.dealer_hand[1].changeVisibility();
    }

    /* 
    return sum of all numeric value of player/dealer's cards EXCEPT aces.
    used to determine the value of ace.
    something's really gross about having three whole functions to get scores but this is just so much easier than actually making good code
    */
    getNonAceScore(id: string): number {
        let result: number = 0;
        let hand: Card[];

        if (id === "p")
            hand = this.player_hand;
        else // not a great idea to use else, since then "s" will be treated like "d". But no one is going to do that 
            hand = this.dealer_hand;

        for (let i = 0; i < hand.length; i++) {
            // do not include card if it is an ace
            if (hand[i].getValueName() !== Values.Ace)
                result += hand[i].getValueNum();
        }
        return result;
    }
    
    /*
    return the sum of ALL numeric value of player/dealer's cards by adding ace values to getNonAceScore().
    this is the score that's actually used to check for winning/losing.
    value of ace is added accordingly
    */
    getScore(id: string): number {
        // get score without ace
        let result: number = this.getNonAceScore(id);
        let hand: Card[];

        if (id === "p")
            hand = this.player_hand;
        else // not a great idea to use else, since then "s" will be treated like "d". But no one is going to do that 
            hand = this.dealer_hand;

        for (let i = 0; i < hand.length; i++) {
            // current card iteration is an ace. Add value to result
            if (hand[i].getValueName() === Values.Ace)
                result += this.getAce(id, hand[i]);
        }
        return result;
    }

    /*
    return getScore(), remove hidden cards' value.
    this is the "score" that's printed
    */
    getShownScore(id: string): number {
        let result: number = this.getScore(id);
        let hand: Card[];

        if (id === "p")
            hand = this.player_hand;
        else
            hand = this.dealer_hand;

        for (let i = 0; i < hand.length; i++) {
            if (hand[i].getVisibility() === Visibility.Hidden)
                result -= hand[i].getValueNum();
        }

        return result;
    }

    /* 
    return value of ace depending on player/dealer score.
    also set the value of the card
    */
    getAce(id: string, card:Card): number {
        // TODO: update value of ace
        if (this.getNonAceScore(id) + 11 > 21) {
            card.setAce(1);
            return 1;
        }
        card.setAce(11);
        return 11;
    }

    /* 
    prints the current decks, including hands and scores.
    I wanted to put this in tui.ts to match all the other print methods,
    but the fancy "text replacement with score" thing is just so much easier to do here.
    it'll be much cleaner too.
    this will swap the premade variables I shoved in the file with actual value
    */
    printDeck(): void {
        let content: string = this.updateDeckContent();
        
        // update number of cards left in deck 
        let deck: string = this.deck.length.toString(); // using a string for easy concatnation
        if (deck.length === 1) // fix formatting
            deck = deck + " ";
        content = content.replace("%deck", deck);

        // print the whole thingy
        console.log(content);
    }

    getDeckSize(): number {
        return this.deck.length;
    }

    // get txt file of deck TUI and dynamically add ASCII art of cards to the content.
    // this could've been in printDeck(), 
    // but I start zooming out when a block of code gets too long so I'm breaking it into functions
    updateDeckContent(): string {
        // get file
        const input_file_path: string = 'tui/deck.txt';
        let content: string = fs.readFileSync(input_file_path, 'utf-8');
        
        // update dealer's cards
        for (let i = 0; i < this.dealer_hand.length; i++) {
            // print empty card if hidden
            if (this.dealer_hand[i].getVisibility() === Visibility.Hidden) {
                content = content.replace("^", " +-----+$");
                content = content.replace("^", " |?    |$");
                content = content.replace("^", " |  ?  |$");
                content = content.replace("^", " |    ?|$");
                content = content.replace("^", " +-----+$");
                content = content.replace(/\$/g, "^"); // trust the process
                continue;
            }

            // place card templates
            content = content.replace("^", " +-----+$");
            content = content.replace("^", " |%d_v" + (i+1) + "   |$");
            content = content.replace("^", " |  %d_s" + (i+1) + "  |$");
            content = content.replace("^", " |   %d_v" + (i+1) + "|$");
            content = content.replace("^", " +-----+$");
            content = content.replace(/\$/g, "^"); // trust the process

            // update card suit
            content = content.replace("%d_s" + (i+1).toString(), this.dealer_hand[i].getSuit());

            // update card value
            let v1: string = this.dealer_hand[i].getValueName();
            // fix formatting for "single values"
            if (v1.length === 1) {
                content = content.replace("%d_v" + (i+1), v1 + " ");
                content = content.replace("%d_v" + (i+1), " " + v1);
            }
            else {
                content = content.replace("%d_v" + (i+1), v1);
                content = content.replace("%d_v" + (i+1), v1);
            }

            // update dealer "score" (without the hidden card's value)
            // fix formatting for "single values"
            if (this.getShownScore("d") < 10) 
                content = content.replace("%d_score", this.getShownScore("d").toString() + " ");
            else
                content = content.replace("%d_score", this.getShownScore("d").toString());
        }
        
        // update player's cards
        for (let i = 0; i < this.player_hand.length; i++) {
            // place card templates
            content = content.replace("&", " +-----+$");
            content = content.replace("&", " |%p_v" + (i+1) + "   |$");
            content = content.replace("&", " |  %p_s" + (i+1) + "  |$");
            content = content.replace("&", " |   %p_v" + (i+1) + "|$");
            content = content.replace("&", " +-----+$");
            content = content.replace(/\$/g, "&"); // trust the process

            // update card suit
            content = content.replace("%p_s" + (i+1).toString(), this.player_hand[i].getSuit());

            // update card value
            let v1: string = this.player_hand[i].getValueName();
            // fix formatting for "single values"
            if (v1.length === 1) {
                content = content.replace("%p_v" + (i+1), v1 + " ");
                content = content.replace("%p_v" + (i+1), " " + v1);
            }
            else {
                content = content.replace("%p_v" + (i+1), v1);
                content = content.replace("%p_v" + (i+1), v1);
            }

            // update player "score" (without the hidden card's value)
            // fix formatting for "single values"
            if (this.getShownScore("p") < 10) 
                content = content.replace("%p_score", this.getShownScore("p").toString() + " ");
            else
                content = content.replace("%p_score", this.getShownScore("p").toString());
        }

        // remove all the temporary "^"
        content = content.replace(/\^/g, "");
        content = content.replace(/\&/g, "");

        return content;
    }
}