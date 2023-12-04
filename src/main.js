/** TO DO LIST
 * Gravity system for jumping
 * Add platforms
 * Walk animation
 * Slash animation
 * Cameras
 * 
 * 
*/

'use strict'

let config = {
    // parent: "Phaser-Game",
    type: Phaser.AUTO,
    render: {
        pixelArt: true,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    width: 1366,
    height: 768,
    zoom: 2,
    
    scale: {
        mode: Phaser.Scale.FIT,
    },

    scene: [ Load, Play ],
}

let game = new Phaser.Game(config);

