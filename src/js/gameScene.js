import { Scene, Actor, Engine, Vector, Shape, Text,Font,Color} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { player } from "./player.js";

import { HumanSpawner } from "./humanSpawner.js";
import { Nest } from "./nest.js";
import { Ground } from "./Ground.js";
import { UI } from "./UI.js";
import { Arrow } from "./Arrow.js";
import { PlayerInput } from "./playerInput.js";

export class gameScene extends Scene {
    title = null;
    playerPos;
    plInput;
    pl;
    nest;
    ui;
    humanSpawner;

    onInitialize(_engine) {
        console.log("start")
        this.plInput = new PlayerInput();
        this.add(this.plInput);

        //ui
        this.ui = new UI();
        this.ui.z = 1000;
        this.add(this.ui);

        this.pl = new player();
        this.pl.pos=new Vector(32*128,32*128)
        this.add(this.pl);
        this.playerPos=this.pl.pos;

        _engine.currentScene.camera.strategy.radiusAroundActor(this.pl,64)
        this.humansSpawner =new HumanSpawner(30); //new Spawner(30,Human,{},new Vector(128*64,128*64),new Vector(0,0));
        this.add(this.humansSpawner);

        this.nest = new Nest();
        this.add(this.nest);
        this.add(new Ground())

        this.add(new Arrow(this.pl,this.nest))
    }
}