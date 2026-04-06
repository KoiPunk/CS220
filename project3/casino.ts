import {Game, TailsIWin, GuessTheNumber, OffTrackGuineaPigRacing} from './game';
import {Gambler, StableGambler, HighRiskGambler, StreakGambler} from './gambler';


export class Casino {
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
                game._properties.addPlayer( player, player.getBetSize() );
            }

            const gameStartingProfit = this._profits;
            game._properties.playGame(game);
            console.log( 
                "casino made", 
                // casino._profits - gameStartingProfit, "on this game.")
                this._profits - gameStartingProfit, "on this game.") // TODO:CHECK IF CORRECT FIX
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
            console.log( gambler._properties.name, ": ", gambler._properties.money );
            
            if( gambler._properties.isFinished() ) {
                // add this person to the list of gamblers to remove.
                // don't remove it right away: removing an element from a 
                // collection that we are iterating over is usually a bad
                // idea.
                gamblersWhoLeft.push( gambler );
            }

            // now, print why the person left if they did so
            if( gambler._properties.hitTarget() ) {
                console.log( 
                    gambler._properties.name, 
                    "has hit their target! They leave the casino..."
                );
            }
            else if( gambler._properties.bankrupt() ) {
                console.log( 
                    gambler._properties.name,
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
