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
        this.crystalGrabbed = false;

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

            // Player cheat mode controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.gravityOn = true;
        this.keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U); // disables gravity for the player


        // PLAYER ----------------------------------------------------------------



        // CAMERA ----------------------------------------------------------------

        this.cameras.main.setBounds(0, 0, 1980, 720)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(6);

        // CAMERA ----------------------------------------------------------------



        // PLAYER COLLISIONS -----------------------------------------------------

        terrainLayer.setCollisionByProperty({
            collides: true
        });
        this.physics.add.collider(this.player, terrainLayer)
        

        // PLAYER COLLISIONS -----------------------------------------------------



        // AUDIO -----------------------------------------------------------------

        this.jumpSound = this.sound.add('jump');

        // AUDIO -----------------------------------------------------------------

        // ENEMY -----------------------------------------------------------------

            // Spawn enemies
        this.enemies = [
                // Cave Enemies
            new Enemy(this, 178, 338, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
            new Enemy(this, 425, 458, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
            new Enemy(this, 465, 455, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
            new Enemy(this, 504, 457, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
            new Enemy(this, 737, 231, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
            new Enemy(this, 892, 375, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
            new Enemy(this, 737, 231, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
            new Enemy(this, 799, 230, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
            new Enemy(this, 869, 231, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
                // Castle Enemies
            new Enemy(this, 1472, 212, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
            new Enemy(this, 1537, 212, 'enemy', 0, this.player).setScale(0.8).setData('isMoving', false),
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

            // Enemy Damage
        this.enemies.forEach(enemy => {
            this.physics.add.overlap(this.player, enemy, this.playerDeath, null, this);
        });

        // ENEMY -----------------------------------------------------------------


        // BOSS ------------------------------------------------------------------

            // Spawn boss
        this.boss = this.physics.add.sprite(1575, 275, 'crocodile').setScale(1.5);

            // Projectiles
        this.time.addEvent({
            delay: 5500, // Time in milliseconds before the event fires. 5000ms = 5s
            callback: this.spawnCannonBall, // Function to call when the event fires
            callbackScope: this, // Context in which to call the function
            loop: true // Whether the event repeats after it fires
        });

        // BOSS ------------------------------------------------------------------


        // OBJECTIVES ------------------------------------------------------------

            // Spawn crystal
        // this.crystal = this.physics.add.sprite(53, 138, 'crystal').setScale(0.9);
        this.crystal = this.physics.add.sprite(1584, 209, 'crystal').setScale(0.9);
        this.crystal.body.setImmovable(true);
        this.crystal.body.setSize(this.crystal.width/2);

            // Crystal Collision
        this.physics.add.collider(this.player, this.crystal, () => {
            if (this.crystalGrabbed == false){
                this.crystalGrabbed = true;
                this.crystal.destroy();
            }
        });

            // Spawn portal
        // this.portal = this.physics.add.sprite(136, 138, 'portal').setScale(0.9);
        this.portal = this.physics.add.sprite(1214, 451, 'portal').setScale(0.9);

            // Portal Collision
        this.physics.add.collider(this.player, this.portal, () => {
            if (this.crystalGrabbed == true){
                this.scene.start('winScene');
            }
            else{
                this.scene.start('loseScene');
            }
        });
        this.portal.body.setImmovable(true);


        // OBJECTIVES ------------------------------------------------------------


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
        }

        if (!this.player.body.onFloor()){
            this.player.body.setGravityY(800) // Increase gravity while in the air
        } 
        else {
            this.player.body.setGravityY(300); // Reset gravity when the player touches the ground
        }

            // Cheat mode keys [super jump and speed]
        if (this.cursors.left.isDown) {
            this.player.x -= 1; 
        }
        if (this.cursors.right.isDown) {
            this.player.x += 1; 
        }
        if (this.cursors.up.isDown) {
            this.player.y -= 2; 
        }
        if (this.cursors.down.isDown) {
            this.player.y += 3;
        }

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


    spawnCannonBall(){
        // let cannonBall = this.physics.add.sprite(0, 133, 'cannon ball').setScale(0.8);
        let cannonBall = this.physics.add.sprite(1352, 438, 'cannon ball').setScale(0.8);
        cannonBall.body.setVelocityX(20);
        cannonBall.body.setCircle(cannonBall.width / 2, 1);
        this.physics.add.collider(cannonBall, this.player, () => {
            this.scene.start('deathScene');
        });
    }

    playerDeath(){
        this.scene.start('deathScene');
    }

}
