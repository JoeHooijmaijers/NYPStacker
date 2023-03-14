import { World } from 'matter';
import Phaser from 'phaser';
import ObjectSpawner from '../classes/objectSpawner';

export default class GameScene extends Phaser.Scene{
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
        const { width, height} = this.cameras.main;
        var shapes = this.cache.json.get('shapes');
        var groundShape = this.cache.json.get('groundshape');
        console.log(shapes);

        let spawner = new ObjectSpawner(this, width -20, 100, 'sprites', 'stack-1');

        this.add.image(187, 406, 'background');

        let deez = this.add.sprite(100, 100, 'sprites', 'stack-1');
        let nuts = this.matter.add.gameObject(deez, {shape: shapes.stack1},true);

        let ground = this.matter.add.gameObject(this.add.sprite(width/2, height-40, 'ground'), {shape: groundShape.ground}, true);

        console.log(nuts)
        
        //this.matter.add.image(width/2, height-40, 'ground');
        const bounds = this.matter.world.setBounds(0,0,width, height);
        this.add.existing(spawner);
    }

    update(time: number, delta: number): void {
        
    }
}
