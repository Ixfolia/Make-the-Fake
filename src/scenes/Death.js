class Death extends Phaser.Scene{
    constructor(){
        super("deathScene");
    }

    create(){

        // Instructions
        let instructions = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 
        'You died\nPress R to restart', { font: '32px "Comic Sans MS"', fill: '#3d7da8'}
        ).setOrigin(0.5);
        // instructions.setFontSize(32);
    
        // Start the game
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyR)){
            this.scene.start('playScene');
        }
    }

}
