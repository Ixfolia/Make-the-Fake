class Win extends Phaser.Scene{
    constructor(){
        super("winScene");
    }

    create(){

        // Instructions
        let instructions = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 
        'You left with the crystal and won!\nPress R to restart'
        ).setOrigin(0.5);
        instructions.setFontSize(32);
    
        // Start the game
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyR)){
            this.scene.start('playScene');
        }
    }
}