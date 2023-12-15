class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create(){
        // Title Screen
        let title = this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Tale of Zelmore', { font: '40px "Comic Sans MS"', fill: '#3d7da8'}).setOrigin(0.9);
        // title.setFontSize(40);
        // Instructions
        let instructions = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 
        'Press O to start\nWARNING: You will die in one hit. Have fun!\nGet the red crystal and escape through the portal!\n\nPress M for credits\nPress N for controls',
        { font: '32px "Comic Sans MS"', fill: '#3d7da8'}
        ).setOrigin(0.5);
        // instructions.setFontSize(32);
    
        // Keys
        this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyO)){
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyM)){
            this.scene.start('creditsScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyN)){
            this.scene.start('controlsScene');
        }
    }

}