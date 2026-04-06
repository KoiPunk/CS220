// https://github.com/KoiPunk/CS220/tree/main/project3
// Project 2, but with no signs of inheritance!
// by Koi Li for CS220

import {Casino} from './casino';
// import * as Game from './game';
// import * as Gambler from './gambler';

const MAX_N_ROUNDS = 5;
const casino = new Casino( MAX_N_ROUNDS );
casino.simulate();
