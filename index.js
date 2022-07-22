const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 800,
    height: 640,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.Center_BOTH
    },
    scene: {
        preload,
        create,
        update
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: false
        }
    }
};

const game = new Phaser.Game(config);

function preload(){
    this.load.image("ball", "assets/images/ball.png");
    this.load.image("paddle", "assets/images/paddle.png");
}


function create(){

}

function update(){

}