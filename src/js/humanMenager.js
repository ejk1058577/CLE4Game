import {Spawner} from "./spawner.js";
import {Human} from "./human.js";

export class HumanMenager extends Spawner
{
    humans
    constructor(targetAmount) {
    super(targetAmount,Human,{});
    this.afterBehaviour = this.addToMenager;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.humans = [];
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
    }

    addToMenager(human)
    {
        console.log()
        this.humans.push(human);
        console.log(this.humans);
    }
}