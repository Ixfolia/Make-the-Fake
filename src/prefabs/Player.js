class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame); // call Sprite parent class
        scene.add.existing(this); // add object to existing scene
        scene.physics.add.existing(this); // add to physics system

        this.body.setSize(this.width / 2, this.height / 2);
        this.body.setCollideWorldBounds(true);

        // Player Properties
        this.direction = direction
        this.playerVelocity = 100 // in pixels

        // Initialize state machine
        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            // dead: new DeadState(),
        }, [scene, this]);
    }

}

class IdleState extends State {
    enter(scene, player) {
        player.setVelocity(0);
        player.anims.play('walk-${player.direction}')
        player.anims.stop();
    }

    execute(scene, player) {
        const { left, right, space } = scene.keys;
        const HKey = scene.keys.HKey;

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing')
            return
        }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move')
            return
        }
        
    }

}


class MoveState extends State {
    execute(scene, player) {
        const { left, right, up, space } = scene.keys;
        const HKey = scene.keys.HKey;

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing')
            return
        }

        // transition to idle if not pressing a movement key
        if(!(left.isDown || right.isDown || up.isDown || down.isDown )) {
            this.stateMachine.transition('idle')
            return
        }

        // move player
        let moveDirection = new Phaser.Math.Vector2(0,0);
        if(left.isDown) {
            moveDirection.x = -1;
        }
        else if(right.isDown) {
            moveDirection.x = 1;
        }
        if(up.isDown) {
            moveDirection.y = -1;
        }
        
        // normalize vector, update player position, play animation
        moveDirection.normalize();
        player.body.setVelocity(moveDirection.x * player.playerVelocity, moveDirection.y * player.playerVelocity);
        player.anims.play('walk-${player.direction}', true);
    }
    
}

class SwingState extends State {
    enter(scene, player) {
        player.body.setVelocity(0);
        player.anims.play('swing-${player.direction}');
        hero.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}
