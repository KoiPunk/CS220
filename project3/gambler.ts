
export interface Gambler {
    _properties: SharedGambler;
    getBetSize(): number;
    
}

/* All the shared properties and methods each gambler has. */
class SharedGambler {
    private _name: string;
    private _money: number;
    private _target: number; // how much money the gambler is trying to get

    public constructor( name: string, startingFunds: number, targetFunds: number ) {
        this._name = name;
        this._money = startingFunds;
        this._target = targetFunds;
    }

    get name(): string { return this._name }
    get money(): number { return this._money }
    get target(): number { return this._target }
    
    addMoney( amount: number ): void {
        this._money += amount;
    }

    public hitTarget(): boolean { 
        return (this.money >= this.target);
    }

    public bankrupt(): boolean { 
        return (this.money <= 0);
    }

    public isFinished(): boolean { 
        return (this.bankrupt() || this.hitTarget());
    }
}

export class StableGambler implements Gambler {
    _properties: SharedGambler;
    private _bet: number;

    public constructor( name: string, startingFunds: number, stableBet: number) {
        this._properties = new SharedGambler( name, startingFunds, startingFunds * 2 );
        this._bet = stableBet;
    }

    public getBetSize(): number {
        if (this._properties.money < this._bet)
            return this._properties.money;
        return this._bet;
    }
}

export class HighRiskGambler implements Gambler {
    _properties: SharedGambler;
    private _yoloAmount: number;

    public constructor( name: string, startingFunds: number, yoloAmnt: number ) {
        this._properties = new SharedGambler(name, startingFunds, 5 * startingFunds);
        this._yoloAmount = yoloAmnt;
    }

    public getBetSize(): number {
        if (this._properties.money <= this._yoloAmount)
            return this._properties.money;
        // TODO: make sure there won't be a rounding error for this
        return (this._properties.money / 2);
    }
}

export class StreakGambler implements Gambler {
    _properties: SharedGambler;
    private _bet: number;
    private _minBet: number;
    private _winMultiply: number;
    private _loseMultiply: number;

    public constructor( name: string, startingFunds: number, initBet: number, 
                        minBet: number, winMultiply: number, loseMultiply: number, targetFund: number) {
        this._properties = new SharedGambler(name, startingFunds, targetFund);
        this._bet = initBet;
        this._minBet = minBet;
        this._winMultiply = winMultiply;
        this._loseMultiply = loseMultiply;
    }

    public getBetSize(): number {
        if (this._bet >= this._minBet)
            return this._minBet;
        return this._bet;
    }

    addMoney(amount: number): void {
        // call the og. addMoney() anyway
        this._properties.addMoney(amount);

        // winning $$
        if (amount >= 0) {
            this._bet *= this._winMultiply;
        }
        // losing $$
        else {
            this._bet *= this._loseMultiply;
        }
    }
}
