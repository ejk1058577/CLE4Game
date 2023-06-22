import {Actor, Random, TileMap, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Tree} from "./Tree.js";
import {Markt} from "./Markt.js";
import {FoodManager} from "./foodManager.js";

export class Ground extends Actor
{
    static spacing;
    tileMap;

    static marktList = []
    marktPosList=[]
    marktAmount = 16;
    constructor() {
        super();
        Ground.spacing=(192*64)/16;
    }
    onInitialize(_engine) {

        super.onInitialize(_engine);

        this.tileMapFill();
        this.treePlacer();
        //this.marktList=[];
        this.marktPlacer();

    }
    tileMapFill()
    {
        this.tileMap=new TileMap({rows:32,columns:32,tileWidth:128,tileHeight:128,pos:new Vector(0,0)});
        for(let i =0;i<32*32;i++)
        {
            let r = Math.random();
            if(r>0.8)
            {
                let sprite = Resources.GroundCracked.toSprite()
                sprite.scale=new Vector(2,2);
                this.tileMap.tiles[i].addGraphic(sprite)
            }
            else if(r<0.2)
            {
                let sprite = Resources.GroundGrass.toSprite()
                sprite.scale=new Vector(2,2);
                this.tileMap.tiles[i].addGraphic(sprite)
            }
            else
            {
                let sprite = Resources.Ground.toSprite()
                sprite.scale=new Vector(2,2);
                this.tileMap.tiles[i].addGraphic(sprite)
            }

        }
        this.addChild(this.tileMap);
    }
    treePlacer()
    {
       // let spacing = (160*64)/16;
        for(let x =0;x<5;x++)
        {
            for(let y = 0;y<5;y++)
            {
                let treePos = new Vector((x+1)*Ground.spacing,(y+1)*Ground.spacing);
                let tree = new Tree(treePos);
               // tree.pos=treePos;
                this.scene.add(tree);
            }
        }
    }
    marktPlacer()
    {
        let rng = new Random()
       // let spacing = (160*64)/16;
        for(let i =0;i<this.marktAmount;i++)
        {
            let conflict = true;
            let pos;
            let rot;
            while(conflict)
            {
                console.log("conflict",i)
                let foundConflict = false;
                let x = rng.integer(1, 4)
                let y = rng.integer(1, 4)
                pos = new Vector(0, 0)
                let rotState = rng.integer(1, 4)
                rot = rotState * Math.PI * 0.5;
                if (rotState == 1 || rotState == 3) {
                    pos.x = x * Ground.spacing;
                    pos.y = y * Ground.spacing + 256 + 128;
                } else {
                    pos.x = x * Ground.spacing + 256 + 128;
                    pos.y = y * Ground.spacing;
                }
                for (let i = 0;i<this.marktPosList.length;i++)
                {
                   // console.log("test")
                  //  console.log(pos,this.marktPosList[i])
                    if (pos.x == this.marktPosList[i].x && pos.y == this.marktPosList[i].y) {
                        foundConflict=true;
                     //   console.log("foundConflict");;
                    }
                }
                conflict=foundConflict;
            }
            let food= rng.integer(FoodManager.minId,FoodManager.maxID);
            let mark = new Markt(food,pos,rot);
            this.scene.add(mark)
            this.marktPosList.push(pos);
            Ground.marktList.push(mark);
        }
    }
}
