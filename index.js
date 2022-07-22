const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 800,
    height: 640,
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
let ball;
let player1;
let player2;
let isGameStarted = false;
let cursors;
const paddleSpeed = 350;
let keys = {};
let p1victoryText;
let p2victoryTest;

function preload(){
    this.load.image("ball", "assets/images/ball.png");
    this.load.image("paddle", "assets/images/paddle.png");
}


function create(){
    ball=this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        "ball"
    );
    ball.setCollideWorldBounds(true);
    ball.setBounce(1, 1);

    player1=this.physics.add.sprite(
        this.physics.world.bounds.width - (ball.body.width / 2 + 1),
        this.physics.world.bounds.height / 2,
        "paddle"
    );
    player1.setImmovable(true);
    player1.setCollideWorldBounds(true);

    player2=this.physics.add.sprite(
        ball.body.width / 2 + 1,
        this.physics.world.bounds.height / 2,
        "paddle"
    );
    player2.setImmovable(true);
    player2.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.physics.add.collider(ball, player1);
    this.physics.add.collider(ball, player2);

    p1victoryText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height /2,
        "Player 1 Wins!"
    );
    p1victoryText.setVisible(false);
    p1victoryText.setOrigin(.5);

    p2victoryText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height /2,
        "Player 2 Wins!"
    );
    p2victoryText.setVisible(false);
    p2victoryText.setOrigin(.5);

}

function update(){
    if(!isGameStarted){
        const initialVelocityX = 250;
        const initialVelocityY = 250;
        ball.setVelocityX(initialVelocityX);
        ball.setVelocityY(initialVelocityY);
        isGameStarted = true;
    }

    if (ball.body.x > player1.body.x){
        p2victoryText.setVisible(true);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
    }
    if (ball.body.x < player2.body.x){
        p1victoryText.setVisible(true);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
    }

    player1.body.setVelocityY(0);
    if (cursors.up.isDown){
        player1.body.setVelocityY(-paddleSpeed);
    }
    if (cursors.down.isDown){
        player1.setVelocityY(paddleSpeed);
    }
    if(ball.body.velocity.y > paddleSpeed){
        ball.body.setVelocityY(paddleSpeed);
    }
    if(ball.body.velocity.y < -paddleSpeed){
        ball.body.setVelocityY(-paddleSpeed);
    }
    

    player2.body.setVelocityY(0);
    if (keys.w.isDown){
        player2.body.setVelocityY(-paddleSpeed);
    }
    if (keys.s.isDown){
        player2.setVelocityY(paddleSpeed);
    }
}