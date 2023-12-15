class Controls extends Phaser.Scene{
    constructor(){
        super("controlsScene");
    }

    create(){
        // Text
        let controls1 = this.add.text(game.config.width / 2, game.config.height / 2 - 100, 
        'Controls'
        ).setOrigin(0.5);
        controls1.setFontSize(40);

        let controls2 = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 
        'A and D to move left and right\nW to jump\nPress R to restart\nUse arrow keys for super jump, speed, noclip if too hard \n(buggy, use alongside regular controls)\nPress N to go back to menu'
        ).setOrigin(0.5);
        controls2.setFontSize(32);

        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyN)){
            this.scene.start('menuScene');
        }
    }
}