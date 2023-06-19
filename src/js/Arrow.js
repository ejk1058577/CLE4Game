import {Actor, Vector} from "excalibur";
import {Resources} from "./resources.js";

export class Arrow extends Actor
{
    current
    destination

    constructor(current,destination) {
        super();
        this.current=current;
        this.destination=destination;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.graphics.use(Resources.arrow.toSprite());
        this.z = 50
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        let dir = new Vector(this.destination.pos.x-this.current.pos.x,this.destination.pos.y-this.current.pos.y).normalize();
        let angle = dir.toAngle()
        this.rotation=angle;
        this.pos = new Vector(this.current.pos.x+dir.x*64,this.current.pos.y+dir.y*64);
     //   console.log(this.pos)
    }

}