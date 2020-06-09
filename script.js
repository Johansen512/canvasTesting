function startGame() {
    myGameArea.start();
    
  }
  
  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 900;
      this.canvas.height = 600;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.frameNo = 0; 
      this.interval = setInterval(updateGameArea, 1);
      window.addEventListener('keydown', function (e) {
        myGameArea.keys = (myGameArea.keys || []);
        myGameArea.keys[e.keyCode] = true;
      })
      window.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = false;
      })



    },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },

      stop : function() {
        clearInterval(this.interval);
      }
  }


  function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
  }

  //component

  var myGamePiece;
  var myObstacles = [];
  var myScore = 0;
  var scoreValue = document.querySelector (".score");

function startGame() {
    /*myObstacle = new component(10, 200, "green", 300, 120);*/
    myObstacle = new component(30, 30, "img/ninja2.png", 10, 120, "image");
    /*myScore = new component("30px", "Consolas", "black", 40, 40, "text");*/
    myGamePiece = new component(60, 60, "img/ninja1.png", 10, 400, "image");
    /*redGamePiece = new component(75, 75, "red", 10, 10);
  yellowGamePiece = new component(75, 75, "yellow", 50, 60);
  blueGamePiece = new component(75, 75, "blue", 10, 110);*/
  myGameArea.start();
  
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
      }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } /*else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }*/
}

  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }



}

function updateGameArea() {
    /*if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop();
      } else {*/
    var x, y;
        for (i = 0; i < myObstacles.length; i += 1) {
          if (myGamePiece.crashWith(myObstacles[i])) {

            myScore++;
            
            scoreValue.innerHTML = "SCORE:" + myScore;
           

            
           
            

            //return;

            
          }
        }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(10)) {
        x = myGameArea.canvas.width;
        minHeight = 10;
        maxHeight = 400;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 100;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        /*myObstacles.push(new component(40, 40, "img/ninja4.png", x, 30 + gap, "image"));
        myObstacles.push(new component(40, 40, "img/ninja4.png", x, height + gap, "image"));
        myObstacles.push(new component(40, 40, "img/ninja4.png", x, height + 20 + gap, "image"));
        myObstacles.push(new component(40, 40, "img/ninja4.png", x, height + 40, "image"));
        myObstacles.push(new component(40, 40, "img/ninja4.png", x, 40 + gap, "image"));
        myObstacles.push(new component(40, 40, "img/ninja4.png", x, 50 + gap, "image"));*/

        //myObstacles.push(new component(80, 80, "img/monster3.png", x, 300 + gap, "image"));
        //myObstacles.push(new component(80, 80, "img/monster2.png", x, height + gap, "image"));
        //myObstacles.push(new component(80, 80, "img/monster3.png", x, height + 20 + gap, "image"));
        myObstacles.push(new component(80, 80, "img/monster4.png", x, height, "image"));
        //myObstacles.push(new component(80, 80, "img/monster5.png", x, 40 + gap, "image"));
        //myObstacles.push(new component(80, 80, "img/monster6.png", x, 50 + gap, "image"));
        

        console.log (myObstacles)
        
      }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
    /*myObstacle.x += -1;
    myObstacle.update();*/
    myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -3; myGamePiece.image.src = "img/ninja4.png"}
  if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 3; myGamePiece.image.src = "img/ninja2.png"}
  if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -3; myGamePiece.image.src = "img/ninja3.png"}
  if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 3; myGamePiece.image.src = "img/ninja1.png" }
  /*myScore.text = "SCORE: " + myGameArea.frameNo;*/
  
  
    myGamePiece.newPos();
    myGamePiece.update();
    //myScore.update();
    /*redGamePiece.x += 1;
  yellowGamePiece.x += 1;
  yellowGamePiece.y += 1;
  blueGamePiece.x += 1;
  blueGamePiece.y -= 1;
    redGamePiece.update();
  yellowGamePiece.update();
  blueGamePiece.update();*/
  }

  function moveup() {
    myGamePiece.image.src = "img/ninja2.png";
    myGamePiece.speedY -= 1;
  }
  
  function movedown() {
    myGamePiece.image.src = "img/ninja2.png";
    myGamePiece.speedY += 1;
  }
  
  function moveleft() {
    myGamePiece.image.src = "img/ninja2.png";  
    myGamePiece.speedX -= 1;
  }
  
  function moveright() {
    myGamePiece.image.src = "img/ninja2.png";  
    myGamePiece.speedX += 1;
  }

  function stopMove() {
    myGamePiece.image.src = "img/ninja1.png";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
  }

  function monster (){
    myObstacles.image.src = "img/ninja1.png";
  }