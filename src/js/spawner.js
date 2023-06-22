import {Actor, Random, Vector} from "excalibur";

export class Spawner extends Actor
{
    scene;
    game;
    targetAmount;
    currentAmount;
    spawnObject;
    spawnParam;
    afterBehaviour
    rng

    spawnArea
    spawnOffset

    lastSpawn
    constructor(targetAmount,SpawnObject,SpawnParam,spawnArea,spawnOffset) {
        super();
        this.targetAmount=targetAmount;
        this.currentAmount=0;
        this.spawnObject=SpawnObject;
        this.spawnParam=SpawnParam;
        this.spawnArea=spawnArea;
        this.spawnOffset=spawnOffset;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        console.log("spawner active")
        this.game=_engine;
        this.scene=this.game.currentScene;
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
        let xpos = this.rng.integer(0,this.spawnArea.x)+this.spawnOffset.x;
        let ypos = this.rng.integer(0,this.spawnArea.y)+this.spawnOffset.y;
        spawn.pos = new Vector(xpos,ypos);
        spawn.spawner = this;
        this.scene.add(spawn);
        this.currentAmount++;
        this.lastSpawn=spawn;
        if(this.afterBehaviour != null) {
            this.afterBehaviour()
        }
    }
}