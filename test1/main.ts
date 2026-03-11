/*
 * // (20 points) add comments to each class, field, and method definition to help me understand what it represents. 
 * // Add a comment to the top of your program describing your domain and the problem you are trying to solve.
 * 
 * This is an abstraction for a possible turn-based RPG game where the player fight ten slimes 
 * that will either move or attack depending on the RNG.
 * 
 * The problem this program solve is how polymorphism and abstraction may be used to define game entities.
 * 
 * By Koi Li for CS220
*/

// (10 points) Identify and create 1 abstract class
abstract class Entity {
    name: string;
    hp: number;
    speed: number;

    constructor(name: string, hp: number, speed: number) {
        this.name = name;
        this.hp = hp;
        this.speed = speed;
    }

    // (10 points) Must have at least one abstract method
    abstract move(): void;
    abstract interact(): void;
}


// (40 points) Identify and design 2 concrete classes
// (10 points) These classes must extend the abstract class or implement the interface
class Player extends Entity {
    // (20 points) At least one private field and one public method
    private _weapon: string; // this would probably be a class realistically
    
    // (20 points) Both classes must have a constructor that initializes the private fields
    constructor() {
        super("Player", 100, 2);
        this._weapon = "Wooden Stick";
    }

    // (10 points) Inside the overridden method, you must print a message
    // maybe takes in an enum for direction
    override move(): void {
        console.log("Character moved towards the slime.");
    }

    // maybe takes in an enum for type of interaction:
    // talk, attack, pick up...
    override interact(): void {
        console.log("Player is going to do something:")
        this.attack();
    }

    attack(): void {
        console.log("Player attacked!");
    }
}


class Slime extends Entity {
    private _level: number;
    
    constructor() {
        super("Slime", 20, 3);
        this._level = 1;
    }

    // (10 points) You must override the methods necessary to make this work
    // (10 points) The message that gets printed must be different for each concrete class.
    override move(): void {
        console.log("Slime moved towards the player.")
    }

    // slimes can only attack people and dance... they are but a souless homunculus
    override interact(): void {
        console.log("Slime did the following actions:");

        // randomly decide if Slime will dance or attack
        let rng: number = Math.random();

        if (rng >= .5)
            this.attack();
        else
            this.dance();        
    }

    attack(): void {
        console.log("Slime attacked!");
    }

    dance(): void {
        console.log("Slime did a little dance~");
    }
}

// (20 points) Create an array of length 10. The type of the array must be Array<AbstractClass>
let totalEntity: Entity[] = new Array<Entity>(10);

totalEntity[0] = new Player();

for (let i = 1; i < 10; i++) {
    // (20 points) Each element of the array must be an instance of one of your concrete classes. 
    totalEntity[i] = new Slime();
}

// (20 points) You must iterate over each element of the array using a for-loop.
for (let i = 0; i < 10; i++) {
    let rng: number = Math.random();

    // (20 points) When you do so, call the abstract method inside. This should print something to the console for each instance inside the array. 
    if (rng >= .5)
        totalEntity[i].move();
    else
        totalEntity[i].interact();
    console.log("");
}
