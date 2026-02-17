"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline-sync"));
const tui_1 = require("./tui");
const deck_1 = require("./deck");
var GameState;
(function (GameState) {
    GameState["Menu"] = "menu";
    GameState["Playing"] = "playing";
    GameState["Win"] = "win";
    GameState["Lost"] = "lost";
    GameState["Push"] = "push";
})(GameState || (GameState = {}));
class Game {
    constructor() {
        this.tui = new tui_1.TUI;
        this.game_state = GameState.Menu;
        this.deck = new deck_1.Deck;
    }
    /*
    print tui based on your game state
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
        else if (this.game_state === GameState.Push)
            this.tui.printPush();
        else
            console.log("Invalid game state. You're not supposed to be here.");
    }
    /*
    the player hits!
    */
    hit() {
        this.deck.hit("p");
        // if Black Jack: player automatically stay
        if (this.deck.getScore("p") === 21) {
            this.printGame();
            this.stay();
        }
        if (game.checkWin())
            return;
        game.checkLost();
    }
    /*
    the player stays! Player control end. dealer'sturn
    */
    stay() {
        // show dealer's cards
        this.deck.showAllCard();
        // dealer must hit until score => 17
        while (this.deck.getScore('d') < 17)
            this.deck.hit('d');
        // if dealer doesnt bust, check who has highest score
        if (!this.checkWin())
            this.checkEnd();
    }
    /*
    update game state at the end of game based on who have the highest score
    I wanted this to be in checkWin() since that make more sense,
    but because of the way my game loop works, this is just easier
    */
    checkEnd() {
        // player win
        if (this.deck.getScore('p') > this.deck.getScore('d')) {
            this.printGame();
            this.game_state = GameState.Win;
        }
        // dealer win
        else if (this.deck.getScore('p') < this.deck.getScore('d')) {
            this.printGame();
            this.game_state = GameState.Lost;
        }
        // tie
        else {
            this.printGame();
            this.game_state = GameState.Push;
        }
    }
    /*
    print last tui of deck and update game state if player won
    return true if player automatically won, false if not yet
    */
    checkWin() {
        // dealer bust
        if (this.deck.getScore("d") > 21) {
            // prevents winning game from printing twice
            if (this.game_state !== GameState.Win)
                this.printGame();
            this.game_state = GameState.Win;
            return true;
        }
        return false;
    }
    /*
    print last tui of deck and update game state if player lost.
    */
    checkLost() {
        // check if player bust
        if (this.deck.getScore("p") > 21) {
            this.printGame();
            this.game_state = GameState.Lost;
        }
    }
    startGame() {
        this.game_state = GameState.Playing;
        this.deck.newHand();
        this.deck.shuffleDeck();
        // refresh deck when below 30 cards
        if (this.deck.getDeckSize() < 30)
            this.deck.newDeck();
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
    // player is in any menu
    if ((game.getState() === GameState.Menu) || (game.getState() === GameState.Win) || (game.getState() === GameState.Lost) || (game.getState() === GameState.Push)) {
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
    }
}
