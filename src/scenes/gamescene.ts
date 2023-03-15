import { debug } from 'console';
import Phaser from 'phaser';
import DroppableObject from '../classes/droppableObject';
import ObjectSpawner from '../classes/objectSpawner';
import ScoreRect from '../classes/ScoreRect';

export default class GameScene extends Phaser.Scene{
    
    objectgroup;
    score : number = 0;
    scoreText: Phaser.GameObjects.Text;
    worldbounds : Phaser.Physics.Arcade.StaticGroup;

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
        let ground = this.matter.add.gameObject(this.add.sprite(width/2, height-40, 'ground'), {name: 'ground', shape: groundShape.ground, ignoreGravity: true, isStatic: true}, true).setName('ground');
        
        this.CreateUI();
        // this.CreateGameObjectBounds(width, height);

        //Create objectSpawner
        //const bounds = this.matter.world.setBounds(-100,0,width+200, height+100);
        let spawner = new ObjectSpawner(this, width -20, 200, 'sprites', 'stack-1');
        this.add.existing(spawner);
        this.input.on('pointerdown', spawner.AddSpawnableObject, spawner);
        this.scoreText.text = this.score.toString();

        let scoreRect = new ScoreRect(this, width/2, height/2 + 75, width*0.8, height*0.6);
        this.matter.add.gameObject(scoreRect, {
            name:'scoreRect',
            label:'scoreRect',
            isStatic: true,
            isSensor: true});

        this.matter.world.on('collisionstart', (e, o1, o2)=>{
            if([o1.label, o2.label].indexOf('scoreRect') !=-1){
                this.score += scoreRect.scoreIncrement;
                this.scoreText.text = this.score.toString();
            }
        })

        this.matter.world.on('collisionend', (e, o1, o2)=>{
            if([o1.label, o2.label].indexOf('scoreRect') !=-1){
                this.score -= scoreRect.scoreIncrement;
                this.scoreText.text = this.score.toString();
            }
        })

        //this.physics.add.collider(spawner.spawnedShapes, bounds.walls, this.CreateUI, this);

        // this.matter.world.on('collisionstart', (colliderA : Phaser.GameObjects.GameObject, colliderB : Phaser.GameObjects.GameObject)=>{
        //     console.log('collision');
        //     console.log(colliderA.name);
        //     console.log(colliderB.name);
        //     if(colliderB.name == 'worldBounds'){
        //         //colliderA.destroy(true);
        //         console.log(colliderA);
        //     }
        //     if(colliderA.name == 'worldBounds'){
        //         //colliderB.destroy(true);
        //         console.log(colliderA);
        //     }
        // });

        // this.matter.world.on('collisionstart', (e, o1, o2)=>{
        //     console.log(o1.label);
        //     if([o1.label, o2.label].indexOf('worldBounds') != -1 &&
        //     [o1.label, o2.label].indexOf('stack') != -1){
        //         o2.gameObject.destroy();
        //     }
        // })
    }

    update(time: number, delta: number): void {
        
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

    CreateGameObjectBounds(w:number, h:number){
        
        //Up
        let upperbounds = this.matter.add.gameObject(this.add.rectangle(w/2, 10, w, 10, 0x000000),{
            label: 'worldBounds',
            name: 'worldBounds', 
            ignoreGravity: true,
            isSensor:true, 
            isStatic:true}, true).setName('worldBounds');
        //Bot
        let lowerbounds = this.matter.add.gameObject(this.add.rectangle(w/2, h-20, w, 10, 0x000000),{
            label: 'worldBounds',
            name: 'worldBounds', 
            ignoreGravity: true,
            isSensor:true, 
            isStatic:true}, true).setName('worldBounds');
        //Left
        let leftbounds = this.matter.add.gameObject(this.add.rectangle(10, h/2, 10, h, 0x000000),{
            label: 'worldBounds',
            name: 'worldBounds', 
            ignoreGravity: true,
            isSensor:true,  
            isStatic:true}, true).setName('worldBounds');
        //Right
        let rightbounds = this.matter.add.gameObject(this.add.rectangle(w-10, h/2, 10, h, 0x000000),{
            label: 'worldBounds',
            name: 'worldBounds', 
            ignoreGravity: true,
            isSensor:true, 
            isStatic:true}, true).setName('worldBounds');
            
        //this.worldbounds = this.physics.add.staticGroup([upperbounds, ]);
    }
}
