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
        var style3 = {font: "20px", fill: "#000000"};

        var monster = this.physics.add.group({key: 'monster', frameQuantity: 6, setXY: {x: 100, y: 500, stepX: 100}});
        var LNS = this.physics.add.image(200, 300, 'LNS').setScale(.1);
        var cursor = this.add.image(0, 0, 'server').setVisible(false).setScale(.1);
        var server = this.physics.add.staticImage(700, 300, 'server');
        var Server_name = this.add.text(660, 390, ' The Root \nName Server', style3).setVisible(true);


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
            console.log('loose');
            this.scene.start('loose');
        }, this);

        console.log(this.physics.add.collider(LNS, monster));
        this.physics.add.collider(LNS, server, null, function () {
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

    preload: function(){
        // this.load.plugin('DialogModalPlugin', './dialog_plugin.js');
        this.load.image('LNS', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/LNS.png');
        this.load.image('server', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/server1.png');

    },

    create: function (){
        var style1 = { font: "48px", fill: "#ffffff"}
        var style2 = { font: "36px", fill: "#ff2b5d"}
        var style3 = { font: "20px", fill: "#000000"}

        var Lable1 = this.add.text(170, 300, 'Congratulations!', style1);
        var IP = this.add.text(300, 50, '192.33.4.12', style2).setVisible(false);
        var server = this.add.image(700, 300, 'server').setVisible(false);
        var LNS = this.add.image(100, 300, 'LNS').setScale(.2).setVisible(false);
        var dialog1 = this.add.rectangle(300, 170, 300, 100, '#F5F5F5', 0.5).setVisible(false);
        var dialog2 = this.add.rectangle(490, 450, 320, 140, '#F5F5F5', 0.5).setVisible(false);

        var con1 = this.add.text(170, 130, 'Hi!', style3).setVisible(false);
        var con2 = this.add.text(350, 390, 'Hi', style3).setVisible(false);
        var LNS_name = this.add.text(30, 390, 'Local Name Server', style3).setVisible(false);
        var Server_name = this.add.text(660, 390, ' The Root \nName Server', style3).setVisible(false);

        var count = 0;
        // var LNS_count = 0;
        // var Server_count = 0;
        this.input.on('pointerdown', function (){
            let LNS_dialogue = ['Do you know the IP \naddress of \nwww.example.com?', 'Okay, thanks!', 'Oh, what\'s that?'];
            let Server_dialogue = ['Hi! You made it! \nNow, how can I help you?',
                'No, but I know where to \nfind the "COM" name \nservers, you can ask the\nTop Level Domain name server \nat 191.22.43.34 for it!',
                'You\'re lucky to have \nescaped those monsters, \notherwise you might \nhave been attacked by \nman-in-the-middle.',
                'Man-in-the-middle attack:\n' +
                '• Attacker intercept \nthe queries,\n' +
                '• The queries may be \naltered, stealded or \neavesdropped. '];
            // con2.setVisible(true)
            //
            // if(count%2 == 0){
            //     con2.setText(Server_dialogue[Server_count]);
            //     Server_count++;
            //
            // }else{
            //     con1.setText(LNS_dialogue[LNS_count]);
            //     LNS_count++;
            // }
            // count++;
            // console.log(Server_count);
            // if(Server_count > 4){
            //     this.scene.start('level2');
            // }
            if(count == 0){
                Lable1.setVisible(false);
                server.setVisible(true);
                Server_name.setVisible(true);
                LNS_name.setVisible(true);
                LNS.setVisible(true);
                dialog1.setVisible(true);
                con1.setVisible(true);
                IP.setVisible(true);
            }else if(count == 1){
                dialog2.setVisible(true);
                con2.setText(Server_dialogue[0]).setVisible(true);
            }else if(count == 2){
                con1.setText(LNS_dialogue[0]);
            }else if(count == 3){
                con2.setText(Server_dialogue[1]);
            }else if(count == 4){
                con1.setText(LNS_dialogue[1]);
            }else if(count == 5){
                con2.setText(Server_dialogue[2]);
            }else if(count == 6){
                con1.setText(LNS_dialogue[2]);
            }else if(count == 7){
                con2.setText(Server_dialogue[3]);
            }else if(count == 8){
                this.scene.start('level2');
            }
            count++;
        }, this);


    },

});

var Loose = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function Loose ()
        {
            Phaser.Scene.call(this, { key: 'loose' });
        },
    preload: function(){
        this.load.image('LNS', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/LNS.png');
        this.load.image('monster', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/Monster1.png');
        this.load.image('query_right', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/query_right.png');
        this.load.image('query_wrong', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/query_wrong.png');
        this.load.image('exit_button', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/exit_button.png');
        this.load.image('tryagain_button', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/tryagain_button.png');
    },

    create: function (){
        var style3 = { font: "20px", fill: "#000000"}
        var style4 = { font: "30px", fill: "#000000"}
        var LNS_name = this.add.text(100, 390, 'Local Name Server', style3).setVisible(false);
        var Lable1 = this.add.text(400, 300, 'Game over', {fontSize: 48}).setOrigin(0.5, 0.5);
        var monster = this.add.image(500, 300, 'monster').setScale(2).setVisible(false);
        var LNS = this.add.image(200, 300, 'LNS').setScale(.2).setVisible(false);
        var dialog2 = this.add.rectangle(490, 180, 320, 50, '#F5F5F5', 0.5).setVisible(false);
        var monster_dia = this.add.text(350, 160, 'Give me your query! \nNOW!', style3).setVisible(true).setVisible(false);
        var query_right = this.add.image(400, 300, 'query_right').setVisible(false);
        var query_wrong = this.add.image(400, 300, 'query_wrong').setVisible(false);
        var board = this.add.rectangle(400, 300, 600, 400, '#F5F5F5', 0.5).setVisible(false);
        var text1 = this.add.text(180, 150, '   The server is under \nMan-in-the-middle attack, \n    mission failed.', style4).setVisible(false);
        var text2 = this.add.text(150, 310, 'Man-in-the-middle attack:\n' +
            '• Attacker intercept the queries,\n' +
            '• The queries may be altered, stealded \nor eavesdropped. ', style3).setVisible(false);
        var tryagain_button = this.add.image(300, 450, 'tryagain_button').setVisible(false).setScale(.5);
        var exit_button = this.add.image(500, 450, 'exit_button').setVisible(false).setScale(.5);

        var count = 0;
        this.input.on('pointerdown', function (){

            if(count == 0){
                Lable1.setVisible(false);
                monster.setVisible(true);
                LNS.setVisible(true);
                LNS_name.setVisible(true);
                monster_dia.setVisible(true);
                dialog2.setVisible(true);
            }else if(count == 1){
                monster.setVisible(false);
                LNS.setVisible(false);
                LNS_name.setVisible(false);
                monster_dia.setVisible(false);
                dialog2.setVisible(false);
                query_right.setVisible(true);
            }else if(count == 2){
                query_right.setVisible(false);
                query_wrong.setVisible(true);
            }else if(count == 3){
                query_wrong.setVisible(false);
                board.setVisible(true);
                text1.setVisible(true);
                text2.setVisible(true);
                exit_button.setVisible(true);
                tryagain_button.setVisible(true);
            };
            count++;
        }, this);

        tryagain_button.setInteractive();
        tryagain_button.once('pointerdown', function (){
            this.scene.start('level1');
        }, this);

        exit_button.setInteractive();
        exit_button.once('pointerdown', function (){
            this.scene.start('conversations');
        }, this);
    },
});

var Level1Start = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function Level1Start ()
        {
            Phaser.Scene.call(this, { key: 'level1start' });
        },
    preload: function(){
        this.load.image('play_button', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/play_button.png');
        this.load.image('LNS_noquery', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/LNS_noquery.png');
    },
    create: function (){
        var title1 = this.add.text(400, 120, 'Find The Root Name Server!', {fontSize: 34}).setOrigin(0.5, 0.5).setVisible(true);
        var title2 = this.add.text(400, 200, 'Level 1', {fontSize: 36}).setOrigin(0.5, 0.5).setVisible(true);
        var play_button = this.add.image(400, 350, 'play_button').setScale(.8).setVisible(true);
        var LNS_noquery = this.add.image(400,350, 'LNS_noquery').setVisible(false);
        var count = 0;
        play_button.setInteractive();
        play_button.once('pointerdown', function (){
            this.scene.start('level1');
            // if(count == 0){
            //     title1.setVisible(false);
            //     title2.setVisible(false);
            //     play_button.setVisible(false);
            //     LNS_noquery.setVisible(true);
            //     count++;
            // }else{
            //     this.scene.start('level1');
            // }
            // count++;

        },this);

    },
});


var Conversations = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function Conversations() {
            Phaser.Scene.call(this, {key: 'conversations'});
        },
    preload: function () {
        this.load.image('broswer', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/browser.png');
        this.load.image('OS', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/Operating_System.png');
        this.load.image('LNS', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/LNS.png');

    },
    create: function () {
        var broswer = this.add.image(120, 300, 'broswer').setScale(.1);
        var OS = this.add.image(700, 300, 'OS').setScale(.5);
        var OS2 = this.add.image(100, 300, 'OS').setScale(.5).setVisible(false);
        var LNS = this.add.image(700, 300, 'LNS').setScale(.2).setVisible(false);
        var style3 = {font: "20px", fill: "#ffffff"};
        var left_dialogrec = this.add.rectangle(370, 170, 370, 160, '#F5F5F6', 0.5);
        var right_dialogrec = this.add.rectangle(490, 450, 320, 90, '#F5F5F5', 0.5).setVisible(false);

        var left_dialog = this.add.text(200, 110, 'Hey, do you have the IP \naddress of www.example.com?', style3);
        var right_dialog = this.add.text(350, 420, 'No... I\'ll ask \nLocal Name Server \nfind it to you.', style3).setVisible(false);

        var style4 = { font: "20px", fill: "#000000"}
        var broswer_name = this.add.text(80, 380, 'Browser', style4).setVisible(true);
        var LNS_name = this.add.text(570, 380, 'Local Name Server', style4).setVisible(false);
        var OS_name1 = this.add.text(600, 380, 'Operating System', style4).setVisible(true);
        var OS_name2 = this.add.text(30, 380, 'Operating System', style4).setVisible(false);

        var count = 0;
        this.input.on('pointerdown', function () {
            count++;
            var OS_dia = ['Hey, Local Name Server! \nHere\'s some work for you, \ngo to ask for the IP \naddress of www.example.com.',
                'Oh, not again... fine! \nYou are the host\'s local \nname server, you have local \ncache of recent name-to-address \ntranslation pairs, but some of \nthem may be out of date. ',
                'When we ask for the \nIP address of some website, \nyou check your cache first, \nif you don\'t have it, \nforward the query to \nother servers.',
                'They are The Root Name \nServers, Top-Level Domain \nName Servers and Authoratative \nName Servers. ',
                'You should start with \nThe Root Name Server at \n192.33.4.12. Be careful, \nthere\'re bad guys on the road!',
                'The query you\'re holding \nis very valuable, many bad \npeople want it, so be careful, \ndon\'t let them take it! \nGood luck!'];

            var LNS_dia = ['Me? Who am I? \nWhat do I do?',
                'Okay... but what servers?',
                'Fine... wait, \nwhat bad guys?!'];

            if (count == 1) {
                right_dialogrec.setVisible(true);
                right_dialog.setVisible(true);


            } else if (count == 2) {
                broswer.setVisible(false);
                broswer_name.setVisible(false);
                OS.setVisible(false);
                OS_name1.setVisible(false);
                OS2.setVisible(true);
                OS_name2.setVisible(true);
                LNS.setVisible(true);
                LNS_name.setVisible(true);
                right_dialogrec.setVisible(false);
                right_dialog.setVisible(false);
                left_dialog.setText(OS_dia[0]);
            } else if (count == 3) {
                right_dialogrec.setVisible(true);
                right_dialog.setText(LNS_dia[0]).setVisible(true);
            } else if (count == 4) {
                left_dialog.setText(OS_dia[1]);
            } else if (count == 5) {
                left_dialog.setText(OS_dia[2]);

            } else if (count == 6) {
                right_dialog.setText(LNS_dia[1]);

            } else if (count == 7) {
                left_dialog.setText(OS_dia[3]);
            } else if (count == 8) {
                left_dialog.setText(OS_dia[4]);
            } else if (count == 9) {
                right_dialog.setText(LNS_dia[2]);
            } else if (count == 10) {
                left_dialog.setText(OS_dia[5]);
            } else if (count == 11) {
                this.scene.start('level1start');
            }
        }, this);
    },
});


var Level2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function Level2 ()
        {
            Phaser.Scene.call(this, { key: 'level2' });
        },
    preload: function(){
        this.load.image('play_button', 'https://raw.githubusercontent.com/Davinaaa/Dissertation_project/main/Phaser_project/src/assets/play_button.png');

    },
    create: function (){
        this.add.text(400, 120, 'Find The Top Level Domain Name Server!', {fontSize: 34}).setOrigin(0.5, 0.5);
        this.add.text(400, 200, 'Level 2', {fontSize: 36}).setOrigin(0.5, 0.5);
        var play_button = this.add.image(400, 350, 'play_button');
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
    scene: [ Conversations, Loose, Level1, Win, Level1Start, Level2]
};

var game = new Phaser.Game(config);