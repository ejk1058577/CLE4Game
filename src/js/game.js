import '../css/style.css'
import { Actor, Engine, Vector, Shape } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {player} from "./player.js";
import {Food} from "./food.js"

import {Spawner} from "./spawner.js";
import {HumanMenager} from "./humanMenager.js";
import {Human} from "./human.js";

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start")
        let pl = new player()
        pl.pos=new Vector(400,300);
        this.add(pl);
        let sp = new Spawner(20,Food,{id:1})
        this.add(sp);
        let humansSpawner = new Spawner(5,Human,);
        this.add(humansSpawner);
      //  this.showDebug(true);
    }
}

new Game()
