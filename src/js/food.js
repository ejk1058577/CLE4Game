import {Actor, Vector, Input, clamp, CollisionType, Shape} from "excalibur";
import {Resources} from "./resources.js";
import { fallingObject } from "./fallingObject.js";
export class Food extends fallingObject {
    foodId;
    spawner;
    isFalling;
    fallingTimer;

    constructor(data) {
        super(new Vector(0.12, 0.12), new Vector(0.25, 0.25), 1);
        this.foodId = data.id;

    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.z =0;
        const box = Shape.Box(100, 100);
        this.collider.set(box);
        this.body.collisionType = CollisionType.Passive;

        let sprite = Resources.Fish.toSprite();
        sprite.flipHorizontal=true;
        this.graphics.use(sprite);
        this.scale=this.maxScale;

        this.fallingTimer = -1;

      //  console.log(`trying width is ${this.width}`)
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);

        if (this.isFalling) {
            this.fall(_delta / 1000);
        }
    }

    pickup(player) {
        player.inventory = this.id;
        this.kill();
    }
    _prekill(_scene) {
        super._prekill(_scene);
        this.spawner.currentAmount--;
    }

    fall(delta) {
        this.fallingTimer += delta;
        this.height = clamp(Math.abs(this.divingTimer),0,1);
        if(this.fallingTimer>0)
        {
            this.fallingTimer=-1;
            this.isFalling=false;
        }
    }
}