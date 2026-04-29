/* First file to run when app starts 
 * Grab HTML page and render the main component, App
 */

import "@fontsource/inter";
import 'preact/debug';
import { render } from 'preact';
import App from './app';

// root DOM of HTML
const root = document.getElementById('app');

if (!root) {
	throw new Error("You forgot to put an id=app element in the HTML file lol.");
}

render(<App />, root);