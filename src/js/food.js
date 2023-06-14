import {Actor, Vector, Input, clamp, CollisionType, Shape} from "excalibur";
import {Resources} from "./resources.js";
export class Food extends Actor {
    id;

    constructor(options, id) {
        super(options);
        this.id = id;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        const box = Shape.Box(100, 100);
        this.collider.set(box);
        this.body.collisionType = CollisionType.Passive;

        let sprite = Resources.Fish.toSprite();
        sprite.flipHorizontal=true;
        this.graphics.use(sprite);

        console.log(`trying width is ${this.width}`)
    }

    pickup(player) {
        player.inventory = this.id;
        this.kill();
    }
}