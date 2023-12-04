class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload(){
        this.load.path = './assets/';
        this.load.atlas('player', 'Hero.png', 'Hero.json');
        this.load.image('tiles', 'Cracked Stone Floor.png', {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.load.image('tilesetImage','Tilemap.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'map.json')
    }

    create() {
        // start playScene after loading everything
        this.scene.start('playScene');
    }


}