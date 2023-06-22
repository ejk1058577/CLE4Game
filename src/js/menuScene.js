import { Scene } from "excalibur";

export class menuScene extends Scene {
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
        this.menuUI.classList.add('mainmenu');

        //wrapper div
        let wrapper = document.createElement('div');

        //logooo
        let logo = document.createElement('img');
        logo.src = './src/images/loadingscreen.png';

        //create input field for username
        let inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.placeholder = 'Guest';

        //create some buttons
        let btnStart = document.createElement('button');
        btnStart.innerHTML = 'Start';
        let btnSettings = document.createElement('button');
        btnSettings.innerHTML = 'Settings ?';
    
        // Style it outside JavaScript for ease of use
        wrapper.className = 'wrapper';
        inputName.className = 'input';
        btnStart.className = 'button';
        btnSettings.className = btnStart.className;
    
        // Handle the DOM click event
        btnStart.onclick = (e) => {
          e.preventDefault()
            
          // Transition the this.game to the new scene
          this.game.goToScene('gameScene');

          if (inputName.value.trim() != '') {
            this.game.username = inputName.value;
          }
        }

        btnSettings.onclick = (e) => {
            e.preventDefault()
              
            console.log('need to show a setting scene?');
          }
    
        // Append to our `this.menuUI` container
        wrapper.appendChild(logo);

        wrapper.appendChild(inputName);
        wrapper.appendChild(btnStart);
        wrapper.appendChild(btnSettings);

        this.menuUI.appendChild(wrapper);
      }
    
      onDeactivate() {
        // Ensure we cleanup the DOM and remove any children when transitioning scenes
        this.menuUI.classList.remove('mainmenu');
        this.menuUI.innerHTML = ''
      }
}