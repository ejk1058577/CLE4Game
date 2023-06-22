import { Scene, Vector} from "excalibur"
import { player } from "./player.js";

import { HumanSpawner } from "./humanSpawner.js";
import { Nest } from "./nest.js";
import { Ground } from "./Ground.js";
import { UI } from "./UI.js";
import { Arrow } from "./Arrow.js";
import { PlayerInput } from "./playerInput.js";

export class gameScene extends Scene {
    title = null;
    game
    playerPos;
    plInput;
    pl;
    nest;
    ui;

    query
    Obstacles;

    onInitialize(_engine) {
        console.log('game scene initd')
        this.add(new Ground())
        this.game=_engine;
        this.plInput = new PlayerInput();
        this.add(this.plInput);

        //what is this
        this.query = this.world.queryManager.createQuery(["Obstacle"])

        //ui
        this.ui = new UI();
        this.ui.z = 1000;
        this.add(this.ui);

        this.pl = new player();
        this.pl.pos=new Vector(3*Ground.spacing,3*Ground.spacing)
        this.add(this.pl);
        this.playerPos=this.pl.pos;

        //human spawner optimiz?
        this.camera.strategy.radiusAroundActor(this.pl,64)
        this.camera.zoom=1.25;
        this.humansSpawner =new HumanSpawner(15); //new Spawner(30,Human,{},new Vector(128*64,128*64),new Vector(0,0));
        this.add(this.humansSpawner);

        this.nest = new Nest();
        this.add(this.nest);


        this.add(new Arrow(this.pl,this.nest))
    }

    onActivate(_engine) {
        console.log("start")
    }

    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        this.playerPos = this.pl.pos;
        this.Obstacles = this.query.getEntities();
    }
}