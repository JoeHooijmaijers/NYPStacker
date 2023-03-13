import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/gamescene';

new Phaser.Game(
    Object.assign(config, {
        scene: [GameScene]
    })
);
