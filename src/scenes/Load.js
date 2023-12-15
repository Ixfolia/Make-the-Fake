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
        this.load.atlas('enemy', 'Slime.png', 'Slime.json');
        this.load.atlas('crystal', 'crystal.png', 'crystal.json');
        this.load.image('lightning', 'lightning.png');
        this.load.image('locked door', 'locked door.png');
        this.load.image('crocodile', 'crocodile.png');
        this.load.image('cannon ball', 'cannon ball.png');
        this.load.image('portal', 'portal.png');
        
    

        // load tilemap assets
        this.load.image('tilesetImage','Tilemap.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'map.json')

        // load sfx
        this.load.audio('jump', 'sfx/jump.wav');


    }

    create() {
        this.createHeroAnims();
        this.createEnemyAnims();
        this.createCrystalAnims();

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

    createEnemyAnims(){

        // Idle animation
        this.anims.create({
            key: 'enemy-idle',
            frames: [{
                key: 'enemy',
                frame: 'Slime 0.aseprite'
            }]
        });

        // Walk animation
        this.anims.create({
            key: 'enemy-walk',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNames('enemy', {
                start: 0, 
                end: 1,
                prefix: 'Slime ',
                suffix: '.aseprite'
            })
        });

        // Damaged animation
        this.anims.create({
            key: 'enemy-damaged',
            frameRate: 10,
            repeat: 0,
            frames: this.anims.generateFrameNames('enemy', {
                start: 2, 
                end: 2,
                prefix: 'Slime ',
                suffix: '.aseprite'
            })
        });


    }

    createCrystalAnims(){
        // Idle animation
        this.anims.create({
            key: 'crystal-idle',
            frameRate: 10,
            repeat: 1,
            frames: this.anims.generateFrameNames('crystal', {
                start: 0, 
                end: 3,
                prefix: 'crystal ',
                suffix: '.aseprite'
            })
        });
    }
    

}