import {Actor, Vector, Input, clamp, CollisionType, Shape} from "excalibur";
import {Resources} from "./resources.js";
import {fallingObject} from "./fallingObject.js";
import { Food } from "./food.js";
import {FoodManager} from "./foodManager.js";

export class player extends fallingObject
{
    //Refernce to engine
    game
    //ID number of the food object that is currently picked
    displayItem
    inventory

    displayItem
    angle
    isDiving
    divingTimer
    spacePrevState;

    constructor() {
        super(new Vector(0.75,0.75),new Vector(1,1),1);
        //se up initiaal values for variables
        this.angle=0;
        this.divingTimer=-1;
        this.isDiving=false;
        this.inventory=0;
        this.spacePrevState=false;
        
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.z = 5;

        this.displayItem = new Actor();
        this.displayItem.pos = this.pos;
        this.displayItem.scale=new Vector(0.5,0.5);
        this.displayItem.z = 4;
        this.scene.add(this.displayItem);
        this.displayItemHeld();
        //save refernce to game engine
        this.game=_engine;
        //assign sprite to actor. The sprite is flipped because it faced wrong direction, might not need in final version
        let sprite = Resources.Meeuw.toSprite();
        this.graphics.use(sprite);

        const box = Shape.Box(100, 100);
        this.collider.set(box);
        this.body.collisionType = CollisionType.Passive;

        this.on('precollision', (e) => this.FoodCollision(e));
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

        //drop item if player not diving, is holding food when space is pressed

        if (this.game.input.keyboard.isHeld(Input.Keys.Space)) {
            if(!this.isDiving && !this.spacePrevState)
            {
                if (this.inventory > 0) {
                    let foodActor = new Food({id: this.inventory});
                    this.inventory = 0;
                    this.displayItemHeld();
                    foodActor.pos = this.pos;
                    foodActor.height=1;
                    this.scene.add(foodActor);

                    console.log(this.pos);
                    console.log(foodActor.pos);

                    foodActor.isFalling = true;
                } else {
                    this.isDiving = true;
                }
            }
            this.spacePrevState=true

        }
        else
        {
            this.spacePrevState=false;
        }
        //start player dive if space is pressed and the player was not diving
    }
    Move()
    {
        //rotate player
        this.transform.rotation=this.angle;
        //recalculate forward velocity of the player
        let forward = new Vector(Math.cos(this.angle)*300,Math.sin(this.angle)*300)
        this.vel = forward;
        this.displayItem.rotation=this.angle;
        this.displayItem.vel=forward;
        //this.displayItem.pos=new Vector(this.pos.x,this.pos.y);
    }

    Dive(delta)
    {
        this.divingTimer +=delta;


      //  console.log(this.divingTimer);
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
            console.log(e.other instanceof Food);
            if(e.other instanceof Food)
            {
                e.other.pickup(this);
                this.displayItemHeld();
            }
        }
    }
    displayItemHeld()
    {
        console.log("changedDisplay",this.displayItem);
        switch (this.inventory)
        {
            case 0:this.displayItem.graphics.use(Resources.empty.toSprite());
            break;
            default:this.displayItem.graphics.use(FoodManager.GetFoodData(this.inventory));
        }
    }
}