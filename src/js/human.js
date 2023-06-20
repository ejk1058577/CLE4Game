import {Actor, CollisionType, GraphicsGroup, Random, Shape, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Food} from "./food.js";
import {FoodManager} from "./foodManager.js";

export class Human extends Actor
{
    spawner
    game
    angle
    lastPos
    inventory

    rng

    minFoodId=2;
    maxFoodId=4;

    foodHolder
    foodOffsetAngle = 1;
    foodOffsetDistance = 25;

    constructor() {
        super();

    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.inventory = 2;
        this.rng = new Random();
        this.inventory = this.rng.integer(this.minFoodId,this.maxFoodId)
        this.game=_engine;
        this.graphics.use(Resources.Human.toSprite());

        this.collider.set(Shape.Circle(64))
        this.body.collisionType = CollisionType.Active;
        this.angle=(2*Math.random()-1)*Math.PI*2;
        this.transform.rotation = this.angle;
        this.z = 1;

        this.foodHolder=new Actor();
        this.foodHolder.scale=new Vector(0.65,0.65);
        this.scene.add(this.foodHolder);

        this.InventoryGraphic();
        //this.on("exitviewport", event => this.kill());
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.move(_delta/1000);
        if(Vector.distance(this.pos,this.game.playerPos)>1400)
        {
            this.kill();
        }
    }
    move(delta) {
        //rotate player
        if(this.lastPos != null) {
            let posDir = new Vector(this.pos.x - this.lastPos.x, this.pos.y - this.lastPos.y).normalize();
            //console.log(posDir);
            let dot = posDir.toAngle();
            this.angle = this.lerp(this.angle,dot,delta*5)
        }
        else
        {
            this.lastPos=new Vector(0,0);
        }
        this.transform.rotation = this.angle;
        let forward = new Vector(Math.cos(this.angle) * 50, Math.sin(this.angle) * 50)
        this.vel = forward;
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;

        this.foodHolder.rotation=this.angle;
        let Offset = new Vector(Math.cos(this.angle+this.foodOffsetAngle)*this.foodOffsetDistance,Math.sin(this.angle+this.foodOffsetAngle)*this.foodOffsetDistance);
        this.foodHolder.pos = new Vector(Offset.x+this.pos.x,Offset.y+this.pos.y);
    }
    _prekill(_scene) {
        super._prekill(_scene);
        this.spawner.currentAmount--;
        this.foodHolder.kill();
    }

    dropItem()
    {
        if(this.inventory>0)
        {
            let droppedFood = new Food({id:this.inventory})
            droppedFood.pos=this.pos;
            this.scene.add(droppedFood);
            this.inventory=0;
            this.InventoryGraphic()
        }
    }
    lerp(a,b,t)
    {
        let v = a+t*(b-a);
        return v;
    }

    InventoryGraphic()
    {
     this.foodHolder.graphics.use(FoodManager.GetFoodData(this.inventory));
    }
}