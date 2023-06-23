import {Scene, TileMap, Vector} from "excalibur"
import { player } from "./player.js";

import { HumanSpawner } from "./humanSpawner.js";
import { Nest } from "./nest.js";
import { Ground } from "./Ground.js";
import { UI } from "./UI.js";
import { Arrow } from "./Arrow.js";
import { PlayerInput } from "./playerInput.js";
import {Human} from "./human.js";
import {Food} from "./food.js";
import {Tree} from "./Tree.js";
import {Markt} from "./Markt.js";

export class gameScene extends Scene {
    title = null;
    playerPos;
    plInput;
    pl;
    nest;
    ui;
    humanSpawner;
    ground;
    query
    Obstacles;

    onInitialize(_engine) {
        console.log('game scene initd')
        this.game=_engine;
        this.ground=new Ground();
        this.add(this.ground);
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
        for(let i=0;i<this.entities.length;i++)
        {
            if(this.entities[i] instanceof Human || this.entities[i] instanceof Food) {
                this.entities[i].kill();
            }
            this.nest.timers[0]=1;
            this.nest.RequestNewItem(0);
            this.game.score=0;
            this.nest.score=0;
            this.ui.scoreText.text="0";
            this.pl.pos=new Vector(3*Ground.spacing,3*Ground.spacing)
            this.pl.inventory=0;
        }
    }
    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        this.playerPos = this.pl.pos;
        this.Obstacles = this.query.getEntities();
        //console.log(ObstacleFinder.Objects);
    }
}