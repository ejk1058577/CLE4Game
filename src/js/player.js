import {Actor, Vector, Input, clamp, CollisionType, Shape, SpriteSheet} from "excalibur";
import {Resources} from "./resources.js";
import {fallingObject} from "./fallingObject.js";
import { Food } from "./food.js";
import {FoodManager} from "./foodManager.js";
import {PlayerInput} from "./playerInput.js";
import {InventoryActor} from "./InventoryActor.js";
import {MovingActor} from "./MovingActor.js";

export class player extends InventoryActor {
    //Refernce to engine
    game
    //ID number of the food object that is currently picked
    angle
    isDiving
    divingTimer
    speed;

    static spriteSheet = SpriteSheet.fromImageSource({
        image:Resources.Meeuw,
        grid:{rows: 1,
            columns: 3,
            spriteWidth: 64,
            spriteHeight: 64},
    });

    constructor() {
        super();
        //se up initiaal values for variables
        this.useHeight = true;
        this.minScale = new Vector(0.75, 0.75)
        this.maxScale = new Vector(1, 1)
        this.height = 1;
        this.gravity = 0;
        this.angle = 0;
        this.divingTimer = -1;
        this.isDiving = false;
        this.speed = 250;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.z = 10;
        this.displayAngle = 0;
        this.displayDistance = 25;
        this.Display.minScale = new Vector(0.4, .4);
        this.Display.maxScale = new Vector(0.75, 0.75);
        this.Display.z=9;
        this.DisplayItem()
        //save refernce to game engine
        this.game = _engine;
        //assign sprite to actor. The sprite is flipped because it faced wrong direction, might not need in final version

        this.useAnimation=true;
        this.frameSpeed=0.15;
        this.animationSprites=[
            player.spriteSheet.getSprite(0,0),
            player.spriteSheet.getSprite(1,0),
            player.spriteSheet.getSprite(2,0),
            player.spriteSheet.getSprite(1,0)]
        const box = Shape.Circle(64);
        this.collider.set(box);
        this.body.collisionType = CollisionType.Passive;
        this.on('precollision', (e) => this.FoodCollision(e)
        );
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        //Check for player input
        this.PlayerInput();
        // console.log(this.angle);
        //Recalculate player velocity
        this.Move();
        //player dive
        if (this.isDiving) {
            this.Dive()
        }
    }

    PlayerInput() {

        this.angle += this.delta * PlayerInput.TurnSensitivity * PlayerInput.MoveInput.x;

        //drop item if player not diving, is holding food when space is pressed

        if (PlayerInput.ActieInput) {
            if (!this.isDiving) {
                if (this.inventory > 0) {
                    this.dropItem(false, 1, true, true)
                } else {
                    this.isDiving = true;
                }
            }
        }
        //start player dive if space is pressed and the player was not diving
    }

    Move() {
        //rotate player
        this.transform.rotation = this.angle;
        //recalculate forward velocity of the player
        let dir = MovingActor.getDirFromAngle(this.angle);
        dir.x*=this.speed;
        dir.y*=this.speed;
        this.vel=dir;
        //this.displayItem.pos=new Vector(this.pos.x,this.pos.y);
    }

    Dive() {
        this.divingTimer += this.delta;


        //  console.log(this.divingTimer);
        //takes the absolute value of diving timer and clamps it between 0 and 1 to calculate height;
        this.height = clamp(this.divingTimer*this.divingTimer, 0, 1);
        //end dive
        if (this.divingTimer > 1) {
            this.divingTimer = -1;
            this.isDiving = false;
        }
    }

    FoodCollision(e) {
        // console.log("trytopick")
        if (this.isDiving && Math.abs(this.divingTimer) < 0.2 && this.inventory == 0) {
            console.log(e.other instanceof Food);
            if (e.other instanceof Food) {
                e.other.pickup(this);
                this.DisplayItem();
            }
        }
    }
}

