import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene{
    preload(){
        this.load.image('port', '/Users/wanfangdu/Desktop/Dissertation_Project/Phaser_project/src/assets/server.png')
    }
    create(){
        const text = this.add.text(400, 250, 'hello!')
        text.setOrigin(0.5, 0.5)
        this.port = this.add.image(50, 400, 'port')
    }
}