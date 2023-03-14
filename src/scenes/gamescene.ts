import { spawn } from 'child_process';
import Phaser from 'phaser';
import DroppableObject from '../classes/droppableObject';
import ObjectSpawner from '../classes/objectSpawner';


export default class GameScene extends Phaser.Scene{
    
    objectgroup;
    score : number;
    scoreText: Phaser.GameObjects.Text;
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

        //UI
        this.load.image('scoreUI', 'assets/ScoreUI.png');
        this.load.image('scoreicon', 'assets/icon-points@1x.png');
    }

    create(){
        var shapes = this.cache.json.get('shapes');
        var groundShape = this.cache.json.get('groundshape');
        this.add.image(187, 406, 'background');
        const { width, height} = this.cameras.main;
        let ground = this.matter.add.gameObject(this.add.sprite(width/2, height-40, 'ground'), {shape: groundShape.ground, ignoreGravity: true, isStatic: true}, true);

        this.CreateUI();

        //Create objectSpawner
        const bounds = this.matter.world.setBounds(-100,0,width+200, height+100);
        let spawner = new ObjectSpawner(this, width -20, 200, 'sprites', 'stack-1');
        this.add.existing(spawner);
        this.input.on('pointerdown', spawner.AddSpawnableObject, spawner);
        this.scoreText.text = '0';
    }

    update(time: number, delta: number): void {
        
    }

    DestroyObject(object){
        const objectToDestroy :Phaser.GameObjects.GameObject = object;
        objectToDestroy.destroy(true);
    }

    CreateUI(){
        this.add.image(60, 100, 'scoreUI').setScale(.7);
        this.add.image(32,100, 'scoreicon').setTint(0x000000).setScale(.9);
        this.scoreText = this.add.text(50, 93, '100')
        .setColor('0x000000')
        .setStyle({
            fontSize: '12pt'
        })
    }
}
