// import Phaser, { Physics } from 'phaser'

// export default class Game extends Phaser.Scene{

var Level1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level1 ()
        {
            Phaser.Scene.call(this, { key: 'level1' });
        },

    preload: function (){
        console.log("preload111")
        this.load.image('LNS', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/LNS.png');
        this.load.image('monster', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/Monster1.png')
        this.load.image('server', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/server1.png');
    },

    create: function (){
        var monster = this.physics.add.group({key: 'monster', frameQuantity: 6, setXY: {x: 100, y: 500, stepX: 100}});
        // var monster = this.physics.add.image(200, 300, 'monster').setScale(.1);
        var LNS = this.physics.add.image(200, 300, 'LNS').setScale(.1);
        var cursor = this.add.image(0, 0, 'server').setVisible(false).setScale(.1);
        var server = this.physics.add.staticImage(700, 300, 'server');


        LNS.body.setCollideWorldBounds(true, 1, 1);
        LNS.body.setBounce(1, 1);

        this.input.on('pointermove', function (pointer) {
            cursor.setVisible(false).setPosition(pointer.x, pointer.y);

            this.physics.moveToObject(LNS, pointer, 240);

            Phaser.Utils.Array.Each(
                monster.getChildren(),
                this.physics.moveToObject,
                this.physics,
                pointer, 100);
        }, this);

        // this.matter.world.on('collisionstart', function (event, LNS, server) {
        //
        //     LNS.gameObject.setTint(0xff0000);
        //     server.gameObject.setTint(0x00ff00);
        //
        // });
        // this.physics.add.collider(LNS, server);
        this.physics.add.collider(LNS, monster, null, function () {
            // this.physics.world.removeCollider(collider);
            console.log('loose');
            this.scene.start('loose');


        }, this);
        console.log(this.physics.add.collider(LNS, monster));
        this.physics.add.collider(LNS, server, null, function () {
            // this.physics.world.removeCollider(collider);
            console.log('worked');
            this.scene.start('win');

        }, this);
    },
});

var Win = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function Win ()
        {
            Phaser.Scene.call(this, { key: 'win' });
        },
    create: function (){
        var Lable1 = this.add.text(400, 300, 'Congratulations!', {fontSize: 48}).setOrigin(0.5, 0.5);
    },
});

var Loose = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function Loose ()
        {
            Phaser.Scene.call(this, { key: 'loose' });
        },
    create: function (){
        var Lable1 = this.add.text(400, 300, 'You loose', {fontSize: 48}).setOrigin(0.5, 0.5);
    },
});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    backgroundColor: '#C7EDCC',
    physics: {
        default: 'arcade',
        arcade: {debug: true}
    },
    scene: [ Level1, Win, Loose ]
};

var game = new Phaser.Game(config);