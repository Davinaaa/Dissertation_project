import { BodiesFactory, Bounds } from 'matter'
import Phaser, { Physics } from 'phaser'

export default class Game extends Phaser.Scene{
    
    init(){
        this.paddelRightVelocity = new Phaser.Math.Vector2(0, 0)
        this.leftScore = 0
        this.rightScore = 0
    }
    
    preload(){
        this.load.image('port', '../assets/server.png')
    }
    create(){
        // this.add.text(400, 250, 'Gameee!')

        this.physics.world.setBounds(-100, 0, 1000, 500)

        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1)
        this.physics.add.existing(this.ball)

        this.resetBall()

        this.ball.body.setCollideWorldBounds(true, 1, 1)

        this.ball.body.setBounce(1, 1)

        this.paddelLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1)
        this.paddelRight = this.add.rectangle(750, 250,30, 100, 0xffffff, 1)
        this.port = this.add.image(50, 400, 'port')

        this.physics.add.existing(this.paddelLeft, true)
        this.physics.add.existing(this.paddelRight, true)
        this.physics.add.existing(this.port, true)

        this.physics.add.collider(this.paddelLeft, this.ball)
        this.physics.add.collider(this.paddelRight, this.ball)

        this.cursors = this.input.keyboard.createCursorKeys()

        //socre
        this.leftScoreLable = this.add.text(300, 125, '0', {fontSize: 48}).setOrigin(0.5, 0.5)
        this.rightScoreLable = this.add.text(500, 325, '0', {fontSize: 48}).setOrigin(0.5, 0.5)

    }
    update(){
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        const body = this.paddelLeft.body

        console.log("123update")
        if(this.cursors.up.isDown){
            this.paddelLeft.y -= 10
            body.updateFromGameObject()
            // console.log("up pressed")
            // body.setVelocityY(-100)
        } else if(this.cursors.down.isDown){
            this.paddelLeft.y += 10
            body.updateFromGameObject()
        }

        const diff = this.ball.y - this.paddelRight.y
        if (Math.abs(diff)< 10){
            return
        }

        const aiSpeed = 3
        if(diff < 0){
            //ball is above the paddel
            this.paddelRightVelocity.y = -aiSpeed
            if(this.paddelRightVelocity.y < -10){  
                this.paddelRightVelocity.y = -10
            }

        } else if(diff > 0){
            // ball is below
            this.paddelRightVelocity.y = aiSpeed
            if(this.paddelRightVelocity.y > 10){  
                this.paddelRightVelocity.y = 10
            }

        }
        this.paddelRight.y += this.paddelRightVelocity.y
        this.paddelRight.body.updateFromGameObject()

        if (this.ball.x < -30){
            //scored on the left side
            this.resetBall()
            this.incrementLeftScore()

        }else if(this.ball.x > 830){
            // scored on the right side
            this.resetBall()
            this.incrementRightScore()

        }    
    }
    resetBall(){
        this.ball.setPosition(400, 250)
        const angle = Phaser.Math.Between(0, 360)
        const vec = this.physics.velocityFromAngle(angle, 200)
        this.ball.body.setVelocity(vec.x, vec.y)
    }

    incrementLeftScore(){
        this.leftScore += 1
        this.leftScoreLable.text = this.leftScore
    }
    incrementRightScore(){
        this.rightScore += 1
        this.rightScoreLable.text = this.rightScore
    }
}