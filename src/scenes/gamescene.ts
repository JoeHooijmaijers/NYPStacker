import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }

    preload(){
        //Stacksprites
        this.load.atlas('sheet','assets/sprite_stacking@1x' ,'assets/sprite_stacking_atlas@1x.json');
        this.load.json('shapes', 'assets/physics_json@1x.json');

        //(Back)ground
        this.load.image('ground', 'assets/ground@1x.png');
        this.load.json('groundshape', 'assets/ground_physics_json@1x.json')
        this.load.image('background', 'assets/background@1x.png');
    }

    create(){
        const { width, height} = this.cameras.main;
        let shapes = this.cache.json.get('shapes');
        
        this.add.image(187, 406, 'background');
        this.matter.add.rectangle(100, 100, 100, 100);
        this.matter.add.image(width/2, height-40, 'ground');
        console.log(this.matter.world)
        const bounds = this.matter.world.setBounds(0,0,width, height);
    }

    update(time: number, delta: number): void {
        
    }
}
