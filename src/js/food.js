import {Actor, Vector, Input, clamp, CollisionType, Shape} from "excalibur";
import {Resources} from "./resources.js";
export class Food extends Actor {
    foodId;
    spawner

    constructor(data) {
        super();
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
        this.scale=new Vector(0.25,0.25)

      //  console.log(`trying width is ${this.width}`)
    }

    pickup(player) {
        player.inventory = this.id;
        this.kill();
    }
    _prekill(_scene) {
        super._prekill(_scene);
        this.spawner.currentAmount--;
    }
}