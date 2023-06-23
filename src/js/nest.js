import {Actor, Engine, Random, Shape, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {player} from "./player.js";
import {FoodManager} from "./foodManager.js";
import {Ground} from "./Ground.js";
import { UI } from "./UI.js";

import { gameoverScene } from "./gameoverScene.js";

export class Nest extends Actor
{
    scene;
    game;
    requestedItems;
    timers;
    score;
    rng
    deliveryTime=30
    constructor() {
        super();
        this.pos=new Vector(3*Ground.spacing,3*Ground.spacing)
        this.score=0
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.game = _engine;
        this.scene = this.game.currentScene;
        this.UI = new UI();
        this.rng = new Random();
        this.requestedItems=[-1,-1,-1];
        this.timers = [1,1,1];
        this.RequestNewItem(0);
        //this.RequestNewItem(1);
        //this.RequestNewItem(2);
        this.graphics.use(Resources.Nest.toSprite())
        this.collider.set(Shape.Circle(50))
        this.on("collisionstart",event => this.CheckFoodItems(event))
        this.z = 9;
    }
    onPreUpdate(_engine, _delta){
        super.onPreUpdate(_engine, _delta);
        this.timers[0]-=(_delta/1000)/this.deliveryTime;
        this.scene.ui.updTimebar(this.timers[0]);
        if(this.timers[0] <= 0) {
            //console.log('TIME IS LOWER THAN 0');
            _engine.goToScene('gameoverScene');
        }
    }

    RequestNewItem(slot)
    {
        this.requestedItems[slot]= this.rng.integer(FoodManager.minId,FoodManager.maxID)
        console.log(this.requestedItems[slot]);
        this.scene.ui.changeRequestDisplay(this.requestedItems[slot]);
        //console.log(this.game.ui.requestItem);
    }

    CheckFoodItems(event)
    {
        if(event.other instanceof player)
        {
            if(event.other.inventory>1)
            {

                for(let i =0;i<this.requestedItems.length;i++)
                {
                    if(this.requestedItems[i]==event.other.inventory) {
                        this.timers[i]=1;

                        event.other.inventory = 0;
                        event.other.DisplayItem();
                        console.log("delivered food")
                        this.score++;
                        this.game.score = this.score;
                        this.scene.ui.scoreText.text = this.score.toString();
                        this.RequestNewItem(i);
                        break;
                    }
                }
            }
        }
    }
}