/**
 * Brady Lin
 * CMPM 120
 * Make the Fake Game
 * 
    CLASS GRADING

=== INFRASTRUCTURE ==

+5 The game runs/executes without critical errors or crashes. (Graders will use Chrome, so be sure you game works in that browser.)

+5 The project has a well-maintained and updated GitHub page that shows meaningful contributions, commits, and milestones throughout the course of the project's history (including contributions from all team members if you are not working solo).

=== LOOK & FEEL ===

+5 The game includes a title screen, some means to view credits, some means of completion/conclusion, and the ability to restart from within the game. (These criteria are judged relative to your specific game, genre, artistic tone, etc.)

+5 The player can learn the game's premise and controls from within the game, whether through a tutorial, instruction screen, or other diegetic means.

+5 The game is playable to completion by a player of moderate skill. If your game is purposefully difficult and you're concerned that graders won't be able to evaluate it properly, please provide a "grader mode" or debug menu that will allow us to see everything you've made, along with instructions for how to access that mode.

+10 Your game has artistic cohesion, i.e. the art, sound, typography, etc. reflect your target media's aesthetic goals, your game is legible as a recreation of the fictional game, and your assets make sense together.

=== TECHNICAL EXECUTION ===

+10 Your game uses at least five of Phaser's major components, which may include: physics systems, cameras, particle effects, text objects, the animation manager, the tween manager, timers, tilemaps, pipeline FX, etc. (Please list these components in your main.js file.) Components that should appear in all projects, like Scenes and Game Objects, do not count.
    - Physics
    - Cameras
    - Tilemaps
    - Animations
    - Text
+10 Your game has mechanical cohesion, i.e. the mechanics reflect your adaptation's technical goals, the game controls and performs as expected, and the mechanics are well-implemented.

+5 Your project and code are well-structured and organized, including legible comments, appropriate data structures, sensible prefabs, meaningful variable names, logical scene structures, etc. (Nathan's examples are a good baseline.)

=== POLISH & STYLE ===

+5 Your game has that extra bit of polish, creativity, technical prowess, and/or originality that helps it stand out from other games. We use this criteria as a grade "tilt" to reward games that we really enjoyed, that are bold and inventive, that adapt their target media thoughtfully, that demonstrate strong technical skills, and/or went beyond the stated objectives of the assignment. Feel free to add a comment to your main.js/Canvas submission if you wish to point out any features that we might miss.

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
    width: 1980,
    height: 720,
    zoom: 2,
    
    scale: {
        mode: Phaser.Scale.FIT,
    },

    scene: [ Load, Play, Menu, Death, Lose, Win, Credits, Controls],
}

let game = new Phaser.Game(config);

