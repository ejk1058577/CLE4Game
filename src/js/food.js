import {Actor, Vector, Input, clamp, CollisionType, Shape} from "excalibur";
import {Resources} from "./resources.js";
import {fallingObject} from "./fallingObject.js";
import {Human} from "./human.js";
export class Food extends fallingObject {
    foodId;
    spawner;
    isFalling;
    fallingTimer;

    constructor(data) {
        super(new Vector(0.25, 0.25), new Vector(0.5, 0.5), 1);
        this.foodId = data.id;
        this.height=0;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.z =0;
        const circle = Shape.Circle(64)
        this.collider.set(circle);
        this.body.collisionType = CollisionType.Passive;
        this.scale=new Vector(0.25,0.25);
        if(this.foodId==1)
        {
            let sprite = Resources.Stick.toSprite();
            this.graphics.use(sprite);
        }
        else
        {
            let sprite = Resources.Fish.toSprite();
            this.graphics.use(sprite);
        }

        this.z = 0;
        this.scale=this.minScale;
        this.fallingTimer = 1;
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);

        if (this.isFalling) {
            this.fall(_delta / 1000);
        }
    }

    pickup(player) {
        player.inventory = this.foodId;
        this.kill();
    }
    onPreKill(_scene) {
        super.onPreKill(_scene);
        if (this.spawner != null) {
            this.spawner.currentAmount--;
        }
    }

    fall(delta) {
        this.fallingTimer -= delta;
        this.height = clamp(Math.abs(this.fallingTimer),0,1);
        //console.log(this.fallingTimer);
        if(this.fallingTimer<0.4)
        {
            this.on("precollision", event => this.humanDropItem(event))
        }
        if(this.fallingTimer<0)
        {
           // this.fallingTimer=1;
            this.isFalling=false;
            this.kill();
        }
    }
    humanDropItem(event)
    {
        if(event.other instanceof Human)
        {
            this.kill();
            console.log("humanAttacked")
            event.other.dropItem();
        }
    }
}