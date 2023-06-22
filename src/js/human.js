import {Actor, CollisionType, GraphicsGroup, Random, Shape, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Food} from "./food.js";
import {FoodManager} from "./foodManager.js";
import {InventoryActor} from "./InventoryActor.js";

export class Human extends InventoryActor
{
    spawner
    game
    angle
    lastPos
    inventory

    rng

    minFoodId=2;
    maxFoodId=4;

    speed=80;
    constructor() {
        super();

    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.height=0.4;
        this.useTargetVel=true;
        this.acceleration=50;
        this.inventory = 2;
        this.rng = new Random();
        this.inventory = this.rng.integer(this.minFoodId,this.maxFoodId)
        this.displayAngle=1;
        this.displayDistance=50;
        this.Display.z=1;
        this.Display.minScale=new Vector(0.4,.4);
        this.Display.maxScale=new Vector(0.75,0.75);
        this.DisplayItem()

        this.game=_engine;
        this.graphics.use(Resources.Human.toSprite());

        this.collider.set(Shape.Circle(64))
        this.body.collisionType = CollisionType.Active;
        this.angle=(2*Math.random()-1)*Math.PI*2;
        this.transform.rotation = this.angle;
        this.z = 2;
        //this.on("exitviewport", event => this.kill());
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.move(_delta/1000);
        if(Vector.distance(this.pos,this.scene.playerPos)>1400)
        {
            this.kill();
        }
    }
    move(delta) {
        this.speed=this.lerp(this.speed,80,this.delta)
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
        this.moveForward(this.speed);
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
    }
    _prekill(_scene) {
        super._prekill(_scene);
        this.spawner.currentAmount--;
        this.Display.kill();
    }
    lerp(a,b,t)
    {
        let v = a+t*(b-a);
        return v;
    }
}