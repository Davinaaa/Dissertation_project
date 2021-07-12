
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
    console.log("preload")
    this.load.setPath('/Users/wanfangdu/Desktop/Dissertation_Project/Phaser_project/src/assets');
    this.load.image('port', 'p.png');
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
game.scene.start()