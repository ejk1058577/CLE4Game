import {Actor, Random, Vector} from "excalibur";

export class Spawner extends Actor
{
    game;
    targetAmount;
    currentAmount;
    spawnObject;
    spawnParam;
    afterBehaviour
    rng
    constructor(targetAmount,SpawnObject,SpawnParam) {
        super();
        this.targetAmount=targetAmount;
        this.currentAmount=0;
        this.spawnObject=SpawnObject;
        this.spawnParam=SpawnParam;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        console.log("spawner active")
        this.game=_engine;
        this.rng =new Random()
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(this.currentAmount<this.targetAmount)
        {
            this.spawn()
        }
    }
    spawn()
    {
        let spawn = new this.spawnObject(this.spawnParam);
        let xpos = this.rng.integer(0,800);
        let ypos = this.rng.integer(0,600);
        spawn.pos = new Vector(xpos,ypos);
        spawn.spawner = this;
        this.scene.add(spawn);
        this.currentAmount++;
        if(this.afterBehaviour != null) {
            this.afterBehaviour(spawn)
        }
    }
}