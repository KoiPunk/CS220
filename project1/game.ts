import * as readline from 'readline-sync';
import { TUI } from './tui';
import { Deck } from './deck';

enum GameState {
    Menu = "menu",
    Playing = "playing",
    Win = "win",
    Lost = "lost",
}

class Game {

    private tui: TUI = new TUI;
    private game_state: GameState = GameState.Menu;
    private deck: Deck = new Deck;

    /* 
    Print tui based on your game state 
    */
    printGame() {
        console.log('');

        if (this.game_state === GameState.Menu)
            this.tui.printMenu();
        else if (this.game_state === GameState.Playing)
            this.deck.printDeck();
        else if (this.game_state === GameState.Win)
            this.tui.printWin();
        else if (this.game_state === GameState.Lost)
            this.tui.printLost();
        else
            console.log("Invalid game state. You're not supposed to be here.")
    }
    
    /*
    the player hits!
    */
    hit() {
        this.deck.hit("player");
    }

    /*
    the player stays!
    */
    stay() {
        this.deck.stay("player");
    }

    checkWin() {}

    checkLost() {}

    startGame() {
        this.game_state = GameState.Playing;
        // TODO: refresh deck when below 30 cards
    }

    closeGame() {
        console.log("");
        this.tui.printQuit();
    }

    getState() {
        return this.game_state;
    }
}


const game = new Game();

// gameplay loop: 
// loop start by printing the current TUI
// then it ask for the appropriate input based on your game's state
while (true) {
    game.printGame();

    // player is in menu
    if (game.getState() === GameState.Menu) {
        const game_state = readline.question("");
        
        if (game_state === "q") {
            game.closeGame();
            break;
        }
        else if (game_state === "p") {
            game.startGame();
        }
    }
    // game's goin' on!
    else if (game.getState() === GameState.Playing) {
        const input = readline.question("");

        if (input === "h") {
            game.hit();
        }
        else if (input === "s") {
            game.stay();
        }
        else {
            console.log("Invalid respond. Go hit something or stay where you are.");
        }

        game.checkWin();
        game.checkLost();
    }
}