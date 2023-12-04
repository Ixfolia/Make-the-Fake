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

            
        // MAP -------------------------------------------------------------------


        // PLAYER ----------------------------------------------------------------

            // Player Properties
        const playerSpawn = map.findObject('Object Layer 1', obj => obj.name === "playerSpawn")

            // Add Player
        
        this.player = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, 'player', "Hero 0.aseprite").setScale(1);
        // this.player = this.physics.add.sprite(0, game.config.height / 2, 'player', "Hero 0.aseprite").setScale(1);
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
        
            // Player Physics
        this.player.setGravityY(400); // Gravity

        // PLAYER ----------------------------------------------------------------



        // CAMERA ----------------------------------------------------------------

        this.cameras.main.setBounds(0, 0, 1000, 1000)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(4);

        // CAMERA ----------------------------------------------------------------



        // COLLISIONS ------------------------------------------------------------

        terrainLayer.setCollisionByProperty({
            collides: true
        });
        this.physics.add.collider(this.player, terrainLayer)
        

        // COLLISIONS ------------------------------------------------------------

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
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown && this.player.body.onFloor()){
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

        // PLAYER ----------------------------------------------------------------

    }

}