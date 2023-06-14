import '../css/style.css'
import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {player} from "./player.js";

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
    }
}

new Game()
