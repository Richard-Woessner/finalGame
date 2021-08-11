var keys;
var noteA;
var noteS;
var noteD;
var noteF;

var block1;
var block2;
var block3;
var block4;

var lane1speed=2;
var lane2speed=2;
var lane3speed=2;
var lane4speed=2;

var score = 0;
var scoreText;


class mainScene {

    
  
    preload() {
        //LOADS ASSETS
        this.load.image('note1', 'assets/square.png');
        this.load.image('note2', 'assets/square.png');
        this.load.image('note3', 'assets/square.png');
        this.load.image('note4', 'assets/square.png');
        this.load.image('block', 'assets/block.png');
        
    }
    create() {
        //ASSOCIATES ASSETS IN GAME
        

        var lane1 = new Phaser.Geom.Rectangle(10, 0, 80, 600);
        var lane2 = new Phaser.Geom.Rectangle(110, 0, 80, 600);
        var lane3 = new Phaser.Geom.Rectangle(210, 0, 80, 600);
        var lane4 = new Phaser.Geom.Rectangle(310, 0, 80, 600);

        this.add.graphics({ fillStyle: { color: "0x"+localStorage.getItem('0') } }).fillRectShape(lane1);
        this.add.graphics({ fillStyle: { color: "0x"+localStorage.getItem('1') } }).fillRectShape(lane2);
        this.add.graphics({ fillStyle: { color: "0x"+localStorage.getItem('2') } }).fillRectShape(lane3);
        this.add.graphics({ fillStyle: { color: "0x"+localStorage.getItem('3') } }).fillRectShape(lane4);
        
        

        noteA = this.add.image(50, 520, 'note1');
        this.physics.world.enable(noteA);
        noteS = this.add.image(150, 520, 'note2');
        noteD = this.add.image(250, 520, 'note3');
        noteF = this.add.image(350, 520, 'note4');

        block1 = this.add.image(50, 300, 'block');
        block2 = this.add.image(150, 300, 'block');
        block3 = this.add.image(250, 300, 'block');
        block4 = this.add.image(350, 300, 'block');

        keys = this.input.keyboard.addKeys('A,S,D,F');

        this.physics.add.overlap(block1, noteA);
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


        
    }
    update() {
        //HANDLES CONTINUOUS CODE
        this.NoteHit();
        this.blockFall(block1,lane1speed);
        this.blockFall(block2,lane2speed);
        this.blockFall(block3,lane3speed);
        this.blockFall(block4,lane4speed);

    }

    NoteHit(){
        if(keys.A.isDown){
            noteA.setScale(0.9);
            if(this.checkOverlap(block1,noteA)){
                score += 1;
                console.log(score);
                this.destroyBlock(block1);
                lane1speed += Math.random();
                scoreText.setText('Score: ' + score);
            }
        }
        else{
            noteA.setScale(1);
        }

        if(keys.S.isDown){
            noteS.setScale(0.9); 
            if(this.checkOverlap(block2,noteS)){
                score += 1;
                console.log(score);
                this.destroyBlock(block2);
                lane2speed += Math.random();
                scoreText.setText('Score: ' + score);
            }
        }
        else{
            noteS.setScale(1);
        }

        if(keys.D.isDown){
            noteD.setScale(0.9);
            if(this.checkOverlap(block3,noteD)){
                score += 1;
                console.log(score);
                this.destroyBlock(block3);
                lane3speed += Math.random();
                scoreText.setText('Score: ' + score);
            }
        }
        else{
            noteD.setScale(1);
        }

        if(keys.F.isDown){
            noteF.setScale(0.9);
            if(this.checkOverlap(block4,noteF)){
                score += 1;
                console.log(score);
                this.destroyBlock(block4);
                lane4speed += Math.random();
                scoreText.setText('Score: ' + score);
            } 
        }
        else{
            noteF.setScale(1);
        }
     
    }

    blockFall(block, speed){
        block.y += speed;
        if (block.y >= 700) {
            block.y = 0;
            this.blockMiss(block);
          }
    }a

    blockMiss(block){
        if(block == block1){
            lane1speed = 2;
        }else if (block == block2) {
            lane2speed = 2;
        }else if (block == block3) {
            lane3speed = 2;
        }else if (block == block4) {
            lane4speed = 2;
        }
    }

    destroyBlock(block){
        block.y = -20;
        this.blockFall(block1,5);
    }

    checkOverlap(spriteA, spriteB) {
	    var boundsA = spriteA.getBounds();
	    var boundsB = spriteB.getBounds();
	    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
	}



    


  }

  new Phaser.Game({
    width: 400, 
    height: 600, 
    backgroundColor: '#D3D3D3', 
    scene: mainScene, 
    physics: { default: 'arcade' }, 
    parent: 'game', 
  });