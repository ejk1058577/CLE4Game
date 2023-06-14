import {Actor, Vector, Input, clamp} from "excalibur";
import {Resources} from "./resources.js";
export class player extends Actor
{
    game
    inventory

    angle

    isDiving
    isRising

    divingTimer


    constructor() {
        super();
        this.angle=0;
        this.divingTimer=0;
        this.isDiving=false;
        this.isRising=false;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.game=_engine;
        let sprite = Resources.Fish.toSprite();
        sprite.flipHorizontal=true;
        this.graphics.use(sprite);
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.PlayerInput(_delta/1000);
       // console.log(this.angle);
        this.Move();
        if(this.isDiving)
        {
            this.Dive(_delta/1000)
        }
    }

    PlayerInput(delta)
    {
        if(this.game.input.keyboard.isHeld(Input.Keys.A))
        {
            this.angle-=delta*5;
        }
        else if(this.game.input.keyboard.isHeld(Input.Keys.D))
        {
            this.angle+=delta*5;
        }
        if(this.game.input.keyboard.isHeld(Input.Keys.Space) && this.isDiving==false)
        {
            this.isDiving=true;
        }
    }
    Move()
    {
        this.transform.rotation=this.angle;
        let forward = new Vector(Math.cos(this.angle)*300,Math.sin(this.angle)*300)
        this.vel = forward;
    }

    Dive(delta)
    {
        if(!this.isRising) {
          //  console.log("scaleDown")
            this.divingTimer += delta;
        }
        else
        {
          //  console.log("scaleUp")
            this.divingTimer -= delta;
        }
        let scale = new Vector(0,0);
        let clampedTime = Math.min(Math.max(0,this.divingTimer),1)
       // console.log(clampedTime);
        scale.x = this.lerp(1,0.5,clampedTime)
        scale.y = scale.x;
        console.log(scale.x);
        this.scale=scale;
        if(this.divingTimer>1)
        {
            this.isRising=true;
        }
        if(this.divingTimer<0)
        {
            this.isRising=false;
            this.isDiving=false;
        }
    }
    lerp(a,b,t)
    {
        let v = a+t*(b-a);
        return v;
    }
}