class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create(){
        // PLAYER ----------------------------------------------------------------



            // Add Player
        this.player = this.physics.add.sprite(50, 50, 'player', "Hero 0.aseprite").setScale(8);
        this.player.body.setSize(this.player.width / 2, 12);
        this.player.setCollideWorldBounds(true);

            // Player Animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0, 
                end: 0
            }),
            frameRate: 10,
        
        });


        // PLAYER ----------------------------------------------------------------

    }

    update(){

        // PLAYER ----------------------------------------------------------------

            // Player Properties
        let moveDirection = new Phaser.Math.Vector2(0, 0);    

            // Player Movement

        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown){
            moveDirection.x += 100;
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown){
            moveDirection.x -= 100;
        }
        else {
            moveDirection.x = 0;
        }
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown){
            moveDirection.y -= 100;
        }

            // Set Player Velocity
        this.player.body.setVelocity(moveDirection.x, moveDirection.y)

        // PLAYER ----------------------------------------------------------------

    }

}