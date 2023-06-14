import '../css/style.css'
import { Actor, Engine, Vector, Shape } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {player} from "./player.js";
import {Food} from "./food.js"

import { DevTool } from '@excaliburjs/dev-tools';

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start")
        const box = Shape.Box(100, 10)

        let pl = new player({
            width:100,
            height: 100,
        });
        pl.pos=new Vector(400,300);
        this.add(pl);

        let food = new Food({
            height: 50,
            width: 50,
        }, 1);
        food.pos = new Vector(450, 350);
        this.add(food);
    }
}

const devtool = new DevTool(new Game());
