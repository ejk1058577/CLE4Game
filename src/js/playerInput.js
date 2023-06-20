import {Actor, Input, Vector} from "excalibur";

export class PlayerInput extends Actor
{
    static MoveInput;
    static ActieInput;

    game;

    actionLast;
    joystick0left;
    joystick0right;
    joystick0button0;
    constructor() {
        super();
        PlayerInput.ActieInput=false;
        PlayerInput.MoveInput=new Vector(0,0);
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.game=_engine;
        this.joystick0left = false;
        this.joystick0right = false;
        this.joystick0button0 = false;

        document.addEventListener("joystick0left", () => {
            this.joystick0left = true;
            this.joystick0right = false; //yes this is necessary because both can be pressed
        });
        document.addEventListener("joystick0right", () => {
            this.joystick0left = false;
            this.joystick0right = true;
        });
        document.addEventListener("joystick0neutral", () => {
            this.joystick0left = false;
            this.joystick0right = false;
        });
        document.addEventListener("joystick0button0", () => {
            if (!this.isDiving) {
                this.joystick0button0 = true;
            }
        });
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.moveDetection();
        this.ActionDetection();
        if (this.actionLast) {
            console.log(this.actionLast, PlayerInput.ActieInput, PlayerInput.MoveInput);
        }
    }
    moveDetection()
    {
        PlayerInput.MoveInput.x=0;
        PlayerInput.MoveInput.y=0;
        if(this.game.input.keyboard.isHeld(Input.Keys.A) || this.joystick0left)
        {
            PlayerInput.MoveInput.x=-1;
        }
        else if(this.game.input.keyboard.isHeld(Input.Keys.D) || this.joystick0right)
        {
            PlayerInput.MoveInput.x=1;
        }
    }
    ActionDetection()
    {
        if(this.actionLast==false)
        {
            if (this.game.input.keyboard.isHeld(Input.Keys.Space) || this.joystick0button0)
            {
                PlayerInput.ActieInput=true;
            }
            else
            {
                PlayerInput.ActieInput=false;
            }
        }
        else
        {
            this.joystick0button0 = false;
            PlayerInput.ActieInput=false;
        }
        this.actionLast=this.game.input.keyboard.isHeld(Input.Keys.Space)||this.joystick0button0
    }
}