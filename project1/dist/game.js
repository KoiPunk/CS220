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
})(GameState || (GameState = {}));
class Game {
    constructor() {
        this.tui = new tui_1.TUI;
        this.game_state = GameState.Menu;
        this.deck = new deck_1.Deck;
    }
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
            console.log("Invalid game state. You're not supposed to be here.");
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
    checkWin() { }
    checkLost() { }
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
