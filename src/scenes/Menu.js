class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create(){
        // Title Screen
        let title = this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'Tale of Zelmore (very unfinished)').setOrigin(0.5);
        title.setFontSize(40);
        // Instructions
        let instructions = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 
        'Press T to start\nA and D to move left and right\nW to jump\nPress R to restart\nNo enemies yet, only movement and platforms.'
        ).setOrigin(0.5);
        instructions.setFontSize(32);
    
        // Start the game
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyT)){
            this.scene.start('playScene');
        }
    }

}