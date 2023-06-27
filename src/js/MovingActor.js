import {Actor,Vector} from "excalibur";

export class MovingActor extends Actor
{
    useHeight
    maxScale
    minScale
    height
    gravity;

    useTargetVel
    targetVel;
    acceleration;

    useRotation;
    targetAngle;
    angle;
    rotSpeed;

    useAnimation
    frameIndex;
    frameSpeed;
    currentFrameDuration
    animationSprites;


    delta;

    playAnimation;
    animationSprites=[];
    animIndex;
    animTimer;

    animSpeed;
    constructor() {
        super();
        this.useHeight=false;
        this.gravity=0;
        this.minScale=new Vector(0,0);
        this.maxScale=new Vector(1,1);
        this.height = 1;

        this.useTargetVel=false;
        this.targetVel=new Vector(0,0);

        this.useRotation=false;
        this.targetAngle=0;
        this.rotSpeed=0;
        this.currentFrameDuration=0;
        this.useAnimation=false;
        this.frameSpeed=0;
        this.frameIndex=0;

        this.animTimer=0;
        this.animIndex=0;
        this.playAnimation=false;
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.delta=_delta/1000
        if(this.useHeight) {
            this.scaleObject();
        }
        if(this.useTargetVel)
        {
            this.accelerateObject()
        }
        if(this.useRotation)
        {
            this.rotateTowards();
        }
        if(this.useAnimation)
        {
            this.currentFrameDuration-=this.delta;
            if(this.currentFrameDuration<0)
            {
                this.currentFrameDuration=this.frameSpeed;
                this.frameIndex = (this.frameIndex+1)%this.animationSprites.length;
                this.graphics.use(this.animationSprites[this.frameIndex]);
            }
        }
    }
    scaleObject()
    {
        this.scale=new Vector(this.lerp(this.minScale.x,this.maxScale.x,this.height),this.lerp(this.minScale.x,this.maxScale.x,this.height));
        this.height=Math.max(0,this.height-this.gravity*this.delta);
    }
    accelerateObject()
    {
        this.vel = new Vector(this.lerp(this.vel.x,this.targetVel.x,this.acceleration*this.delta),this.lerp(this.vel.y,this.targetVel.y,this.acceleration*this.delta));
    }
    rotateTowards()
    {
        this.angle=this.lerp(this.angle,this.targetAngle,this.rotSpeed*this.delta)
    }
    static getDirFromAngle(angle)
    {
        let dir = new Vector(Math.cos(angle),Math.sin(angle));
        return dir;
    }
    static getAngleFromDir(dir)
    {
        return dir.toAngle();
    }

    moveForward(speed)
    {
           let angle = this.rotation;
           let dir = MovingActor.getDirFromAngle(angle);
           dir.x*=speed;
           dir.y*=speed;
           this.targetVel=dir;
    }
    lerp(a,b,t)
    {
        let v = a+t*(b-a);
        return v;
    }
}