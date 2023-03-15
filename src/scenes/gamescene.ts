import Phaser from 'phaser';
import DroppableObject from '../classes/droppableObject';
import ObjectSpawner from '../classes/objectSpawner';
import ScoreRect from '../classes/ScoreRect';

export default class GameScene extends Phaser.Scene{
    
    score : number = 0;
    highscore: number;
    scoreText: Phaser.GameObjects.Text;
    highscoreText: Phaser.GameObjects.Text;
    ObjectSpawner : ObjectSpawner;

    GroundHeight : number;
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
        this.GroundHeight = height-40;
        let ground = this.matter.add.gameObject(this.add.sprite(width/2, this.GroundHeight, 'ground'), {name: 'ground', shape: groundShape.ground, ignoreGravity: true, isStatic: true}, true).setName('ground');
        this.CreateUI();
        this.ObjectSpawner = new ObjectSpawner(this, width -20, 200, 'sprites', 'stack-1');
        this.add.existing(this.ObjectSpawner);
        this.input.on('pointerdown', this.ObjectSpawner.AddSpawnableObject, this.ObjectSpawner);
        this.scoreText.text = this.score.toString();
        this.CalculateScore();

        this.matter.world.on('collisionstart', (e, o1, o2)=>{
            this.CalculateScore();
            this.scoreText.text = this.score.toString();
            this.ObjectSpawner.AllowSpawn();
        })
    }

    update(time: number, delta: number): void {
        this.CullObjects();
    }

    CreateUI(){
        this.add.image(this.Width-60, 60, 'scoreUI').setScale(.7);
        this.add.image(60, 100, 'scoreUI').setScale(.7);
        this.add.image(60, 60, 'scoreUI').setScale(.7);
        this.add.image(32,60, 'scoreicon').setScale(.9);
        this.add.image(32,100, 'scoreicon').setTint(0x000000).setScale(.9);
        this.scoreText = this.add.text(50, 93, '100',{
            fontStyle: 'bold'
        })
        .setColor('0x000000')
        .setStyle({
            fontSize: '12pt',
        });
        this.highscoreText = this.add.text(50, 53, '100',{
            fontStyle: 'bold'
        })
        .setColor('0x000000')
        .setStyle({
            fontSize: '12pt'
        });
    }

    CalculateScore(){
        if(this.ObjectSpawner.spawnedShapes.length <= 0){return;}
        let maxHeight : number = 0;
        for (let i = 0; i < this.ObjectSpawner.spawnedShapes.length; i++) {
            if((this.GroundHeight - this.ObjectSpawner.spawnedShapes[i].body.position.y) > maxHeight){
                maxHeight = (this.GroundHeight - this.ObjectSpawner.spawnedShapes[i].body.position.y);
            }
        }
        console.log(this.GroundHeight);
        console.log(this.ObjectSpawner.spawnedShapes[this.ObjectSpawner.spawnedShapes.length-1].body.position.y);
        if(Phaser.Math.RoundTo(maxHeight,0) > this.score){
            this.score = Phaser.Math.RoundTo(maxHeight, 0);
        }
        
        if(this.score > this.highscore){
            this.highscore = this.score;
            this.highscoreText.text = this.score.toString();
        }
    }
    
    CullObjects(){
        for (let i = this.ObjectSpawner.spawnedShapes.length-1; i > 0; i--) {
            if(this.ObjectSpawner.spawnedShapes[i].body.position.y > this.Height){
                this.ObjectSpawner.spawnedShapes[i].destroy();
                this.ObjectSpawner.spawnedShapes.splice(i, 1);
            }
        }
    }

    Restart(){
        this.scene.restart();
    }
}
