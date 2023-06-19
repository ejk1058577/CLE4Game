import {Actor, Shape,Vector} from "excalibur";
import {Resources} from "./resources.js";
import {player} from "./player.js";
import {FoodManager} from "./foodManager.js";

export class Nest extends Actor
{
    requestedItems;
<<<<<<< Updated upstream
=======
    score;

    minRequestId=2;
    maxRequestId=4;
>>>>>>> Stashed changes
    constructor() {
        super();
        this.pos=new Vector(400,300)
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
<<<<<<< Updated upstream
=======
        this.game = _engine;
        this.requestedItems=[-1,-1,-1];
        this.RequestNewItem(0);
        //this.RequestNewItem(1);
        //this.RequestNewItem(2);
>>>>>>> Stashed changes
        this.graphics.use(Resources.Nest.toSprite())
        this.collider.set(Shape.Circle(50))
        this.on("collisionstart",event => this.CheckFoodItems(event))
        this.z = 1;
    }

    RequestNewItem(slot)
    {
        this.requestedItems[slot]=Math.round(Math.random()*(this.maxRequestId-this.minRequestId))+this.minRequestId;
        console.log(this.requestedItems[slot]);
        this.game.ui.requestItem = FoodManager.GetFoodData(this.requestedItems[slot]);
        console.log(this.game.ui.requestItem);
    }
    CheckFoodItems(event)
    {
        if(event.other instanceof player)
        {
            if(event.other.inventory>0)
            {
<<<<<<< Updated upstream
                event.other.inventory=0;
                console.log("delivered food")
=======
                for(let i =0;i<this.requestedItems.length;i++)
                {
                    if(this.requestedItems[i]==event.other.inventory) {
                        event.other.inventory = 0;
                        event.other.displayItemHeld();
                        console.log("delivered food")
                        this.score++;
                        this.game.ui.scoreText.text = this.score.toString();
                        this.RequestNewItem(i);
                        break;
                    }
                }
>>>>>>> Stashed changes
            }
        }
    }
}