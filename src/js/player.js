import {Actor, Vector,Input} from "excalibur";
import {Resources} from "./resources.js";
export class player extends Actor
{
    game
    inventory

    angle

    isDiving

    divingTimer


    static diveMinScale=new Vector(0.5,0.5);
    static diveTime = 1.5;

    constructor() {
        super();
        this.angle=0;
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
            this.Dive()
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
    }
    Move()
    {
        this.transform.rotation=this.angle;
        let forward = new Vector(Math.cos(this.angle)*500,Math.sin(this.angle)*500)
        this.vel = forward;
    }

    Dive(delta)
    {
        this.divingTimer-=delta;
        if(this.divingTimer < 0)
        {

        }
    }
}