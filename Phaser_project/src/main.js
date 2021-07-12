import Phaser, { Physics } from 'phaser'

import TitleScreen from './scenes/TitleScreen'
import Game from './scenes/Game'
import Level1 from './scenes/Level1'
import Level2 from './scenes/Level2'

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: '#616161',
    physics:{
        default: 'arcade',
        arcade:{
            gravity: { y: 0 },
            debug: true
        }
    }
}

const game = new Phaser.Game(config)

// game.scene.add('titlescreen', TitleScreen)
// game.scene.add('game', Game)
game.scene.add('level1', Level1)

// game.scene.start('titlescreen')
// game.scene.start('game')
game.scene.start('level1')