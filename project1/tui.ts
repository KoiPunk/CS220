import * as fs from 'fs';

/*
Methods that print the game TUI sceens!
*/
export class TUI {
		
	printMenu() {
        const input_file_path: string = 'tui/menu.txt';
        const content: string = fs.readFileSync(input_file_path, 'utf-8');
        console.log(content);
    }

	printWin() {
        const input_file_path: string = 'tui/win.txt';
        const content: string = fs.readFileSync(input_file_path, 'utf-8');
        console.log(content);
    }

    printLost() {
        const input_file_path: string = 'tui/lost.txt';
        const content: string = fs.readFileSync(input_file_path, 'utf-8');
        console.log(content);
    }

    printQuit() {
        const input_file_path: string = 'tui/quit.txt';
        const content: string = fs.readFileSync(input_file_path, 'utf-8');
        console.log(content);
    }
}