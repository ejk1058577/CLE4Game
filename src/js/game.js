import '../css/style.css'
import { Actor, Engine, Vector, Shape, Text,Font,Color} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {player} from "./player.js";
import {Food} from "./food.js"

import {Spawner} from "./spawner.js";
import {HumanMenager} from "./humanMenager.js";
import {Human} from "./human.js";
import {Nest} from "./nest.js";
import {Ground} from "./Ground.js";
import {UI} from "./UI.js";
import {Arrow} from "./Arrow.js";

export class Game extends Engine {

    playerPos;
    pl
    nest
    ui

    mousePos;
    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())

    }

    startGame() {
        console.log("start")
        this.mousePos= new Vector(0,0);
        this.ui = new UI();
        this.ui.z = 1000;
        this.add(this.ui);

        this.pl = new player();
        this.pl.pos=new Vector(32*128,32*128)
        this.add(this.pl);
        this.playerPos=this.pl.pos;

        this.currentScene.camera.strategy.radiusAroundActor(this.pl,64)
        let humansSpawner = new Spawner(30,Human,{},new Vector(128*64,128*64),new Vector(0,0));
        this.add(humansSpawner);

        this.nest = new Nest();
        this.add(this.nest);
        this.add(new Ground())

        this.add(new Arrow(this.pl,this.nest))
    }
    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        this.playerPos = this.pl.pos

    }
}

 new Game();

