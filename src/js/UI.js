import {ScreenElement, Vector, Text, Font, FontUnit, Color, GraphicsGroup, Actor, Rectangle} from "excalibur";
import {Arrow} from "./Arrow.js";

import {Resources} from "./resources.js";
import {FoodManager} from "./foodManager.js";

export class UI extends ScreenElement {

    game
    scoreText

    requestItem

    timeBar;

    constructor() {
        super({ x:90, y:64 })
    }

    onInitialize(engine) {
        this.scoreText = new Text({
            text: '0',
            font: new Font({
                unit: FontUnit.Px,
                family: 'PressStart',
                size: 60,
            }),
            color:Color.White
        })
        this.requestItem=FoodManager.GetFoodData(1);
        this.timeBar = new Rectangle({width:300,height:20,color:Color.Green})
        let group = new GraphicsGroup({
            members: [
                {
                    graphic: this.scoreText,
                    pos: new Vector(400, 64),
                },
                {
                    graphic: this.requestItem,
                    pos: new Vector(10,10),
                    scale:new Vector(0.5,0.5)
                },
                {
                    graphic:this.timeBar,
                    pos:new Vector(80,32)
                }
            ],
        })
        this.graphics.use(group)
    }

    changeRequestDisplay(foodID)
    {
        this.requestItem=FoodManager.GetFoodData(foodID);
        let group = new GraphicsGroup({
            members: [
                {
                    graphic: this.scoreText,
                    pos: new Vector(400, 64),
                },
                {
                    graphic: this.requestItem,
                    pos: new Vector(10,10),
                    scale:new Vector(0.5,0.5)
                },
                {
                    graphic:this.timeBar,
                    pos:new Vector(80,32)

                }
            ],
        })
        this.graphics.use(group);
    }
    updTimebar(time)
    {
        time = Math.max(0,time);
        this.timeBar.width = 300*time;
    }
}
