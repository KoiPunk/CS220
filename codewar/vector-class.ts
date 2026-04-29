export class Vector {

    _v: number[];
  
    constructor(components: number[]) {
        this._v = components;
    }

    add(u: Vector): Vector {
        if (this._v.length != u._v.length)
            throw new Error("vectors are different length");
        
        const result = new Array<number>(this._v.length);

        for (let i = 0; i < this._v.length; i++) {
            result[i] = this._v[i] + u._v[i];
        }

        return new Vector(result);
    }

    subtract(u: Vector): Vector {
        if (this._v.length != u._v.length)
            throw new Error("vectors are different length");
        
        const result = new Array<number>(this._v.length);

        for (let i = 0; i < this._v.length; i++) {
            result[i] = this._v[i] - u._v[i];
        }

        return new Vector(result);
    }

    dot(u: Vector): number {
        if (this._v.length != u._v.length)
            throw new Error("vectors are different length");
        
        let result: number = 0;
        
        for (let i = 0; i < this._v.length; i++) {
            result += this._v[i] * u._v[i];
        }

        return result;
    }

    norm(): number {
        let result: number = 0;

        for (let i = 0; i < this._v.length; i++) {
            result += Math.pow(this._v[i], 2);
        }

        return Math.sqrt(result);
    }

    equals(u: Vector): boolean {
        // if (this._v.length != u._v.length)
        //     throw new Error("vectors are different length");

        for (let i = 0; i < this._v.length; i++) {
            if (this._v[0] != u._v[0])
                return false;
        }

        return true;
    }

    toString(): string {
        let result: string = "(";

        for (let i = 0; i < this._v.length - 1; i++) {
            result += this._v[i].toString() + ",";
        }

        result += this._v[this._v.length - 1].toString() + ")";

        return result;
    }
};
