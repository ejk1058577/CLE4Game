import {Actor, Vector, Input, clamp, CollisionType, Shape, Particle, EmitterType,Color} from "excalibur";
import {Resources} from "./resources.js";
import {fallingObject} from "./fallingObject.js";
import {Human} from "./human.js";
import {FoodManager} from "./foodManager.js";
import {MovingActor} from "./MovingActor.js";
import {Tree} from "./Tree.js";
import {Markt} from "./Markt.js";
import {ParticleObject} from "./particleObject.js";

export class Food extends MovingActor{
    foodId;
    spawner;
    fallDestroy;
    canHit;
    isFalling;

    constructor(data) {
        super();
        this.foodId = data.id;
        this.useHeight=true;
        this.minScale=new Vector(0.4,0.4)
        this.maxScale=new Vector(0.75,0.75)
        this.height=0;
        this.gravity=1;
        this.isFalling = false;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.z = 0;
        const circle = Shape.Circle(40)
        this.collider.set(circle);
        this.body.collisionType = CollisionType.Passive;
        this.scale = new Vector(0.25, 0.25);
        let sprite = FoodManager.GetFoodData(this.foodId);
        this.graphics.use(sprite);
        this.z = 0;
        this.scale=this.minScale;
        this.scale=new Vector(0.6,0.6);
        this.rotation= Math.random() * Math.PI*2;
        this.on("collisionstart",event =>this.artificialCollision(event))

    }
    t
    artificialCollision(event)
    {
        if(event.other instanceof Tree || event.other instanceof Markt)
        {
            this.useTargetVel=false;
            this.vel=new Vector(0,0);
            if(this.height>event.other.height)
            {
                this.minHeight=event.other.height;
            }
        }
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);

        if (this.isFalling)
        {
            this.fall(_delta / 1000);
        }
    }

    pickup(player) {
        player.getItem(this.foodId);
        this.kill();
    }
    onPreKill(_scene) {
        super.onPreKill(_scene);
        if (this.spawner != null) {
            this.spawner.currentAmount--;
        }
    }

    fall(delta) {
        //console.log(this.fallingTimer);
        if(this.height<0.4)
        {
            if(this.canHit)
            {
                this.on("precollision", event => this.humanDropItem(event))
            }
        }
        if(this.height<=0.05)
        {
            if(this.fallDestroy)
            {
                this.kill();
            }
            this.isFalling=false;
        }
    }
    humanDropItem(event)
    {
        if(event.other instanceof Human)
        {
            this.kill();
            console.log("humanAttacked")
            event.other.speed=-100;
            event.other.dropItem(true,0.4,false,false);


            let particle = new ParticleObject({
                emitRate: 100,
                emitterType: EmitterType.Circle,
                radius: 64,
                maxVel:32,
                minVel:0,
                maxSize:2,
                minSize:1,
                particleLife: 1000,
                beginColor: Color.Yellow,
                endColor: Color.Yellow
            }, 0.4, 6)
            particle.pos = event.other.pos;
            this.scene.add(particle);
        }
    }
    _prekill(_scene) {
        super._prekill(_scene);
        if(this.isFalling) {
            let particle = new ParticleObject({
                emitRate: 50,
                emitterType: EmitterType.Circle,
                maxVel:64,
                minVel:0,
                maxSize:2,
                minSize:1,
                radius: 32, particleLife: 1000,
                beginColor: FoodManager.foodParticleColor[this.foodId - 1],
                endColor: FoodManager.foodParticleColor[this.foodId - 1]
            }, 0.2, 5)
            particle.pos = this.pos;
            this.scene.add(particle);
        }
    }
}