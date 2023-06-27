import {Particle, ParticleEmitter, Color, EmitterType} from "excalibur";

export class ParticleObject extends ParticleEmitter
{
    DeathTimer;
    constructor(data,timeUntilDeath,z,sprite) {
        super(data)
        this.z=z;
        this.isEmitting=true;
        this.emitterType = EmitterType.Circle; // Shape of emitter nozzle
        this.radius = (data.radius !=null)? data.radius: 5;
        this.minVel = (data.minVel !=null)? data.minVel: 100;
        this.maxVel = (data.maxVel !=null)? data.maxVel: 200;
        this.minAngle =(data.minAngle !=null)? data.minAngle: 0;
        this.maxAngle =(data.maxAngle !=null)? data.maxAngle:  Math.PI * 2;
        this.emitRate =(data.emitRate!=null)? data.emitRate: 300; // 300 particles/second
        this.opacity = (data.opacity!=null)? data.opacity: 1;
        this.fadeFlag = true; // fade particles overtime
        this.particleLife =(data.particleLife!=null)? data.particleLife: 1000; // in milliseconds = 1 sec
        this.maxSize = (data.maxSize!=null)? data.maxSize: 10; // in pixels
        this.minSize = (data.minSize!=null)? data.minSize: 1;
        this.beginColor =(data.beginColor!=null)? data.beginColor: Color.White;
        this.endColor =(data.endColor!=null)? data.endColor: Color.White;
        this.DeathTimer=timeUntilDeath;
        this.particleSprite = sprite;
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.DeathTimer-=_delta/1000;
        if(this.DeathTimer<0)
        {
            this.kill();
        }
    }

}