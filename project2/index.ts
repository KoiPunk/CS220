// https://github.com/KoiPunk/CS220/tree/main/project2
// by Koi Li for CS220

/** Represents a casino game. */
abstract class Game {
    
    private _name: string; // game name
    private _book: Map< Gambler, number >; // betting book. hashmap that maps each player to how much money they are betting.
    private _casino: Casino; // the casino the game belongs to.

    public get name(): string { return this._name } 

    /** Construct a game with name, and the casino it belongs */
    constructor( name: string, casino: Casino ) {
        this._name = name;
        this._book = new Map(); // initiate _book
        this._casino = casino;
    }
    
    /** Actually run the game and return who won. */
    protected abstract simulateGame(): Gambler[];

    /**
     * This method tells us how much money a particular person will win.
     * By default, we just return 10000x the bet for debugging. 
     * However, in some games, how much we return depends on how the gambler bet. 
     * @returns How much to multiply the winnings by
     */
    // TODO: am I allowed to abstract this?!
    protected abstract profitMultiplier( _gambler: Gambler ): number;
    // protected profitMultiplier( _gambler: Gambler ): number { return 10000; }

    /** 
     * Play the game and give the winners their moeney.
     * Prints all the winners. Removes all elements of this.book. 
     * Updates the casino's profits and losses.
     */
    public playGame(): void {
        console.log( "playing", this.name, "with book:" );
        for( let [player, bet] of this._book ) {
            console.log( "  ", player.name, ": $", bet );
        }

        const winners = this.simulateGame(); // array of winning Gamblers

        console.log( "game finished!" );

        // For each winner, calculate how much money they won and give it to them. 
        // Deduct that much money from the casino.
        for( let winner of winners ) {
            const bet = this._book.get( winner )!;
            const winnings = bet * this.profitMultiplier( winner );
            winner.addMoney( winnings );
            this._casino.addProfit( -winnings );
            console.log( 
                " ", winner.name, "is a winner! they won: ", winnings );

            // remove winners from the book so that only losers will remain.
            this._book.delete( winner );
        }

        // For each loser, take their money and give it to the casino.
        for( let [loser, bet] of this._book ) {
            console.log( " ", loser.name, "has lost!" );
            loser.addMoney( -bet ); // subtract money from losers;
            casino.addProfit( bet ); // give it to the casino

            // also remove losers. the book will be empty after calling playGame
            this._book.delete( loser );
        }
    }

    /**
     * Add a player to the game.
     * @param g The gambler to add to the game.
     * @param bet The amount they are betting.
     */
    public addPlayer( g: Gambler, bet: number ): void {
        this._book.set( g, bet );
    }

    /** Returns a list of people playing the game. */
    public getPlayers(): Gambler[] {
        return Array.from(this._book.keys());
    }
}


/** 
 * This is a game where the players all place their bets at the same time. 
 * The dealer will flip a coin. 
 * If the coin is heads, the players win and their money is doubled. 
 * Otherwise, the players lose their bets. 
*/ 
class TailsIWin extends Game {
    constructor (casino: Casino) {
        super("Tails I Win", casino);
    }

    override simulateGame(): Gambler[] {
        console.log("The House flipped a coin...")

        if (Math.random() > 0.5) {
            console.log("It's head! All player double their money.")
            return this.getPlayers(); // all players win
        }
        console.log("\nIt's tails! The House always win.\n")
        return []; // no player win
    }

    // TODO: that's it?
    override profitMultiplier( _gambler: Gambler ): number { 
        return 2;
    }
}


/**
 * Helper function to generate uniform random numbers between [0, upper).
 * So randomInt( 5 ) generates a number between 0 and 4.
 * @param upper The exclusive upper bound (i.e., the number generated will be at most one less than this number)
 * @returns A randum number in the range [0, upper)
 */
function randomInt( upper: number ) {
    return Math.floor( Math.random() * upper );
}


/**
 * This is a game where each player randomly picks a number from 0 to 4 (inclusive). 
 * The dealer also picks a number from 0 to 4. 
 * If a player picks the same number as the dealer, they get back 4.5x their bet (total profit of 3.5x). 
 * Otherwise, they lose their money.
 */
class GuessTheNumber extends Game {

    constructor (casino: Casino) {
        super("Guess the Number", casino);
    }

    override simulateGame(): Gambler[] {
        let winner: Gambler[] = [];
        const dealerNumber: number = randomInt(5);

        // run for every player
        for (const player of this.getPlayers()) {
            let playerNumber: number = randomInt(5);

            // print the number each players chose
            console.log(player.name, "chose number", playerNumber);

            if (playerNumber == dealerNumber)
                winner.push(player);
        }

        console.log("The winner number was", dealerNumber); // print the winning number
        return winner;
    }

