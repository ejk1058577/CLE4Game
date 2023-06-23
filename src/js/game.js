import '../css/style.css'
import { Engine, Input} from "excalibur"
import { ResourceLoader } from './resources.js'
import {Ground} from "./Ground.js";
import { Arcade } from "arcade-game"
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

    username;

    constructor(options) {
        super(options)
        this.start(ResourceLoader).then(() => this.startGame())
        this.username = 'Guest';
    }

    startGame() {
        document.addEventListener("keydown", this.preventSpace)
        this.add('gameScene', new gameScene())   
        this.add('menuScene', new menuScene(this))
        this.add('gameoverScene', new gameoverScene())

        this.goToScene('menuScene')

        //#arcade controls
        console.log("loading #arcade controls");
        this.#arcade = new Arcade(this, false, true);
        this.#joyStickListener = (e) => this.#joyStickFound(e);
        document.addEventListener("joystickcreated",  this.#joyStickListener); //this listener does not work.
        //setTimeout(this.#joyStickListener, 5000); used this for debugging.
        this.add(new Ground())
    }

    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        //this.playerPos = this.pl.pos;
    }

    preventSpace(e)
    {
        e.preventDefault();
    }
    //sample function for debug
    #joyStickFound(e)
    {
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

// Create our game
const game = new Game({
    /**
     * Specify our custom canvas element so Excalibur doesn't make one
     */
    canvasElementId: 'game',
    /**
     * Specify pointer scope to ensure that excalibur won't capture the mouse input
     * meant to be captured by HTML GUI
     */
    pointerScope: Input.PointerScope.Canvas,
    width: 800, 
    height: 600
  })
