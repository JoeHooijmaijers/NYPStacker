import Phaser, { Scene } from "phaser";
import DroppableObject from "./droppableObject";

export default class ObjectSpawner extends Phaser.GameObjects.Sprite{

    spawnrange : [-50, 50];
    shapes;
    currentShape;
    spawnedShapes;
    
    constructor(scene: Phaser.Scene ,x: number, y:number, texture: string, frame: string){
        super(scene, x, y, texture, frame);
        this.DoTween();
        console.log(this.frame);
        this.shapes = this.scene.cache.json.get('shapes');
        this.spawnedShapes = [];
        this.GetNextShape();
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
        
        var sprite = this.scene.add.sprite(this.x,this.y, this.texture, this.frame.name);
        var obj = this.scene.matter.add.gameObject(sprite,{shape: this.currentShape},true);
        this.spawnedShapes.push(obj);
        this.GetNextShape();
    }

    GetNextShape(){
        let rnd :number = Phaser.Math.Between(1, 5);
        let rndstring : string = 'stack-' + rnd;
        this.setTexture('sprites', rndstring);
        this.GetShapesByIndex(rnd);
    }

    GetShapesByIndex(index : number){
        switch (index) {
            case 1:
                this.currentShape = this.shapes.stack1;
                break;
            case 2:
                this.currentShape = this.shapes.stack2;
                break;
            case 3:
                this.currentShape = this.shapes.stack3;
                break;
            case 4:
                this.currentShape = this.shapes.stack4;
                break;
            case 5:
                this.currentShape = this.shapes.stack5;
                break;
            default:
                break;
        }
    }
}