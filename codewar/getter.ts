export class Cuboid {
    length: number;
    width: number;
    height: number;
  
    constructor(length: number, width: number, height: number) {
        this.length = length;
        this.width = width;
        this.height = height;
    }

    get surfaceArea(): number { 
        return ( 2 * (this.length * this.width) 
               + 2 * (this.length * this.height)
               + 2 * (this.width * this.height) );
    }
    get volume(): number { return this.length * this.width * this.height }

}

export class Cube extends Cuboid {
    constructor(length: number) {
        super(length, length, length);
    }
}