class Credits extends Phaser.Scene{
    constructor(){
        super("creditsScene");
    }

    create(){
        // Text
        let credits1 = this.add.text(game.config.width / 2, game.config.height / 2 - 100, 
        'Credits',{ font: '40px "Comic Sans MS"', fill: '#3d7da8'}
        ).setOrigin(0.5);
        // credits1.setFontSize(40);

        let credits2 = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 
        'Code: Brady Lin\nArt: Brady Lin (except for the slime, heavily copied from Terraria slime)\nSFX: Created in sfxr.me\nAnimation: Brady Lin\n\nPress M to return to menu',
        { font: '32px "Comic Sans MS"', fill: '#3d7da8'}
        ).setOrigin(0.5);
        // credits2.setFontSize(32);

        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyM)){
            this.scene.start('menuScene');
        }
    }

}