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
