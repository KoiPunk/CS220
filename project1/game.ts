import * as readline from 'readline-sync';
import { TUI } from './tui';

enum GameState {
    Menu = "menu",
    Playing = "playing",
    Win = "win",
    Lost = "lost",
}

class Game {

    private tui: TUI = new TUI;
    private game_state: GameState = GameState.Menu;

    /* 
    call appropriate methods based on your game state 
    */
    checkGameState() {
        console.log('');
        // CLEAN: this can be tidied up to look not ugly
        if (this.game_state == GameState.Menu)
            this.tui.printMenu();
        else if (this.game_state == GameState.Playing)
            this.tui.printDeck();
        else if (this.game_state == GameState.Win)
            this.tui.printWin();
        else if (this.game_state == GameState.Lost)
            this.tui.printLost();
        else
            console.log("Invalid game state. You're not supposed to be here.")
    }
    
    mainMenu() {
    }

    startGame() {}

    continueGame() {}

    closeGame() {}

    /* used to debug only */
    inputGameState(input: string) {
        if (input === "m") {
            this.game_state = GameState.Menu;
            this.checkGameState();
        }
        else if (input === 'w') {
            this.game_state = GameState.Win;
            this.checkGameState();
        }
        else if (input === 'l') {
            this.game_state = GameState.Lost;
            this.checkGameState();
        }
        else if (input === 'q') {
            console.log("");
            this.tui.printQuit();
        }
        else
            console.log("\nInvalid game state. You're not supposed to be here.\n")
    }
}



const game = new Game();

// gameplay loop
while (true) {
    const game_state = readline.question( "Choose a screen: (m)enu, (w)in, (l)ost, (q)uit\n" );
    game.inputGameState(game_state);
    
    if (game_state == "q")
        break;
}