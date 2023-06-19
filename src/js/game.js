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
import { Arcade } from "arcade-game"

export class Game extends Engine {

    playerPos;
    pl;
    nest;
    ui;

    #arcade;
    #joyStickListener;

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
        
    }

    startGame() {
        console.log("start")

        //#arcade controls
        console.log("loading #arcade controls");
        this.#arcade = new Arcade(this, false, true);
        this.#joyStickListener = (e) => this.#joyStickFound(e);
        document.addEventListener("joystickcreated",  this.#joyStickListener); //this listener does not work.
        //setTimeout(this.#joyStickListener, 5000); used this for debugging.

        this.pl = new player();
        this.pl.pos=new Vector(32*128,32*128)
        this.add(this.pl);
        this.playerPos=this.pl.pos;
        this.currentScene.camera.strategy.radiusAroundActor(this.pl,64)
       // let sp = new Spawner(5,Food,{id:1})
        //this.add(sp);
        let humansSpawner = new Spawner(30,Human,{},new Vector(128*64,128*64),new Vector(0,0));
        this.add(humansSpawner);
      //  this.showDebug(true);
        this.nest = new Nest();
        this.add(this.nest);
        this.add(new Ground())

        this.ui = new UI();
        this.ui.z = 1000;
        this.add(this.ui);

        this.add(new Arrow(this.pl,this.nest))
    }
    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        this.playerPos = this.pl.pos;
    }

    //sample function for debug
    #joyStickFound(e) {
        let joystick = this.#arcade.Joysticks[0] //hardcoded zero here for debugging purposes. 
        
        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }
    }

    onPreUpdate(_engine, _delta) {
        for (let joystick of this.#arcade.Joysticks) {
            joystick.update();
        }
    }
 
    disconnect() {
        document.removeEventListener("joystickcreated", this.#joyStickListener)
    }
}


new Game()
