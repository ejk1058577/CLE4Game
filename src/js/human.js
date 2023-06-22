import {Actor, CollisionType, GraphicsGroup, Random, Shape, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Food} from "./food.js";
import {FoodManager} from "./foodManager.js";
import {InventoryActor} from "./InventoryActor.js";
import {MovingActor} from "./MovingActor.js";
import {Ground} from "./Ground.js";

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
    constructor() {
        super();
        this.collided=false;
        this.allowMove=true;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.height=0.4;
        this.useTargetVel=true;
        this.acceleration=20;

        this.rng = new Random();
        this.inventory = this.rng.integer(FoodManager.minId,FoodManager.maxID)
        this.lastInventory= this.inventory;
        this.displayAngle=1;
        this.displayDistance=50;
        this.Display.z=1;
        this.Display.minScale=new Vector(0.4,.4);
        this.Display.maxScale=new Vector(0.75,0.75);
        this.DisplayItem()

        this.game=_engine;
        this.graphics.use(Resources.Human.toSprite());

        this.collider.set(Shape.Circle(48))
        this.body.collisionType = CollisionType.Active;
        this.body.bounciness=1;
        this.body.friction=0;
        this.angle=(2*Math.random()-1)*Math.PI*2;
        this.lastAngle=this.angle;
        this.transform.rotation = this.angle;
        this.z = 2;
        this.on('precollision',event => this.hasCollided(event))
        this.on("collisionend",event => this.endCollision(event))

        this.rotSpeed = 5;
       // this.updateTarget();
        //this.on("exitviewport", event => this.kill());
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(this.allowMove) {
            this.move();
        }
        if(Vector.distance(this.pos,this.scene.playerPos)>1400)
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
        this.speed = this.lerp(this.speed, 80, this.delta)
        //rotate player
        let posDir = new Vector(0,0);
        if (this.lastPos != null && this.collided) {
            let posDir = new Vector(this.pos.x - this.lastPos.x, this.pos.y - this.lastPos.y).normalize();
            //console.log(posDir);
            let dot = posDir.toAngle();
            this.angle = this.lerp(this.angle, dot, this.delta * 5)
        } else {
            this.lastPos = new Vector(0, 0);
        }
        let tarDir = new Vector(0,0);
        if(this.walkTarget!=null)
        {
            tarDir = new Vector(this.walkTarget.pos.x - this.pos.x, this.walkTarget.pos.y - this.pos.y).normalize();
            if(this.collided)
            {
                tarDir = new Vector(tarDir.x+posDir.x, tarDir.y+posDir.y).normalize();
            }
            this.targetAngle=MovingActor.getAngleFromDir(tarDir);
            this.useRotation=true;
        }
        else
        {
            this.useRotation=false;
        }
        this.angle = this.lerp(this.angle,this.lastAngle,this.delta)
        this.transform.rotation = this.angle;
        if(this.walkTarget==null) {
            this.moveForward(this.speed);
        }
        else
        {
            this.moveForward(Math.max(this.speed,0))
            this.targetVel.x += tarDir.x*this.speed/4+posDir.x/2;
            this.targetVel.y +=tarDir.y*this.speed/4+posDir.y/2;
            this.targetVel = this.targetVel.normalize();
            this.targetVel.x *= this.speed;
            this.targetVel.y *= this.speed;
        }
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
        this.lastAngle=this.angle;

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
            let rangle = Math.random()*2*Math.PI;
            this.lastPos = MovingActor.getDirFromAngle(rangle);
            this.lastPos.x +=this.pos;
            this.lastPos.y+=this.pos;
        }
    }
    lerp(a,b,t)
    {
        let v = a+t*(b-a);
        return v;
    }
    hasCollided(event)
    {
        if(event.other.body.collisionType!=CollisionType.Passive)
        {
            this.collided=true;
        }
    }
    endCollision(event)
    {
        if(event.other.body.collisionType!=CollisionType.Passive)
        {
            this.collided=false;
        }
    }
}