import { Scene } from "excalibur";

export class gameoverScene extends Scene {
    title = null;
    menuUI;
    game;

    constructor(engine) {
        super(engine);
        this.game = engine;
        this.menuUI = document.getElementById('ui');
    }

    onInitialize() {
        
    }

    onActivate() {
        this.menuUI.classList.add('gameover');

        //wrapper div
        let wrapper = document.createElement('div');

        //container for scores and stuff
        let container = document.createElement('div');

        //message if not connected
        let connectedMessage = document.createElement('p');

        //score list
        let scoreList = document.createElement('ol');
        
    }

    onDeactivate() {
        // Ensure we cleanup the DOM and remove any children when transitioning scenes
        this.menuUI.classList.remove('gameover');
        this.menuUI.innerHTML = ''
      }
}