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

        //wrapper for buttons
        let wrapperBtn = document.createElement('div');

        //container for scores and stuff
        let container = document.createElement('div');

        //message if not connected
        let disconnectedMessage = document.createElement('p');
        disconnectedMessage.innerHTML = `Couldn't retrieve highscores from servers.`;

        //header with player's score
        let scoreHeader = document.createElement('h1');
        scoreHeader.innerHTML = `Your score: ${this.game.score}`; //TODO load actual score

        //TODO maybe replace this with a table
        //score list
        let scoreList = document.createElement('ol');

        //buttons
        let btnAgain = document.createElement('button');
        btnAgain.innerHTML = 'Play again'
        let btnMenu = document.createElement('button');
        btnMenu.innerHTML = 'Back to Main menu'

        //click events
        btnAgain.onclick = ((e) => {
            e.preventDefault();

            //TODO reset gameScene? && score?
            this.game.goToScene('gameScene');
        });

        btnMenu.onclick = ((e) => {
            e.preventDefault();

            this.game.goToScene('menuScene');
        })

        //styling
        wrapper.className = 'wrapper';
        wrapperBtn.className = 'wrapper-hz';
        container.className = 'container';
        btnAgain.className = 'button';
        btnMenu.className = btnAgain.className;

        //if there's highscores make li-s and add them to ol
        if (this.game.highscore.connected) {
            //TODO check and insert player's score into this
            let scores = this.game.highscore.scores;
            let last = scores[scores.length - 1].score;
            let index = -1;

            if (this.game.score > last) {
                console.log('POSITIVE');


                this.game.highscore.sendScore(this.game.username, this.game.score);

                let scoresArr = scores.map(v => v.score);

                    let sc = this.game.score;
                    for (let i = 0; i < scoresArr.length; i++) {
                        if (sc > scoresArr[i]) {
                            scores.splice(i, 0, {name: this.game.username, score : this.game.score}).slice(1);
                            index = i;
                            break;
                        }
                    }   
            } else if (scores.length < 50) {
                this.game.highscore.sendScore(this.game.username, this.game.score).then((score) => {
                    
                });
                scores.push({name: this.game.username, score : this.game.score});
                index = scores.length - 1;
            }

            scores.forEach( (entry, i) => {
                let li = document.createElement('li');
                li.innerHTML = `${entry.name}:     ${entry.score}`;
                if (index >= 0 && i == index) {
                    li.style.color = 'yellow';
                }
                scoreList.appendChild(li);
            });
        }

        //add elemts to stuff
        wrapper.appendChild(container);
        wrapper.appendChild(wrapperBtn);
        wrapperBtn.appendChild(btnAgain);
        wrapperBtn.appendChild(btnMenu);
        container.appendChild(scoreHeader);

        if (this.game.highscore.connected) {
            container.appendChild(scoreList);
        } else {
            container.appendChild(disconnectedMessage);
        }

        this.menuUI.appendChild(wrapper);
    }

    onDeactivate() {
        // Ensure we cleanup the DOM and remove any children when transitioning scenes
        this.menuUI.classList.remove('gameover');
        this.menuUI.innerHTML = ''
        this.game.highscore.loadScores();
    }
}