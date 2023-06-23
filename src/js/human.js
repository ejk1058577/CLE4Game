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
    intervalTime=5;
    turnSpeed = 5;
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

        this.collider.set(Shape.Circle(40))
        this.body.collisionType = CollisionType.Active;
        this.body.bounciness=1;
        this.body.friction=0;
        this.angle=(2*Math.random()-1)*Math.PI*2;
        this.targetAngle=this.angle;
        this.transform.rotation = this.angle;
        this.z = 2;
        this.on('precollision',event => this.hasCollided(event))
        this.on("collisionend",event => this.endCollision(event))

        this.rotSpeed = 5;
        this.useRotation=true;
        this.useTargetVel=true;
        this.interval = this.rng.integer(0,this.intervalTime-1)
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

        this.interval = (this.interval+1)%this.intervalTime;
        let effectiveSpeed = Math.max(0,this.speed);
        if(this.allowMove==true) {
            this.speed = this.lerp(this.speed, 80, this.delta)
            let rayResult = this.TestRay(this, this.vel, 3, 400, Human.angleSpacing, -Human.angleSpacing)

            if (rayResult.rayID == -1 || this.interval > 0) {
                // this.targetAngle=this.angle;
                if (this.walkTarget == null) {
                    this.moveForward(effectiveSpeed)
                    this.targetAngle = this.lerp(this.targetAngle,MovingActor.getAngleFromDir(this.vel.normalize()),this.delta);
                    this.rotation = this.angle;
                } else {
                    let targetDir = new Vector(this.walkTarget.pos.x - this.pos.x, this.walkTarget.pos.y - this.pos.y).normalize()
                    this.targetAngle = this.lerp(this.targetAngle,MovingActor.getAngleFromDir(targetDir),this.delta);
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
                if (rayID ==0) {
                    turn = this.delta * this.turnSpeed;
                } else if (rayID ==2) {
                    turn = -this.delta * this.turnSpeed;
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
            this.targetAngle = this.angle-=Math.PI;
            this.rotation=this.angle;
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
            this.turnSpeed=10;
        }
    }
    endCollision(event)
    {
        if(event.other.body.collisionType!=CollisionType.Passive)
        {
            this.turnSpeed=5;
        }
    }

    TestRay(Caller, Direction, Rays, maxDistance, raySpacing, startOffset)
    {
        let point=null;
        let result={rayID:-1,hitPoint:new Vector(Infinity,Infinity)};
        for(const index in this.game.currentScene.Obstacles)
        {
            let GameObj = this.game.currentScene.Obstacles[index]
            let dist = Vector.distance(GameObj.pos,Caller.pos)
            if(this.inventory ==0 && GameObj.tags[1]=="Ignore" && dist<maxDistance+50)
            {
                this.walkTarget=GameObj;
            }
            if(dist<=maxDistance)
            {

                let rayAngle=MovingActor.getAngleFromDir(Direction)+startOffset;
                for(let i =0;i<Rays;i++)
                {
                    let rayDir = MovingActor.getDirFromAngle(rayAngle+i*raySpacing);
                    let ray = new Ray(Caller.pos,rayDir);
                    point=GameObj.collider.get().rayCast(ray);
                    if(point instanceof Vector && point.x != Infinity)
                    {
                        let dist = Vector.distance(Caller.pos,point);
                        if(dist<Vector.distance(Caller.pos,result.hitPoint))
                        {
                            result.rayID = i;
                            if(this.inventory ==0 && GameObj.tags[1]=="Ignore")
                            {
                                result.rayID=-1;
                            }
                            result.hitPoint = point;
                        }
                    }
                }
            }
        }
        //   console.log(result);
        return result;
    }

}