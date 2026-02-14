import * as readline from 'readline-sync';
import { GUI } from './gui';

enum GameState {
    Menu = "menu",
    Playing = "playing",
    Win = "win",
    Lost = "lost",
}

class Game {

    private gui: GUI = new GUI;
    private game_state: GameState = GameState.Menu;

    /* call appropriate methods based on your game state */
    checkGameState() {
        // CHECK: is this allowed?
        if (game_state == GameState.Menu) {
            
        }
    }
    
    mainMenu() {
    }

    startGame() {}

    continueGame() {}

    closeGame() {}
}

const game = new Game();

const game_state = readline.question( "Choose a screen: (m)enu, (w)in, (l)ost \n" );

console.log("you chose:", game_state);

