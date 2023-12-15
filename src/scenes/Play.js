class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create(){

        // MAP -------------------------------------------------------------------

            // Tilemap
            
        const  map = this.make.tilemap({key: 'tilemapJSON', tileWidth: 120, tileHeight: 30});
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
        this.player.setGravityY(300); // Gravity

            // Player Controls
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)


        // PLAYER ----------------------------------------------------------------



        // CAMERA ----------------------------------------------------------------

        this.cameras.main.setBounds(0, 0, 1366, 768)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(6);

        // CAMERA ----------------------------------------------------------------



        // COLLISIONS ------------------------------------------------------------

        terrainLayer.setCollisionByProperty({
            collides: true
        });
        this.physics.add.collider(this.player, terrainLayer)
        

        // COLLISIONS ------------------------------------------------------------



        // AUDIO -----------------------------------------------------------------

        this.jumpSound = this.sound.add('jump');

        // AUDIO -----------------------------------------------------------------

        // ENEMY -----------------------------------------------------------------

            // Spawn enemies
        this.enemies = [
            new Enemy(this, 57, 134, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
            new Enemy(this, 178, 338, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
            new Enemy(this, 425, 458, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
            new Enemy(this, 465, 455, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
            new Enemy(this, 504, 457, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
            new Enemy(this, 737, 231, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
            new Enemy(this, 892, 375, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
            new Enemy(this, 737, 231, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
            new Enemy(this, 799, 230, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
            new Enemy(this, 869, 231, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),,
        ]

            // Enemy hitboxes
        this.enemies.forEach(enemy => {
            enemy.body.setCircle(enemy.width / 2, 1);
        });


            // Enemy Physics
        this.enemies.forEach(enemy => {
            enemy.setGravityY(300);
        });

        
            // Enemy Collision
        this.enemies.forEach(enemy => {
            this.physics.add.collider(enemy, terrainLayer);
        });



        // ENEMY -----------------------------------------------------------------

    }

    update(){
        const speed = 80;

        // Restart game
        if (Phaser.Input.Keyboard.JustDown(this.keyR)){
            this.scene.start('menuScene');
        }

        // PLAYER ----------------------------------------------------------------

            // Player Properties
        let moveDirection = new Phaser.Math.Vector2(0, 0);  

            // Player Movement

        if (this.keyD.isDown){
            this.player.body.setVelocityX(speed);
            this.player.anims.play('walk-right', true)
            this.faceRight = true;
        }
        else if (this.keyA.isDown){
            this.player.body.setVelocityX(-speed);
            this.player.anims.play('walk-left', true)
            this.faceRight = false;
        }
        else {
            this.player.body.setVelocityX(0);
            this.player.anims.play('idle-right')
            if (this.player.body.onFloor()) { // check if the player is on the ground
                // Check last direction to play idle animation
                if (this.faceRight == true) {
                    this.player.anims.play('idle-right', true)
                }
                else{
                    this.player.anims.play('idle-left', true)
                }
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyW) && this.player.body.onFloor()){
            this.jumpSound.play();
            this.player.body.setVelocityY(-200);
            // moveDirection.y = -500;
            // this.isJumping = true;
        }

        if (!this.player.body.onFloor()){
            this.player.body.setGravityY(800) // Increase gravity while in the air
        } 
        else {
            this.player.body.setGravityY(300); // Reset gravity when the player touches the ground
        }



            // Player Attack

        // PLAYER ----------------------------------------------------------------

        // ENEMY -----------------------------------------------------------------


            // Enemy Properties
        this.enemies.forEach(enemy => {
            if (this.cameras.main.worldView.contains(enemy.x, enemy.y)){
                    // Enemy Movement
                var direction = new Phaser.Math.Vector2(this.player.x - enemy.x, this.player.y - enemy.y);
                direction.normalize();

                var speed = 20;
                enemy.body.setVelocityX(direction.x * speed);
                enemy.setData('isMoving', true);
            }
            else{
                enemy.setData('isMoving', false);
            }


        })
            // Enemy Animations
        this.enemies.forEach(enemy => {
            if (enemy.getData('isMoving') == true){
                enemy.anims.play('enemy-walk', true);
            }
            else{
                enemy.anims.play('enemy-idle', true);
            }
        });


        // ENEMY -----------------------------------------------------------------


    }

}
