import {Actor, Vector, Input, clamp} from "excalibur";
import {Resources} from "./resources.js";
export class player extends Actor
{
    //Refernce to engine
    game
    //ID number of the food object that is currently picked
    inventory
    angle
    isDiving
    divingTimer


    constructor() {
        super();
        //se up initiaal values for variables
        this.angle=0;
        this.divingTimer=-1;
        this.isDiving=false;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        //save refernce to game engine
        this.game=_engine;
        //assign sprite to actor. The sprite is flipped because it faced wrong direction, might not need in final version
        let sprite = Resources.Fish.toSprite();
        sprite.flipHorizontal=true;
        this.graphics.use(sprite);
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        //Check for player input
        this.PlayerInput(_delta/1000);
       // console.log(this.angle);
        //Recalculate player velocity
        this.Move();
        //player dive
        if(this.isDiving)
        {
            this.Dive(_delta/1000)
        }
    }

    PlayerInput(delta)
    {
        //Increase or Decrease player rotation angle depending on key pressed
        if(this.game.input.keyboard.isHeld(Input.Keys.A))
        {
            this.angle-=delta*5;
        }
        else if(this.game.input.keyboard.isHeld(Input.Keys.D))
        {
            this.angle+=delta*5;
        }

        //start player dive if space is pressed and the player was not diving
        if(this.game.input.keyboard.isHeld(Input.Keys.Space) && this.isDiving==false)
        {
            this.isDiving=true;
        }
    }
    Move()
    {
        //rotate player
        this.transform.rotation=this.angle;
        //recalculate forward velocity of the player
        let forward = new Vector(Math.cos(this.angle)*300,Math.sin(this.angle)*300)
        this.vel = forward;
    }

    Dive(delta)
    {
        this.divingTimer +=delta;
        console.log(this.divingTimer);

        let scale = new Vector(0,0);
        //takes the absolute value of diving timer and clamps it between 0 and 1
        let clampedTime = Math.min(Math.max(0,Math.abs(this.divingTimer)),1)
        //lerp player scale between min and max size depending on clamped diving timer value
        scale.x = this.lerp(0.5,1,clampedTime)
        scale.y = scale.x;
        this.scale=scale;
        //end dive
        if(this.divingTimer>1)
        {
            this.divingTimer=-1;
            this.isDiving=false;
        }
    }


    //lerp between two numbers
    lerp(a,b,t)
    {
        let v = a+t*(b-a);
        return v;
    }
}