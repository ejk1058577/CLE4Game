import {Actor, CollisionType, RotateTo, Shape, Vector} from "excalibur";
import {Game} from "./game.js";
import {Human} from "./human.js";
import {Resources} from "./resources.js";
import {MovingActor} from "./MovingActor.js";
import {Food} from "./food.js";
import {FoodManager} from "./foodManager.js";

export class Markt extends Actor
{
    sellID;
    sellTime;
    sellTimer;

    game

    sellingToHuman;
    selling
    entrace;
    constructor(sellID,pos,rot)
    {
        super();
        this.sellID=sellID
        this.sellTimer=5;
        this.sellTime=5;
        this.pos =pos;
        this.rotation=rot;
        this.entrace = new Actor()
        let rotatedOffset = MovingActor.getDirFromAngle(rot-0.5*Math.PI);
        rotatedOffset.x*=-70;
        rotatedOffset.y*=-70;
        this.entrace.pos=new Vector(pos.x+rotatedOffset.x,pos.y+rotatedOffset.y)//new Vector(Math.cos(rot-(0.5*Math.PI))*200+pos.x, Math.sin(rot-(0.5*Math.PI)*200+pos.y))
        this.entrace.rotation=rot;
        this.selling=false;

    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.addTag("Obstacle");
        this.game=-_engine;
        this.collider.set(Shape.Capsule(268,160, new Vector(-5,0)))//Shape.Box(268,135));
        this.body.collisionType=CollisionType.Fixed;
        this.body.bounciness=1;
        this.entrace.collider.set(Shape.Capsule(160,46))
        this.entrace.addTag("Obstacle");
        this.entrace.addTag("Ignore");

        this.entrace.on('precollision', event => this.tryToSell(event))
        this.graphics.use(Resources.Markt.toSprite())
        //this.entrace.graphics.use(Resources.Fish.toSprite());
        this.scene.add(this.entrace);
        this.z=2;

        let displayItem = new Actor();
        displayItem.pos = this.pos
        console.log(displayItem.pos);
        displayItem.z = 4;
        displayItem.graphics.use(FoodManager.GetFoodData(this.sellID));
        displayItem.rotation=this.rotation;
        this.scene.add(displayItem);

    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(this.selling)
        {
            this.sellItem(_delta/1000)
        }
    }

    sellItem(delta)
    {
        this.sellingToHuman.allowMove=false;
        this.sellingToHuman.speed=0;
        this.sellingToHuman.vel=new Vector(0,0);
        this.sellingToHuman.useTargetVel=false;
        this.sellTimer-=delta;
        let humanLookDir = new Vector(this.pos.x-this.sellingToHuman.pos.x,this.pos.y-this.sellingToHuman.pos.y).normalize()
        this.sellingToHuman.useRotation=true;
        this.sellingToHuman.targetAngle = MovingActor.getAngleFromDir(humanLookDir);
        this.sellingToHuman.rotation=this.sellingToHuman.angle;
        this.sellingToHuman.rotation
        if(this.sellTimer<0)
        {
            this.sellTimer=this.sellTime;
            this.selling=false;
            this.sellingToHuman.inventory=this.sellID;
            this.sellingToHuman.DisplayItem();
            this.sellingToHuman.updateTarget();
            this.sellingToHuman.useTargetVel=true;
            this.sellingToHuman.allowMove=true;
            this.sellingToHuman=null;

        }
    }
    tryToSell(event)
    {
        if(event.other instanceof Human)
        {
            if(event.other.inventory==0) {
                this.sellingToHuman = event.other;
                this.selling = true
            }
        }
    }

}