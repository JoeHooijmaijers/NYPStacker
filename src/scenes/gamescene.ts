import { spawn } from 'child_process';
import Phaser from 'phaser';
import DroppableObject from '../classes/droppableObject';
import ObjectSpawner from '../classes/objectSpawner';


export default class GameScene extends Phaser.Scene{
    
    objectgroup;
    constructor(){
        super('GameScene'); 
    }
    

    preload(){
        //Stacksprites
        this.load.atlas('sprites','assets/sprite_stacking@1x.png' ,'assets/sprite_stacking_atlas@1x.json');
        this.load.json('shapes', 'assets/physics_json@1x.json');

        //(Back)ground
        this.load.image('ground', 'assets/ground@1x.png');
        this.load.json('groundshape', 'assets/ground_physics_json@1x.json')
        this.load.image('background', 'assets/background@1x.png');
    }

    create(){
        var shapes = this.cache.json.get('shapes');
        var groundShape = this.cache.json.get('groundshape');
        this.add.image(187, 406, 'background');
        const { width, height} = this.cameras.main;
        let ground = this.matter.add.gameObject(this.add.sprite(width/2, height-40, 'ground'), {shape: groundShape.ground, ignoreGravity: true, isStatic: true}, true);

        //Create objectSpawner
        let spawner = new ObjectSpawner(this, width -20, 100, 'sprites', 'stack-1');
        this.add.existing(spawner);
        this.input.on('pointerdown', spawner.AddSpawnableObject, spawner);

    }

    update(time: number, delta: number): void {
        
    }

    // Test(){
    //     let deez = this.add.sprite(100, 100, 'sprites', 'stack-1');
    //     let nuts = this.matter.add.gameObject(deez, {shape: shapes.stack1},true);
    // }
}
