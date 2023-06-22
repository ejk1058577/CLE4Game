import '../css/style.css'
import { Actor, Engine, Vector, Shape, Text,Font,Color} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {player} from "./player.js";
import {Food} from "./food.js"

import {Spawner} from "./spawner.js";
import {HumanSpawner} from "./humanSpawner.js";
import {Human} from "./human.js";
import {Nest} from "./nest.js";
import {Ground} from "./Ground.js";
import {UI} from "./UI.js";
import {Arrow} from "./Arrow.js";
import { Arcade } from "arcade-game"
import {PlayerInput} from "./playerInput.js";
import { gameScene } from './gameScene.js'
import { menuScene } from './menuScene.js';
import { gameoverScene } from './gameoverScene.js';


export class Game extends Engine {

    playerPos;

    plInput;
    pl;
    nest;

    humanSpawner;
    #arcade;
    #joyStickListener;

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.add('gameScene', new gameScene())   
        this.add('menuScene', new menuScene())
        this.add('gameoverScene', new gameoverScene())

        this.goToScene('menuScene')
        // this.goToScene('gameScene')

        // console.log("start")
        // this.plInput = new PlayerInput();
        // this.add(this.plInput);
        // //ui
        // this.ui = new UI();
        // this.ui.z = 1000;
        // this.add(this.ui);

        //#arcade controls
        console.log("loading #arcade controls");
        this.#arcade = new Arcade(this, false, true);
        this.#joyStickListener = (e) => this.#joyStickFound(e);
        document.addEventListener("joystickcreated",  this.#joyStickListener); //this listener does not work.
        //setTimeout(this.#joyStickListener, 5000); used this for debugging.

        // this.pl = new player();
        // this.pl.pos=new Vector(32*128,32*128)
        // this.add(this.pl);
        // this.playerPos=this.pl.pos;

        // this.currentScene.camera.strategy.radiusAroundActor(this.pl,64)
        // this.humansSpawner =new HumanSpawner(30); //new Spawner(30,Human,{},new Vector(128*64,128*64),new Vector(0,0));
        // this.add(this.humansSpawner);

        // this.nest = new Nest();
        // this.add(this.nest);
        // this.add(new Ground())

        // this.add(new Arrow(this.pl,this.nest))

        // this.add('menuScene', new menuScene())
        // this.add('gameoverScene', new gameoverScene())
    }

    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        //this.playerPos = this.pl.pos;
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
