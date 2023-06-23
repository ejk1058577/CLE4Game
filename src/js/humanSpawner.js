import {Spawner} from "./spawner.js";
import {Human} from "./human.js";
import {Vector} from "excalibur";

export class HumanSpawner extends Spawner
{
    constructor(targetAmount) {
    super(targetAmount,Human,{},new Vector(500,500),new Vector(-250,-250));
    this.afterBehaviour=this.HumanSpawnPos;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.humans = [];
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.pos=this.scene.pl.pos;
        this.spawnOffset.x = -250+this.pos.x;
        this.spawnOffset.y = -250+this.pos.y;

    }

    HumanSpawnPos()
    {
      //  console.log("humanChangePos");
        if(this.lastSpawn!=null) {
            let dir = new Vector(this.lastSpawn.pos.x - this.pos.x, this.lastSpawn.pos.y - this.pos.y).normalize();
            let d = Math.random() * 0.5 + 0.5 * 1400;
           // console.log(d);
            dir.x *= d;
            dir.y *= d;
            this.lastSpawn.pos = new Vector(this.pos.x + dir.x, this.pos.y + dir.y);
        }
    }
}