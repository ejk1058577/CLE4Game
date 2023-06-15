import {Actor, Vector, Input, clamp, CollisionType, Shape} from "excalibur";
import {Resources} from "./resources.js";
import {fallingObject} from "./fallingObject.js";
export class player extends fallingObject
{
    //Refernce to engine
    game
    //ID number of the food object that is currently picked
    inventory
    angle
    isDiving
    divingTimer


    constructor() {
        super(new Vector(0.5,0.5),new Vector(1,1),1);
        //se up initiaal values for variables
        this.angle=0;
        this.divingTimer=-1;
        this.isDiving=false;
        this.inventory=0;
        
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        //save refernce to game engine
        this.game=_engine;
        //assign sprite to actor. The sprite is flipped because it faced wrong direction, might not need in final version
        let sprite = Resources.Fish.toSprite();
        sprite.flipHorizontal=true;
        this.graphics.use(sprite);

        const box = Shape.Box(100, 100);
        this.collider.set(box);
        this.body.collisionType = CollisionType.Passive;

        this.on('precollision', (e) => this.FoodCollision(e)
        );
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
        //takes the absolute value of diving timer and clamps it between 0 and 1 to calculate height;
        this.height = clamp(Math.abs(this.divingTimer),0,1);
        //end dive
        if(this.divingTimer>1)
        {
            this.divingTimer=-1;
            this.isDiving=false;
        }
    }

    FoodCollision(e)
    {
       // console.log("trytopick")
        if (this.isDiving && Math.abs(this.divingTimer) < 0.2 && this.inventory==0) {
            e.other.pickup(this);
            console.log(`${e.other.id}`);
        }
    }
}