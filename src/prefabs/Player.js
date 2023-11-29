class Player extends Phaser.Scene {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame); // call Sprite parent class
        scene.add.existing(this); // add object to existing scene
        scene.physics.add.existing(this); // add to physics system

        this.body.setSize(this.width / 2, this.height / 2);
        this.body.setCollideWorldBounds(true);
        
    }

}