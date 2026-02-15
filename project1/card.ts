enum Suits {
    Heart = "heart",
    Diamond = "diamond",
    Club = "club",
    Spade = "spade",
};

enum Values {
    Ace = "ace",
    Two = "2", 
    Three = "3", 
    Four = "4", 
    Five = "5", 
    Six = "6", 
    Seven = "7", 
    Eight = "8", 
    Nine = "9", 
    Ten = "10",
    Jack = "jack", 
    Queen = "queen", 
    King = "king",
}

class Card {
	
	constructor(private readonly suit: Suits, private readonly value: Values) {}
	
	getSuit(): string {
        return this.suit;
    }

    getValueName(): string {
        return this.value;
    }

    // TODO: 1 or 11 if ace
    getValueNum() {}
}

let card = new Card(Suits.Heart, Values.Ace);
console.log(card.getSuit());
console.log(card.getValueName());
