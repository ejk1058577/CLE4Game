import {Actor, CollisionType, GraphicsGroup, Random, Ray, Shape, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Food} from "./food.js";
import {FoodManager} from "./foodManager.js";
import {InventoryActor} from "./InventoryActor.js";
import {MovingActor} from "./MovingActor.js";
import {Ground} from "./Ground.js";
import {Markt} from "./Markt.js";
import {Tree} from "./Tree.js";

export class Human extends InventoryActor
{
    spawner
    game
    angle
    lastPos
    lastAngle;
    rng

    lastInventory;

    speed=80;

    walkTarget;

    collided;
    allowMove;

    unstuckTimer
    ustuckDuration=5;
    unstuck=false;
    static angleSpacing = Math.PI/12;
    constructor() {
        super();
        this.collided=false;
        this.allowMove=true;

    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.addTag("Obstacle");
        this.height=0.4;
        this.useTargetVel=true;
        this.acceleration=20;
        this.lastPos=new Vector(this.pos.x,this.pos.y);
        this.rng = new Random();
        this.inventory = this.rng.integer(FoodManager.minId,FoodManager.maxID)
        this.lastInventory= this.inventory;
        this.displayAngle=1;
        this.displayDistance=50;
        this.Display.z=4;
        this.Display.minScale=new Vector(0.4,.4);
        this.Display.maxScale=new Vector(0.75,0.75);
        this.DisplayItem()

        this.game=_engine;
        this.graphics.use(Resources.Human.toSprite());

        this.collider.set(Shape.Circle(60))
        this.body.collisionType = CollisionType.Active;
        //this.body.bounciness=1;
        this.angle=(2*Math.random()-1)*Math.PI*2;
        this.targetAngle=this.angle;
        this.transform.rotation = this.angle;
        this.z = 5;
        this.on('precollision',event => this.hasCollided(event))
        this.on("collisionend",event => this.endCollision(event))

        this.rotSpeed = 2.5;
        this.useRotation=true;
        this.useTargetVel=true;
       // this.updateTarget();
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(this.allowMove) {
            this.move();
        }
        if(Vector.distance(this.pos,this.scene.playerPos)>1500 || this.pos.x<0 || this.pos.y<0 || this.pos.x>128*32||this.pos.y>128*32)
        {
            this.kill();
        }
        if(this.inventory!=this.lastInventory)
        {
            this.lastInventory=this.inventory;
            this.updateTarget();
        }
    }
    move() {
        if (this.allowMove) {
            if(Vector.distance(this.pos,this.lastPos)<4 && !this.unstuck)
            {
                this.unstuckTimer=Math.max(-0.1,this.unstuckTimer-this.delta);
            }
            else if(!this.unstuck)
            {
                this.unstuckTimer= 5
            }
            else
            {
                this.unstuckTimer+= this.delta
            }
            if(this.unstuckTimer<=0)
            {
                this.unstuck=true;
            }
            if(this.unstuckTimer>=5)
            {
                this.unstuck=false;
            }
            this.speed = this.lerp(this.speed, 80, this.delta)
            let effectiveSpeed = Math.max(this.speed, 0);

            if (this.collided && this.lastPos != null) {
                let posDir = new Vector(this.pos.x - this.lastPos.x, this.pos.y - this.lastPos.y).normalize();
                //console.log(posDir);
                let avoidAngle = MovingActor.getAngleFromDir(posDir)
                this.targetAngle = avoidAngle;
            }
            if(!this.collided && this.walkTarget!=null && !this.unstuck)
            {
               let tarDir = new Vector(this.walkTarget.pos.x-this.pos.x,this.walkTarget.pos.y-this.pos.y).normalize();

             //  console.log(tarDir,this.walkTarget.pos);
               this.targetAngle=MovingActor.getAngleFromDir(tarDir);
            }
            this.transform.rotation = this.angle;
            this.moveForward(effectiveSpeed);
            this.lastPos.x = this.pos.x;
            this.lastPos.y = this.pos.y;
        }
    }

    _prekill(_scene) {
        super._prekill(_scene);
        this.spawner.currentAmount--;
        this.Display.kill();
    }
    updateTarget()
    {
        if(this.inventory==0)
        {
            this.walkTarget=null;
            this.walkTarget= Ground.marktList[this.rng.integer(0,Ground.marktList.length-1)].entrace;
        }
        else
        {
            this.walkTarget=null;
        }
    }
    lerp(a,b,t)
    {
        let v = a+t*(b-a);
        return v;
    }
    hasCollided(event)
    {
        if(event.other instanceof Human || event.other instanceof Markt|| event.other instanceof Tree)
        {
            this.collided=true;
        }
    }
    endCollision(event)
    {
        if(event.other instanceof Human || event.other instanceof Markt|| event.other instanceof Tree)
        {
            this.collided=false;
        }
    }
}