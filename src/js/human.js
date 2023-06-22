import {Actor, CollisionType, GraphicsGroup, Random, Ray, Shape, Vector} from "excalibur";
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

    interval=0;
    static angleSpacing = Math.PI/8;
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
        this.useRotation=true;
        this.useTargetVel=true;
       // this.updateTarget();
        //this.on("exitviewport", event => this.kill());
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(this.allowMove) {
            this.move();
        }
        if(Vector.distance(this.pos,this.game.playerPos)>1400)
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
        this.interval = (this.interval+1)%3
        let effectiveSpeed = Math.max(0,this.speed);
        if(this.allowMove==true) {
            this.speed = this.lerp(this.speed, 80, this.delta)
            let rayResult = this.TestRay(this, this.vel, 3, 350, Human.angleSpacing, -Human.angleSpacing)
            if (rayResult.rayID == -1 || this.interval > 0) {
                // this.targetAngle=this.angle;
                if (this.walkTarget == null) {
                    this.moveForward(effectiveSpeed)
                    this.targetAngle = this.lerp(this.targetAngle,MovingActor.getAngleFromDir(this.vel.normalize()),this.delta*0.5);
                    this.rotation = this.angle;
                } else {
                    let targetDir = new Vector(this.walkTarget.pos.x - this.pos.x, this.walkTarget.pos.y - this.pos.y).normalize()
                    this.targetAngle = this.lerp(this.targetAngle,MovingActor.getAngleFromDir(targetDir),this.delta*0.5);
                    this.rotation = this.angle;
                    this.moveForward(effectiveSpeed)
                }
            } else {
                let rayID = rayResult.rayID;
                if (rayID = 1) {
                    rayID = (Math.random() > 0.5) ? 0 : 2;
                }
            //    console.log(Vector.distance(this.pos,rayResult.hitPoint));
                let turn = 0;
                if (rayID == 0) {
                    turn = this.delta * 5;
                } else if (rayID == 2) {
                    turn = -this.delta * 5;
                }
                this.targetAngle += turn;
                this.rotation = this.angle;
                this.moveForward(effectiveSpeed);
            }
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

    TestRay(Caller, Direction, Rays, maxDistance, raySpacing, startOffset)
    {
        let point=null;
        let result={rayID:-1,hitPoint:new Vector(Infinity,Infinity)};
        for(const index in this.game.Obstacles)
        {
            let GameObj = this.game.Obstacles[index]
            if(Vector.distance(GameObj.pos,Caller.pos)<=maxDistance)
            {
                let rayAngle=MovingActor.getAngleFromDir(Direction)+startOffset;
                for(let i =0;i<Rays;i++)
                {
                    let rayDir = MovingActor.getDirFromAngle(rayAngle+i*raySpacing);
                    let ray = new Ray(Caller.pos,rayDir);
                    point=GameObj.collider.get().rayCast(ray);
                    if(point instanceof Vector && point.x != Infinity)
                    {
                            result.rayID = i;
                            result.hitPoint = point;
                            break;
                    }
                }
            }
            if(point instanceof Vector && point.x != Infinity)
            {
                break;
            }
        }
        //   console.log(result);
        return result;
    }

}