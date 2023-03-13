import Phaser from 'phaser';

export default{
    type: Phaser.AUTO,
    parent : 'mainGame',
    scale : {
        width: 375,
        height: 812,
        mode: Phaser.Scale.FIT,
        physics: {
            default: 'matter',
            matter:{
                gravity:{
                    y:300
                },
                debug : true
            }
        }
    }
};
