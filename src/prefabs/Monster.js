class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, player){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        scene.physics.add.existing(this); // add physics to the scene

        // store player property
        this.player = player;


        scene.enemyFSM = new StateMachine('idle', {
            walk: new WalkState(),
            damaged: new DamagedState(),
        }, [scene, this]);


    }

    update(){
        // move left
        if (this.x > 0){
            this.x -= 2
        }
        // wrap around from left to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}

class WalkState extends State{
    enter(scene, enemy){
        enemy.body.setVelocityX(-80);
        enemy.anims.play('enemy-walk', true);
    }

    execute(scene, enemy){
        if (enemy.x <= 0 - enemy.width){
            enemy.reset();
        }
    }
}

class DamagedState extends State{
    enter(scene, enemy){
        enemy.body.setVelocityX(0);
        enemy.anims.play('enemy-damaged', true);
    }

    execute(scene, enemy){
        if (enemy.anims.currentFrame.isLast){
            enemy.body.setVelocityX(-80);
            enemy.anims.play('enemy-walk', true);
        }
    }

}