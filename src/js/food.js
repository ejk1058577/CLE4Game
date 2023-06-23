import {Actor, Vector, Input, clamp, CollisionType, Shape} from "excalibur";
import {Resources} from "./resources.js";
import {fallingObject} from "./fallingObject.js";
import {Human} from "./human.js";
import {FoodManager} from "./foodManager.js";
import {MovingActor} from "./MovingActor.js";
export class Food extends MovingActor{
    foodId;
    spawner;
    fallDestroy;
    canHit;
    isFalling;

    constructor(data) {
        super();
        this.foodId = data.id;
<<<<<<< Updated upstream
=======
        this.height = data.startHeight;
        this.minHeight=data.minHeight;
>>>>>>> Stashed changes
        this.useHeight=true;
        this.minScale=new Vector(0.4,0.4)
        this.maxScale=new Vector(0.75,0.75)
        this.gravity=1;
        this.isFalling = false;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.z = 0;
        const circle = Shape.Circle(64)
        this.collider.set(circle);
        this.body.collisionType = CollisionType.Passive;
        this.scale = new Vector(0.25, 0.25);
        let sprite = FoodManager.GetFoodData(this.foodId);
        this.graphics.use(sprite);
        this.z = 0;
<<<<<<< Updated upstream
        this.scale=this.minScale;
=======
        this.scale=new Vector(0.6,0.6);
        this.on("collisionstart",event =>this.artificialCollision(event))
>>>>>>> Stashed changes
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);

        if (this.isFalling)
        {
            this.fall(_delta / 1000);
        }
<<<<<<< Updated upstream
=======
      //  console.log(this.height);
        this.z = Math.round(9*this.height);
>>>>>>> Stashed changes
    }

    pickup(player) {
        player.getItem(this.foodId);
        this.kill();
    }
    onPreKill(_scene) {
        super.onPreKill(_scene);
        if (this.spawner != null) {
            this.spawner.currentAmount--;
        }
    }

    fall(delta) {
        //console.log(this.fallingTimer);
        if(this.height<0.4)
        {
            if(this.canHit)
            {
                this.on("precollision", event => this.humanDropItem(event))
            }
        }
        if(this.height<=0.05)
        {
            this.isFalling=false;
            if(this.fallDestroy)
            {
                this.kill();
            }
        }
    }
    humanDropItem(event)
    {
        if(event.other instanceof Human)
        {
                this.kill();
                console.log("humanAttacked")
                event.other.speed=-100;
                event.other.dropItem(true,0.4,false,false);
        }
    }
}