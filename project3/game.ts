import {Casino} from './casino';
import {Gambler} from './gambler';

export function randomInt( upper: number ) {
    return Math.floor( Math.random() * upper );
}

export interface Game {
    _properties: SharedGame;

    simulateGame(): Gambler[];
    profitMultiplier( _gambler: Gambler ): number;
}

/* All the shared properties and methods each game has. */
class SharedGame {

    private _name: string; 
    private _book: Map< Gambler, number >;
    private _casino: Casino; 
    public get name(): string { return this._name } 

    constructor( name: string, casino: Casino ) {

        this._name = name;
        this._book = new Map();
        this._casino = casino;
    }

    public playGame(game: Game): void {

        console.log( "playing", this.name, "with book:" );
        for( let [player, bet] of this._book ) {
            console.log( "  ", player._properties.name, ": $", bet );
        }

        const winners = game.simulateGame(); // array of winning Gamblers

        console.log( "game finished!" );

        // For each winner, calculate how much money they won and give it to them. 
        // Deduct that much money from the casino.
        for( let winner of winners ) {
            const bet = this._book.get( winner )!;
            const winnings = bet * game.profitMultiplier( winner );
            winner._properties.addMoney( winnings );
            this._casino.addProfit( -winnings );
            console.log( 
                " ", winner._properties.name, "is a winner! they won: ", winnings );

            // remove winners from the book so that only losers will remain.
            this._book.delete( winner );
        }

        // For each loser, take their money and give it to the casino.
        for( let [loser, bet] of this._book ) {
            console.log( " ", loser._properties.name, "has lost!" );
            loser._properties.addMoney( -bet ); // subtract money from losers;
            this._casino.addProfit( bet ); // give it to the casino

            // also remove losers. the book will be empty after calling playGame
            this._book.delete( loser );
        }
    }

    public addPlayer( g: Gambler, bet: number ): void {
        this._book.set( g, bet );
    }

    public getPlayers(): Gambler[] {
        return Array.from(this._book.keys());
    }
}

export class TailsIWin implements Game {
    _properties: SharedGame;

    constructor (casino: Casino) {
        this._properties = new SharedGame("Tails I Win", casino);
    }
    
    simulateGame(): Gambler[] {
        console.log("The House flipped a coin...")

        if (Math.random() > 0.5) {
            console.log("It's head! All player double their money.")
            return this._properties.getPlayers(); // all players win
        }
        console.log("\nIt's tails! The House always win.\n")
        return []; // no player win
    }

    profitMultiplier( _gambler: Gambler ): number { 
        return 2;
    }
}

export class GuessTheNumber implements Game {
    _properties: SharedGame;

    constructor (casino: Casino) {
        this._properties = new SharedGame("Guess the Number", casino);
    }

    simulateGame(): Gambler[] {
        let winner: Gambler[] = [];
        const dealerNumber: number = randomInt(5);

        // run for every player
        for (const player of this._properties.getPlayers()) {
            let playerNumber: number = randomInt(5);

            // print the number each players chose
            console.log(player._properties.name, "chose number", playerNumber);

            if (playerNumber == dealerNumber)
                winner.push(player);
        }

        console.log("The winner number was", dealerNumber); // print the winning number
        return winner;
    }

    profitMultiplier( _gambler: Gambler ): number { 
        return 4.5;
    }
}

export class OffTrackGuineaPigRacing implements Game {
    _properties: SharedGame;
    pigs: [id: number, player: Gambler][] = new Array;

    constructor (casino: Casino) {
        this._properties = new SharedGame("Off Track Guinea Pig Racing", casino);
    }

    simulateGame(): Gambler[] {
        // hopefully new-ing this field will fix any possible issues
        this.pigs = new Array;
        let winner: Gambler[] = [];

        // each player choose a pig depending on randomInt()
        for (const player of this._properties.getPlayers()) {
            const pig = randomInt(4);
            this.pigs.push([pig, player]);

            console.log(player._properties.name, "chose pig number", pig);
        }
        console.log("Players have finished choosing their pigs... now... lets see who is the fastest!\n...3\n...2\n...1\nGO!");

        let pigWinner: number;
        const rng = Math.random();

        // determine winning pig
        if (rng < 0.125) {
            if (Math.random() < .5)
                pigWinner = 2;
            else 
                pigWinner = 3;
        }
        else if (rng < .25)
            pigWinner = 1;
        else if (rng < .5)
            pigWinner = 0;
        else {
            console.log("None of the pigs moved. Upon closer inspection, the pigs were all plastic.\nThe players tried to argue with the staff, but nothing in the syllabus said any of the pigs had to finish the track.\nThe House always win.")
            return []; // no player won
        }

        // print each losing pig's flavor text
        if (pigWinner != 0) {
            console.log("Pig #0 immediately started running for its life! Such speed... as to be expected from our stable champ.");
            console.log("But it was too fast... the speed was more than it can handle!\nPig #0 suddenly tripped and rolled out of the track!\nPig #0 automatically lost.\n")
        }
        if (pigWinner != 1)
            console.log("Pig #1 fell asleep at the starting point. All the other pigs ran past it... \nPig #1 is definitely losing.\n")
        if (pigWinner != 2)
            console.log("Pig #2 is running slowly but steadily... really slowly. After two hours, the pig has only made it to the 1cm mark. I don't think it's going to win any time soon.\nPig #2 lost.\n")
        if (pigWinner != 3) {
            console.log("Pig #3 ran so fast the track caught on fire! What an incredible sight! This might be the fastest pig we've ever seen on this show!!!")
            console.log("...wait a minute. It seems like this pig is actually a genetically modified cyborg guinea-pig. That's definetly illegal, in this contest and in every states ever.\nPig #3 is automatically disqualified and going to jail.\n")
        }

        console.log("I guess that leave us to one pig only... Pig", pigWinner, "win!\n")

        // return array of players that chose the winning pig
        for (const pig of this.pigs) {
            if (pig[0] == pigWinner)
                winner.push(pig[1]);
        }
        return winner;
    }

    profitMultiplier( _gambler: Gambler ): number { 
        let pigID;

        for (const pig of this.pigs) {
            // find the pig belong to the gambler. There's definitely a more effcient way to do this
            if (pig[1] == _gambler) {
                pigID = pig[0];
                break;
            }
        }

        if (pigID == 0) 
            return 1.9;
        else if (pigID == 1)
            return 3.8;
        else 
            return 7.6;
    }
}
