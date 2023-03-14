import Phaser, { Scene } from "phaser";
import DroppableObject from "./droppableObject";

export default class ObjectSpawner extends Phaser.GameObjects.Sprite{

    spawnrange : [-50, 50];
    shapes;
    constructor(scene: Phaser.Scene ,x: number, y:number, texture: string, frame: string){
        super(scene, x, y, texture, frame);
        this.DoTween();
        console.log(this.frame);
        
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

    AddSpawnableObject(){
        this.shapes = this.scene.cache.json.get('shapes');

        var sprite = this.scene.add.sprite(this.x,this.y, this.texture, this.frame.name);
        var obj = this.scene.matter.add.gameObject(sprite,{shape: this.shapes.stack1},true);
    }
}