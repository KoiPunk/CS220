export class Cube {
  
  private _side: number = 0;

  constructor (i?: number) {
    if (i != undefined)
        this.setSide(i);
  }

  public getSide(): number {
    return this._side;
  }

  public setSide(value: number) {
    this._side = Math.abs(value);
  }
}