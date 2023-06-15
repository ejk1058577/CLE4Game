import {Actor, Vector, Input, clamp, CollisionType, Shape} from "excalibur";
import {Resources} from "./resources.js";
export class Food extends Actor {
    foodId;
    spawner;
    constructor(data) {
        super();
        this.foodId = data.id;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        const box = Shape.Box(100, 100);
        this.collider.set(box);
        this.body.collisionType = CollisionType.Passive;
        this.scale=new Vector(0.25,0.25);
        let sprite = Resources.Fish.toSprite();
        sprite.flipHorizontal=true;
        this.graphics.use(sprite);
        this.z = 0;
    }

    pickup(player) {
        player.inventory = this.foodId;
        this.kill();
    }
    onPreKill(_scene) {
        super.onPreKill(_scene);
        if(this.spawner != null){
        this.spawner.currentAmount--;
        }
    }
}