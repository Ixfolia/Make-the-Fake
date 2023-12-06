/** TO DO LIST
 * Gravity system for jumping
 * * It currently looks like the player is hitting the roof of some sort, fix physics
 * Switch jump from is.Down to just.Down
 * Add platforms
 * Walk animation X
 * attack animation
 * * Maybe try using a State Machine to handle animations
 * Cameras X
 * Coins
 * Boss Fight
 * Mini enemies
 * * Try to either focus on coins and platforming or a boss fight.
 * 
 * 
*/

'use strict'

let config = {
    parent: "Phaser-Game",
    type: Phaser.AUTO,
    render: {
        pixelArt: true,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        }
    },
    width: 1366,
    height: 768,
    zoom: 2,
    
    scale: {
        mode: Phaser.Scale.FIT,
    },

    scene: [ Load, Play, Menu ],
}

let game = new Phaser.Game(config);

