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

    // return the numeric value of the card (1, 2, 11...)
    getValueNum(): number {
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
