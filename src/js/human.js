import {Actor, Ray, Shape, Vector} from "excalibur";
import {Resources} from "./resources.js";

export class Human extends Actor
{
    spawner
    game
    angle

    inventory

    constructor() {
        super();
    }
    onInitialize(_engine) {
        console.log("Im a Human")
        super.onInitialize(_engine);
        this.graphics.use(Resources.Human.toSprite());
        this.collider.set(Shape.Circle(64))
        this.angle=Math.random()*Math.PI*2;
        this.z = 1;
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.move();
    }
    avoidObst()
    {

    }
    move() {
        //rotate player
        this.transform.rotation = this.angle;
        //recalculate forward velocity of the player
        let forward = new Vector(Math.cos(this.angle) * 150, Math.sin(this.angle) * 150)
        this.vel = forward;
    }
    dropItem()
    {

    }
    distSquared(a,b)
    {
        let dx = a.x-b.x;
        let dy = a.y-b.y;
        return dx*dx+dy*dy;
    }
}