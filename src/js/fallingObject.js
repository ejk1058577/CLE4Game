import {Actor,Vector} from "excalibur";

export class fallingObject extends Actor
{
    maxScale
    minScale

    height
    constructor(minScale,maxScale,startHeight) {
        super();
        this.minScale=minScale;
        this.maxScale=maxScale;
        this.height = startHeight;

    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.scaleObject();
    }
    scaleObject()
    {
        this.scale=new Vector(this.lerp(this.minScale.x,this.maxScale.x,this.height),this.lerp(this.minScale.x,this.maxScale.x,this.height));
    }

    lerp(a,b,t)
    {
        let v = a+t*(b-a);
        return v;
    }
}