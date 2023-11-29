let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    width: 1366,
    height: 768,
    scene: [ Menu, Play ],
    scale: {
        mode: Phaser.Scale.FIT,
    }
}

let game = new Phaser.Game(config);