    override profitMultiplier( _gambler: Gambler ): number { 
        return 4.5;
    }
}

/**
 * Simulated guinea-pig racing. Players choose a pig from 0 to 3.
 * Pig #0 has a 50% chance of winning, and pays out 1.9 if they win. 
 * Pig #1 has a 25% chance of winning, and pays out 3.8 if they win.
 * Pig #2 has a 12.5% chance of winning, and pays out 7.6 if they win.
 * Pig #3 has a 12.5% chance of winning, and pays out 7.6 if they win.
 * 
 * There are no complicated horse-racing-style bets (e.g., place, show, etc.),
 * each player just picks a pig. 
 */
class OffTrackGuineaPigRacing extends Game {
    // not a great idea to have a field here, sice each round of the game will use this same value
    pigs: [id: number, player: Gambler][] = new Array; // but it make things so easy...

    constructor (casino: Casino) {
        super("Off Track Guinea Pig Racing", casino);
    }

    override simulateGame(): Gambler[] {
        // hopefully new-ing this field will fix any possible issues
        this.pigs = new Array;
        let winner: Gambler[] = [];

        // each player choose a pig depending on randomInt()
        for (const player of this.getPlayers()) {
            const pig = randomInt(4);
            this.pigs.push([pig, player]);

            console.log(player.name, "chose pig number", pig);
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

    override profitMultiplier( _gambler: Gambler ): number { 
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

abstract class Gambler {
    private _name: string;
    private _money: number;
    private _target: number; // how much money the gambler is trying to get

    public constructor( name: string, startingFunds: number, targetFunds: number ) {
        this._name = name;
        this._money = startingFunds;
        this._target = targetFunds;
    }

    get name(): string { return this._name }
    get money(): number { return this._money }
    get target(): number { return this._target }

    /**
     * Add or deduct a given amount of money to the gambler's bankroll. 
     * @param amount The amount of money to add. Negative means to remove.
     */
    addMoney( amount: number ): void {
        this._money += amount;
    }

    /**
     * @returns Whether the gambler has hit their target.
     */
    public hitTarget(): boolean { 
        return (this.money >= this.target);
     }
     

    /**
     * @returns Whether the gambler has run out of money.
     */
    public bankrupt(): boolean { 
        return (this.money <= 0);
     }
    
    /**
     * @returns Whether the gambler is finished (i.e., if they've run out of money or have reached their target.)
     */
    public isFinished(): boolean { 
        return (this.bankrupt() || this.hitTarget());
    }

    /**
     * @returns How much the gambler is going to bet next.
     */
    public abstract getBetSize(): number;
}

/**
 * The stable gambler always bets the same amount as long as they have enough money. 
 * If they don't, they bet what they have. 
 * Their goal is to double their starting funds.
 */
class StableGambler extends Gambler {
    private _bet: number; // how much they bet

    public constructor( name: string, startingFunds: number, stableBet: number) {
        super( name, startingFunds, startingFunds * 2 );
        this._bet = stableBet;
    }

    public override getBetSize(): number {
        if (this.money < this._bet)
            return this.money;
        return this._bet;
    }
}

/**
 * The high risk gambler always bets half of their current money. 
 * If they have less than yoloAmount, they bet the remainder of their money. 
 * Their goal is to make 5 times their starting amount of money. 
 */
class HighRiskGambler extends Gambler {
    /** if the gambler has <= this amount of money, they bet it all. */
    private _yoloAmount: number;

    /**
     * @param yoloAmnt If the gambler has <= this amount of money, they bet everything they have remaining.
     */
    public constructor( name: string, startingFunds: number, yoloAmnt: number ) {
        super(name, startingFunds, 5 * startingFunds);
        this._yoloAmount = yoloAmnt;
    }

    public override getBetSize(): number {
        if (this.money <= this._yoloAmount)
            return this.money;
        // TODO: make sure there won't be a rounding error for this
        return (this.money / 2);
    }
}

/**
 * The streak better always increases their bet whenever they win by a given multiple, 
 * and reduces their bet by a given multiple when they lose.
 * For example, if the win multiple is 2.0 and lose multiple is 0.5, 
 * the streak better will double their money when they win and halve it when they lose. 
 * You can also do the reverse, making them more conservative when they win. 
 * They start at a given initial bet. 
 * 
 * How do we detect whether we won or lost? Override the addMoney method.
 */
class StreakGambler extends Gambler {
    private _bet: number;
    private _minBet: number;
    private _winMultiply: number;
    private _loseMultiply: number;

    public constructor( name: string, startingFunds: number, initBet: number, 
                        minBet: number, winMultiply: number, loseMultiply: number, targetFund: number) {
        super(name, startingFunds, targetFund);
        this._bet = initBet;
        this._minBet = minBet;
        this._winMultiply = winMultiply;
        this._loseMultiply = loseMultiply;
    }

    public override getBetSize(): number {
        if (this._bet >= this._minBet)
            return this._minBet;
        return this._bet;
    }

    override addMoney(amount: number): void {
        // call the og. addMoney() anyway
        super.addMoney(amount);

        // TODO: check if including 0 as win is problemtic
        // winning $$
        if (amount >= 0) {
            this._bet *= this._winMultiply;
        }
        // losing $$
        else {
            this._bet *= this._loseMultiply;
        }
    }
}


class Casino {
    private _games: Game[]; // a list of games offered in the casino
    private _gamblers: Set<Gambler>; // a set of guests to the casino
    private _profits: number; // how much money the casino made today
    private _maxRounds: number; // the maximum number of rounds to play
    private _currentRound: number;

    public constructor( maxRounds: number ) {
        this._profits = 0;
        this._games = [new TailsIWin( this ), new GuessTheNumber( this ), new OffTrackGuineaPigRacing( this ),];
        this._gamblers = new Set([
            new StableGambler( "Alice", 100, 15 ),
            new HighRiskGambler( "Bob", 50, 10 ),
            new StreakGambler( "Camille", 200, 10, 10, 2, 0.5, 500 ),
        ]);

        this._maxRounds = maxRounds;
        this._currentRound = 0;
    }

    /**
     * Add profit to the casino for the day.
     * @param amount The amount of profit to add. If negative, it counts as a loss.
     */
    public addProfit( amount: number ): void {
        this._profits += amount;
    }

    /** 
     * For each game: have each gambler who is still present play.
     * Starts by printing how much money each gambler has. 
     * If a gambler runs out of money or hits their target, they leave.
     * Then, plays the game with all players.
     */
    public simulateOneRound(): void {
        const startingProfit = this._profits;

        console.log( "-----------------------" );
        console.log( "beginning round", this._currentRound );
        for( let game of this._games ) {
            this.determineWhoIsStillPlaying();

            // add each player who is still playing to the game.
            // have them use the bet size determined by their personality.
            for( let player of this._gamblers ) {
                game.addPlayer( player, player.getBetSize() );
            }

            const gameStartingProfit = this._profits;
            game.playGame();
            console.log( 
                "casino made", 
                casino._profits - gameStartingProfit, "on this game.")
            console.log();
        }
        console.log( 
            "round complete. casino made: ", this._profits - startingProfit );
        console.log( "total profit:", this._profits );
        console.log( "-----------------------" );
    }

    /**
     * Run the simulation until either the maximum number of games is reached,
     * or no one is left in the casino.
     */
    public simulate(): void {
        while( this._currentRound < this._maxRounds && this._gamblers.size > 0 ) {
            this.simulateOneRound();
            console.log();
            this._currentRound++;
        }

        console.log( "simulation complete" );
    }

    /**
     * Update and list the people who are still playing.
     */
    private determineWhoIsStillPlaying() {
        const gamblersWhoLeft: Gambler[] = [];
        
        // update and list of who is still playing
        for( let gambler of this._gamblers.keys() ) {
            console.log( gambler.name, ": ", gambler.money );
            
            if( gambler.isFinished() ) {
                // add this person to the list of gamblers to remove.
                // don't remove it right away: removing an element from a 
                // collection that we are iterating over is usually a bad
                // idea.
                gamblersWhoLeft.push( gambler );
            }

            // now, print why the person left if they did so
            if( gambler.hitTarget() ) {
                console.log( 
                    gambler.name, 
                    "has hit their target! They leave the casino..."
                );
            }
            else if( gambler.bankrupt() ) {
                console.log( 
                    gambler.name,
                    "has gone bankrupt! They leave the casino..."
                );
            }
        }

        // remove the gamblers who left from the set
        for( let leaver of gamblersWhoLeft ) {
            this._gamblers.delete( leaver );
        }
    }
}


const MAX_N_ROUNDS = 5;

// main:
const casino = new Casino( MAX_N_ROUNDS );

casino.simulate();
