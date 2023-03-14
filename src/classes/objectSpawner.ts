import Phaser, { Scene } from "phaser";

export default class ObjectSpawner extends Phaser.GameObjects.Sprite{

    spawnrange : [-50, 50];

    constructor(scene: Phaser.Scene ,x: number, y:number, texture: string, frame?: string){
        super(scene, x, y, texture, frame);
        this.DoTween();
    }



    DoTween(){
        this.scene.tweens.add({
            targets: this, 
            x:20,
            duration:1000,
            yoyo: true,
            repeat: -1

        })
    }
}