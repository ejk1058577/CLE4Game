
import {Actor, CollisionType, RotateTo, Shape, Vector,Color} from "excalibur";
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
    stripes
    displayItem;
    height = 0.5;
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
        this.game=-_engine;
        this.collider.set(Shape.Capsule(268,135, new Vector(-5,0)))//Shape.Box(268,135));
        this.body.collisionType=CollisionType.Fixed;
        this.entrace.collider.set(Shape.Circle(48))
        this.entrace.on('precollision', event => this.tryToSell(event))
        this.graphics.use(Resources.Markt.toSprite())
        //this.entrace.graphics.use(Resources.Fish.toSprite());
        this.scene.add(this.entrace);
        this.z=2;
        this.stripes = new Actor();
        this.stripes.pos=this.pos;
        this.stripes.rotation=this.rotation;
        this.stripes.scale=this.scale;
        let stripeSprite = Resources.MarktStripes.toSprite();
        let ColorsList = [Color.Orange,Color.Magenta,Color.Red,Color.Blue,Color.Yellow,Color.Green,Color.Azure,Color.Cyan,Color.Black,Color.Rose,Color.Chartreuse,Color.ExcaliburBlue,Color.Violet];
        stripeSprite.tint = ColorsList[Math.min(ColorsList.length-1,Math.floor(Math.random()*ColorsList.length))];
        this.stripes.graphics.use(stripeSprite);
        this.stripes.z =3;
        this.scene.add(this.stripes);
        this.displayItem = new Actor();
        this.displayItem.pos = this.pos
     //   console.log(displayItem.pos);
        this.displayItem.z = 4;
        this.displayItem.graphics.use(FoodManager.GetFoodData(this.sellID));
        this.displayItem.rotation=this.rotation;
        this.scene.add(this.displayItem);

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
        this.sellTimer-=delta;

        if(this.sellTimer<0)
        {
            this.sellTimer=this.sellTime;
            this.selling=false;
            this.sellingToHuman.inventory=this.sellID;
            this.sellingToHuman.DisplayItem();
            this.sellingToHuman.updateTarget();
            this.sellingToHuman.useTargetVel=true;
            this.sellingToHuman.allowMove=true;
            this.sellingToHuman.useAnimation=true;
            this.sellingToHuman=null;

        }
    }
    tryToSell(event)
    {
        if(event.other instanceof Human)
        {
            if(event.other.walkTarget == this.entrace && this.sellingToHuman==null)
            {

            }
            if(event.other.inventory==0) {
                event.other.allowMove=false;
                event.other.speed=0;
                event.other.vel=new Vector(0,0);
                event.other.useTargetVel=false;
                let humanLookDir = new Vector(this.pos.x-event.other.pos.x,this.pos.y-event.other.pos.y).normalize()
                event.other.useRotation=true;
                event.other.targetAngle = MovingActor.getAngleFromDir(humanLookDir);
                event.other.rotation=event.other.angle;
                //event.other.rotation
                event.other.useAnimation=false;
                if(this.sellingToHuman == null) {
                    this.sellingToHuman = event.other;
                }
                this.selling = true
            }
        }
    }
    _prekill(_scene) {
        super._prekill(_scene);
        this.entrace.kill();
        this.displayItem.kill();
    }
}