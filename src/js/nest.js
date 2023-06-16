import {Actor, Shape,Vector} from "excalibur";
import {Resources} from "./resources.js";
import {player} from "./player.js";

export class Nest extends Actor
{
    requestedItems;
    constructor() {
        super();
        this.pos=new Vector(32*128,32*128)
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
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
            }
        }
    }
}