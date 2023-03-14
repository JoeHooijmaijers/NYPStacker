import Phaser from 'phaser';

export default{
    type: Phaser.AUTO,
    width: 275,
    height: 812,
    parent : 'mainGame',
    scale : {
        width: 375,
        height: 812,
        mode: Phaser.Scale.FIT,
    },
    physics: {
        default: 'matter',
        matter:{
            debug : true,
            gravity: {
                x:0,
                y:.5,
            }
        }
    }
};
