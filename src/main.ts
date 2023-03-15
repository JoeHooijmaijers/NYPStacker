import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/gamescene';
import LoadingScene from './scenes/splashscene';

new Phaser.Game(
    Object.assign(config, {
        scene: [LoadingScene, GameScene]
    })
);
