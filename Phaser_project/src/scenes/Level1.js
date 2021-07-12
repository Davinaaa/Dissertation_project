// import { BodiesFactory, Bounds } from 'matter'
// import Phaser, { Physics } from 'phaser'

// export default class Game extends Phaser.Scene{
    
//     init(){
//     }
    
//     preload(){
//         this.load.image('port', '../assets/server.png')
//     }
//     create(){
//         this.port = this.add.image(50, 400, 'port')

//     }
//     update(){
//         }     

//     }

  
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#efefef',
    scene: {
        preload: preload,
        create: create
    }
};
var game = new Phaser.Game(config);

function preload ()
{
    console.log("preload111")
    // this.load.setPath('/Users/wanfangdu/Desktop/Dissertation_Project/Phaser_project/src/assets');
    this.load.image('port', 'https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/input/p.png');
    // this.load.image('port', '/assets/p.png')
}

function create ()
{
    this.input.addPointer(5);

    var p = this.add.image(0, 0, 'port').setInteractive();


    Phaser.Actions.GridAlign([p], {
        width: 6,
        cellWidth: 132,
        cellHeight: 200,
        x: 68,
        y: 300
    });

    this.input.on('gameobjectdown', function (pointer, gameObject) {

        gameObject.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);

    });

    this.input.on('gameobjectup', function (pointer, gameObject) {

        gameObject.clearTint();

    });
}
