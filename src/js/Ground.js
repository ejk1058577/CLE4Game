import {Actor, TileMap,Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Tree} from "./Tree.js";

export class Ground extends Actor
{
    tileMap;
    constructor() {
        super();
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.tileMapFill();
        this.treePlacer();
    }
    tileMapFill()
    {
        this.tileMap=new TileMap({rows:64,columns:64,tileWidth:128,tileHeight:128,pos:new Vector(0,0)});
        for(let i =0;i<64*64;i++)
        {
            this.tileMap.tiles[i].addGraphic(Resources.Ground.toSprite())
        }
        this.addChild(this.tileMap);
    }
    treePlacer()
    {
        let spacing = (128*64)/16;
        for(let x =0;x<16;x++)
        {
            for(let y = 0;y<16;y++)
            {
                let treePos = new Vector((x+1)*spacing,(y+1)*spacing);
                let tree = new Tree(treePos);
               // tree.pos=treePos;
                this.scene.add(tree);
            }
        }
    }
}
