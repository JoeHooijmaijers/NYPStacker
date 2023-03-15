export default class ScoreRect extends Phaser.GameObjects.Rectangle{

    scoreIncrement = 100;
    constructor(scene : Phaser.Scene, x :number, y :number, width: number, height: number){
        super(scene, x, y, width, height, 0x0000ff, 0.3);
    }

    IncreaseScore(score: number){
        score += this.scoreIncrement;
    }

    DecreaseScore(score: number){
        score -= this.scoreIncrement;
    }
}