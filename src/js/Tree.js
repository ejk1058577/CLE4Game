import {Actor, CollisionType, Shape, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Spawner} from "./spawner.js";
import {Food} from "./food.js";

export class Tree extends Spawner
{
    constructor(pos) {
        super(2,Food,{id:1},new Vector(64,64),new Vector(pos.x-32,pos.y-32));
        this.pos = pos;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.addTag("Obstacle");
        this.graphics.use(Resources.Tree.toSprite())
        this.collider.set(Shape.Circle(60)); //Shape.Box(112,112));
        this.body.collisionType = CollisionType.Fixed;
    }
}