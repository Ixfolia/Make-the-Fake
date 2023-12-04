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

        // load tilemap assets
        this.load.image('tilesetImage','Tilemap.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'map.json')
    }

    create() {
        this.createHeroAnims();

        // start playScene after loading everything
        this.scene.start('menuScene');
    }

    createHeroAnims() {

        // Idle right
        this.anims.create({
            key: 'idle-right',
            frames: [{
                key: 'player',
                frame: 'Hero 0.aseprite'
            }]
        })

        // Idle left
        this.anims.create({
            key: 'idle-left',
            frames: [{
                key: 'player',
                frame: 'Hero 5.aseprite'
            }]
        })

        // Walking right
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

        // Walking left
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

        // Slashing right
        this.anims.create({
            key: 'slash-right',
            frameRate: 10,
            repeat: 1,
            frames: this.anims.generateFrameNames('player', {
                start: 3, 
                end: 4,
                prefix: 'Hero ',
                suffix: '.aseprite'
            })
        });

        // Slashing left
        this.anims.create({
            key: 'slash-left',
            frameRate: 10,
            repeat: 1,
            frames: this.anims.generateFrameNames('player', {
                start: 8, 
                end: 9,
                prefix: 'Hero ',
                suffix: '.aseprite'
            })
        });




    }


    

}