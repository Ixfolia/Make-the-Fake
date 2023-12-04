class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create(){

        // MAP -------------------------------------------------------------------

            // Tilemap
            
            const  map = this.make.tilemap({key: 'tilemapJSON', tileWidth: 120, tileHeight: 30});
            // const map = this.add.tilemap('tilemapJSON');
            const tileset = map.addTilesetImage('tileset', 'tilesetImage');

            const terrainLayer = map.createLayer('Tile Layer 1', tileset, 0, 0);

            const bgLayer = map.createLayer('background', tileset, 0, 0);

            
        // MAP -------------------------------------------------------------------


        // PLAYER ----------------------------------------------------------------

            // Player Properties
        const playerSpawn = map.findObject('Object Layer 1', obj => obj.name === "playerSpawn")
        this.faceRight = true;

            // Add Player
        
        this.player = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, 'player').setScale(1);
        // this.player = this.physics.add.sprite(0, game.config.height / 2, 'player', "Hero 0.aseprite").setScale(1);
        this.player.body.setSize(this.player.width / 2, 12);
        this.player.setCollideWorldBounds(true);

            // Player Animations

            // Player Physics
        this.player.setGravityY(400); // Gravity

            // Player Controls
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // PLAYER ----------------------------------------------------------------



        // CAMERA ----------------------------------------------------------------

        this.cameras.main.setBounds(0, 0, 1000, 1000)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(6);

        // CAMERA ----------------------------------------------------------------



        // COLLISIONS ------------------------------------------------------------

        terrainLayer.setCollisionByProperty({
            collides: true
        });
        this.physics.add.collider(this.player, terrainLayer)
        

        // COLLISIONS ------------------------------------------------------------

    }

    update(){

        // Restart game
        if (Phaser.Input.Keyboard.JustDown(this.keyR)){
            this.scene.start('menuScene');
        }
        // PLAYER ----------------------------------------------------------------

            // Player Properties
        let moveDirection = new Phaser.Math.Vector2(0, 0);  

            // Player Movement

        if (this.keyD.isDown){
            moveDirection.x += 100;
            this.player.anims.play('walk-right', true)
            this.faceRight = true;
        }
        else if (this.keyA.isDown){
            moveDirection.x -= 100;
            this.player.anims.play('walk-left', true)
            this.faceRight = false;
        }
        else {
            moveDirection.x = 0;
            this.player.anims.play('idle-right')
            if (this.player.body.onFloor()) { // check if the player is on the ground
                // Check last direction to play idle animation
                if (this.faceRight == true) {
                    this.player.anims.play('idle-right')
                }
                else{
                    this.player.anims.play('idle-left')
                }
            }
        }
        if (this.keyW.isDown && this.player.body.onFloor()){
            if (this.faceRight == true) {
                this.player.anims.play('idle-right')
            }
            let jumpTimer = this.time.addEvent({
                delay: 10, // ms
                callback: () => {
                    this.player.setVelocityY(-200); // Small upward velocity
                },
                repeat: 10 // Repeat 10 times
            });
        }
        if (this.keyW.isDown && this.player.body.onFloor()){
            if (this.faceRight == true) {
                this.player.anims.play('idle-right')
            }
            let jumpTimer = this.time.addEvent({
                delay: 10, // ms
                callback: () => {
                    this.player.setVelocityY(-200); // Small upward velocity
                },
                repeat: 10 // Repeat 10 times
            });
        }

        if (!this.player.body.onFloor()){
            this.player.body.gravity.y += 200; // Increase gravity while in the air
        } 
        else {
            this.player.body.setGravityY(800); // Reset gravity when the player touches the ground
        }

            // Set Player Velocity
        this.player.body.setVelocity(moveDirection.x, moveDirection.y)


            // Player Attack

        // PLAYER ----------------------------------------------------------------

    }

}