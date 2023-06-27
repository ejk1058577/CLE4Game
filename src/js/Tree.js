import {Actor, CollisionType, Shape, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Spawner} from "./spawner.js";
import {Food} from "./food.js";

export class Tree extends Spawner {
    height=0.5
    constructor(pos)
    {
        super(2,Food,{id:1,startHeight:0.5,minHeight:0.5},new Vector(64,64),new Vector(pos.x-32,pos.y-32));
        this.pos = pos;
    }
    onInitialize(_engine) {
        this.rotation = Math.ceil( Math.random()*4)*0.5*Math.PI;
        super.onInitialize(_engine);
        this.graphics.use(Resources.Tree.toSprite())
        this.collider.set(Shape.Circle(60)); //Shape.Box(112,112));
        this.body.collisionType = CollisionType.Fixed;
    }
}