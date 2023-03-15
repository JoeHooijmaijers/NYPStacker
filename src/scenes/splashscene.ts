import Phaser from "phaser";
import GameScene from "./gamescene";
export default class LoadingScene extends Phaser.Scene{
    constructor(){
        super('loading');
    }

    preload(){
        this.load.image('background', 'assets/background@1x.png');
        this.load.image('splash', 'assets/logo_campaign@1x.png');
        this.load.image('tapinstA', 'assets/tutorial-guide-click@1x.png');
        this.load.image('tapinstB', 'assets/tutorial-guide-pointer@1x.png');
    }

    create(){
        const { width, height} = this.cameras.main;
        this.add.image(width/2, height/2, 'background');
        this.add.image(width/2, height/2, 'splash');
        let tapA = this.add.image(width/2, height/2 + 150, 'tapinstA');
        let tapB = this.add.image(width/2, height/2 + 150, 'tapinstB');
        let tapInstruction = this.add.text(width/2 - 100, height/2 + 250, 'Tap to start!',{
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#fff'
        })
        this.add.tween({
            targets:[tapA, tapB, tapInstruction],
            alpha: 0,
            duration: 1000,
            yoyo: true,
            repeat: -1
            
        })

        this.input.on('pointerdown', this.LoadGameScene, this);
        
    }

    LoadGameScene(){
        this.scene.start('GameScene');
    }

}
