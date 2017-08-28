var movers = []; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    for (var i=0; i < 5; i++) {
       movers[i] = new Mover(); 
    }
    
}

function mousePressed() {
    movers.push(new Mover());
        
}

function draw() {
    background(0);
    for (var i=0; i<movers.length; i++) {
        movers[i].pull();
        movers[i].tail();
        movers[i].display();
        
    }
     console.log(movers[0].trail)
}

function Mover() {
    this.rad = 15;
    this.c = color(213, 232, 148);
    this.loc = new p5.Vector(width/2, height/2);
    this.vel = new p5.Vector(0.1, 0.1);
    this.acc = new p5.Vector()
    this.history = [];
    
    this.move = function(){
        this.vel.add(this.acc);
        this.vel.limit(20);
        this.loc.add(this.vel);
        
        var trail = new p5.Vector(this.loc.x, this.loc.y);
        this.history.push(trail);
        
        if (this.history.length >100) {
            this.history.splice(0,1);
        }
    }
   
    this.pull = function(){
        
        this.target = new p5.Vector(mouseX, mouseY);
        this.dir = new p5.Vector.sub(this.target, this.loc)
        this.dir.normalize();
        this.dir.mult(0.5);
        this.acc = this.dir;
        
        this.move();
    }
    
    this.display = function() {
        noStroke();
        fill(this.c);
        ellipse(this.loc.x, this.loc.y, this.rad, this.rad);
        
       
    }
    
    this.tail = function() {
        
        noFill();
        beginShape();
        for ( var i = 0; i<this.history.length; i++) {
            var pos = this.history[i];
            stroke(this.c);
            vertex(pos.x, pos.y)    
        }
        endShape();
    }

}