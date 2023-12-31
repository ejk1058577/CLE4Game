import {ScreenElement,Vector,Text,Font,FontUnit,Color,GraphicsGroup} from "excalibur";
import {Arrow} from "./Arrow.js";
export class UI extends ScreenElement {

    game
    scoreText

    constructor() {
        super({ x:0, y:0 })
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

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: this.scoreText,
                    pos: new Vector(400, 100),
                },
            ],
        })
        this.graphics.use(group)
    }

    updateScore() {
        this.scoreText.text = `Score: 200`
    }
}
