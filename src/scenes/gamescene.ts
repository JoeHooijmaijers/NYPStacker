import Phaser from 'phaser';
import DroppableObject from '../classes/droppableObject';
import ObjectSpawner from '../classes/objectSpawner';
import ScoreRect from '../classes/ScoreRect';

export default class GameScene extends Phaser.Scene{
    
    score : number = 0;
    scoreText: Phaser.GameObjects.Text;
    ObjectSpawner : ObjectSpawner;

    Height : number;
    Width : number;
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
        this.Width = width;
        this.Height = height;
        let ground = this.matter.add.gameObject(this.add.sprite(width/2, height-40, 'ground'), {name: 'ground', shape: groundShape.ground, ignoreGravity: true, isStatic: true}, true).setName('ground');
        
        this.CreateUI();

        this.ObjectSpawner = new ObjectSpawner(this, width -20, 200, 'sprites', 'stack-1');
        this.add.existing(this.ObjectSpawner);
        this.input.on('pointerdown', this.ObjectSpawner.AddSpawnableObject, this.ObjectSpawner);
        this.scoreText.text = this.score.toString();

        let scoreRect = new ScoreRect(this, width/2, height/2 + 75, width*0.8, height*0.6);
        this.matter.add.gameObject(scoreRect, {
            name:'scoreRect',
            label:'scoreRect',
            isStatic: true,
            isSensor: true});

        this.matter.world.on('collisionstart', (e, o1, o2)=>{
            if([o1.label, o2.label].indexOf('scoreRect') !=-1){
                this.scoreText.text = this.score.toString();
            }
        })

        this.matter.world.on('collisionend', (e, o1, o2)=>{
            if([o1.label, o2.label].indexOf('scoreRect') !=-1){
                this.scoreText.text = this.score.toString();
            }
        })
    }

    update(time: number, delta: number): void {
        this.CalculateScore();
        this.CullObjects();
    }

    CreateUI(){
        this.add.image(60, 100, 'scoreUI').setScale(.7);
        this.add.image(32,100, 'scoreicon').setTint(0x000000).setScale(.9);
        this.scoreText = this.add.text(50, 93, '100')
        .setColor('0x000000')
        .setStyle({
            fontSize: '12pt'
        });
    }

    CalculateScore(){
        if(this.ObjectSpawner.spawnedShapes.length <= 0){return;}
        let maxHeight : number = 0;
        for (let i = 0; i < this.ObjectSpawner.spawnedShapes.length; i++) {
            let shape = this.ObjectSpawner.spawnedShapes[i];
            if(this.ObjectSpawner.spawnedShapes[i].body.position.y < maxHeight){
                maxHeight = this.ObjectSpawner.spawnedShapes[i].body.position.y;
            }
        }
        
        this.score = maxHeight * 100;
        //this.scoreText.text = this.score.toString();
    }
    
    CullObjects(){
        for (let i = this.ObjectSpawner.spawnedShapes.length-1; i > 0; i--) {
            if(this.ObjectSpawner.spawnedShapes[i].body.position.y > this.Height){
                this.ObjectSpawner.spawnedShapes[i].destroy();
                this.ObjectSpawner.spawnedShapes.splice(i, 1);
                console.log('begone');
                console.log(this.ObjectSpawner.spawnedShapes.length);
            }
            
        }
    }
}
