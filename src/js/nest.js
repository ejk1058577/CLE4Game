import {Actor, Shape,Vector} from "excalibur";
import {Resources} from "./resources.js";
import {player} from "./player.js";

export class Nest extends Actor
{
    game
    requestedItems;
    score;
    constructor() {
        super();
        this.pos=new Vector(32*128,32*128)
        this.score = 0;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.game = _engine;
        this.graphics.use(Resources.Nest.toSprite())
        this.collider.set(Shape.Circle(50))
        this.on("collisionstart",event => this.CheckFoodItems(event))
        this.z = 1;
    }
    CheckFoodItems(event)
    {
        if(event.other instanceof player)
        {
            if(event.other.inventory>1)
            {
                event.other.inventory=0;
                event.other.displayItemHeld();
                console.log("delivered food")
                this.score++;
                this.game.ui.scoreText.text =this.score.toString();
            }
        }
    }
}