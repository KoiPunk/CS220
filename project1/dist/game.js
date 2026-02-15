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
    }
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
            console.log("Invalid game state. You're not supposed to be here.");
    }
    mainMenu() {
    }
    startGame() { }
    continueGame() { }
    closeGame() { }
    /* used to debug only */
    inputGameState(input) {
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
            console.log("\nInvalid game state. You're not supposed to be here.\n");
    }
}
const game = new Game();
// gameplay loop
while (true) {
    const game_state = readline.question("Choose a screen: (m)enu, (w)in, (l)ost, (q)uit\n");
    game.inputGameState(game_state);
    if (game_state == "q")
        break;
}
