import {Resources} from "./resources.js";
import {SpriteSheet} from "excalibur";
export class FoodManager
{
    static spriteSheet = SpriteSheet.fromImageSource({
        image:Resources.Food,
        grid:{rows: 2,
            columns: 2,
            spriteWidth: 64,
            spriteHeight: 64},
    });
    static xSprites=2;
    static ySprites=2;
    static minId=2
    static maxID=4
    static GetFoodData(foodIndex)
    {
        foodIndex--;
       let y = foodIndex%this.ySprites;
       let x = (foodIndex-y)/this.xSprites
     //   console.log(x,y);
        return this.spriteSheet.getSprite(x,y);
    }
}