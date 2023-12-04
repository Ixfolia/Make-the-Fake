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
        this.createHeroAnims();

        // start playScene after loading everything
        this.scene.start('playScene');
    }

    createHeroAnims() {
        this.anims.create({
            key: 'idle-right',
            frames: [{
                key: 'player',
                frame: 'Hero 0.aseprite'
            }]
        })

        this.anims.create({
            key: 'idle-left',
            frames: [{
                key: 'player',
                frame: 'Hero 5.aseprite'
            }]
        })

        this.anims.create({
            key: 'walk-right',
            frameRate: 10,
            repeat: 1,
            frames: this.anims.generateFrameNames('player', {
                start: 1, 
                end: 2,
                prefix: 'Hero ',
                suffix: '.aseprite'
            })
        });

        this.anims.create({
            key: 'walk-left',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNames('player', {
                start: 6, 
                end: 7,
                prefix: 'Hero ',
                suffix: '.aseprite'
            })
        });
    }

    

}