export enum Suits {
    Heart = "♥",
    Diamond = "♦",
    Club = "♣",
    Spade = "♠",
};

export enum Values {
    Ace = "a",
    Two = "2", 
    Three = "3", 
    Four = "4", 
    Five = "5", 
    Six = "6", 
    Seven = "7", 
    Eight = "8", 
    Nine = "9", 
    Ten = "10",
    Jack = "j", 
    Queen = "q", 
    King = "k",
}

export enum Visibility {
    Shown = "shown",
    Hidden = "hidden",
}

export class Card {
	
    private numericValue: number = 0;

	constructor(private readonly suit: Suits, private readonly value: Values, private visibility: Visibility) {}
	
	getSuit(): string {
        return this.suit;
    }

    getValueName(): string {
        return this.value;
    }

    getVisibility(): string {
        return this.visibility;
    }

    /* 
    Make hidden card visible and visible card hidden
    */
    changeVisibility(): void {
        if (this.visibility === Visibility.Hidden)
            this.visibility = Visibility.Shown;
        else 
            this.visibility = Visibility.Hidden;
    }

    /* 
    called in deck.ts with the number this ace card should be.
    */
    setAce(value: number) {
        if (this.value !== Values.Ace) {
            console.log("Why are you setting an non-ace card with ace values?!??!");
            return;
        }
        // also not a good idea to just let people set value as whatever (not 11 or 1)
        this.numericValue = value;
    }

    // set numeric value of the card (1, 2, 11...) and return it
    getValueNum(): number {
        // ace is not in here, since its value is determined in deck.ts's getAce()
        if (this.value === Values.Two)
            this.numericValue = 2;
        else if (this.value === Values.Three)
            this.numericValue = 3;
        else if (this.value === Values.Four)
            this.numericValue = 4;
        else if (this.value === Values.Five)
            this.numericValue = 5;
        else if (this.value === Values.Six)
            this.numericValue = 6;
        else if (this.value === Values.Seven)
            this.numericValue = 7;
        else if (this.value === Values.Eight)
            this.numericValue = 8;
        else if (this.value === Values.Nine)
            this.numericValue = 9;
        else if ((this.value === Values.Ten) || (this.value === Values.Jack) || (this.value === Values.Queen) || (this.value === Values.King)) // ugly but works
            this.numericValue = 10;
        // this card should've never existed!?
        else if (this.value !== Values.Ace)
        // else
            this.numericValue = 10000;
        return this.numericValue;
    }
}
