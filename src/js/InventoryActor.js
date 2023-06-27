import {MovingActor} from "./MovingActor.js";
import {Food} from "./food.js";
import {Actor, Vector} from "excalibur";
import {FoodManager} from "./foodManager.js";
import {Resources} from "./resources.js";

export class InventoryActor extends MovingActor
{
    Display
    displayAngle;
    displayDistance;
    inventory
    constructor() {
        super();
        this.inventory=0;
        this.displayDistance=0;
        this.displayAngle=0;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.Display=new MovingActor()
        this.Display.useHeight=true;
        this.Display.gravity=0;

        this.Display.pos = this.pos;
        this.Display.z=4;
        // this.Display.graphics.use(Resources.Fish.toSprite());
        this.scene.add(this.Display);
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        let offset = new Vector(Math.cos(this.angle+this.displayAngle)*this.displayDistance,Math.sin(this.angle+this.displayAngle)*this.displayDistance);
        this.Display.pos = new Vector(offset.x+this.pos.x,offset.y+this.pos.y);
        this.Display.vel=this.vel;
        this.Display.rotation=this.angle;
        this.Display.height=this.height;
    }
    getItem(itemID)
    {
        this.inventory=itemID;
        this.DisplayItem()
    }
    dropItem(dropVel,dropHeight,destroyOnFall,canHit)
    {
        let foodActor = new Food({id: this.inventory});
        foodActor.isFalling=true;
        foodActor.pos=this.Display.pos;
        this.inventory = 0;
        this.DisplayItem();
        foodActor.height=dropHeight;
        foodActor.fallDestroy = destroyOnFall;
        foodActor.canHit = canHit;
        if(dropVel)
        {
            let x = (Math.random()*2-1)*150
            let y = (Math.random()*2-1)*150
            foodActor.targetVel=new Vector(0,0);
            foodActor.vel=new Vector(x,y);
            foodActor.acceleration=2;
            foodActor.useTargetVel=true;
        }
        this.scene.add(foodActor);
    }
    DisplayItem()
    {
        switch (this.inventory)
        {
            case 0:this.Display.graphics.use(Resources.empty.toSprite());
                break;
            default:this.Display.graphics.use(FoodManager.GetFoodData(this.inventory));
        }
    }
}