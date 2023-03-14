import Phaser from "phaser";

export default class DroppableObject extends Phaser.GameObjects.GameObject{
    
    constructor(scene: Phaser.Scene){
        super(scene, 'sprite');
    }
}