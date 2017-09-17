function Mover(x,y,r) {
    this.loc = new p5.Vector(x,y);
    this.acc = new p5.Vector();
    this.vel = new p5.Vector();
    this.col = color(230, 247, 202);
    this.mass = r;
    this.rad = r;
    this.aacc = 0;
    this.avel = 0;
    this.angle = 0;
    
    //display
    this.display = function() {
        ellipseMode(RADIUS);
        fill(this.col);
        noStroke();
        ellipse(this.loc.x, this.loc.y, this.rad,this.rad);
    }
    
    //function to make it move 
    this.update = function() {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.acc.mult(0);
        
    }
    
    this.applyForce = function(force) {
        var f = new p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }    
    
    this.intersects = function(other) {
        var dist = new p5.Vector.sub(this.loc, other.loc);
        if(dist.mag() < this.rad + other.rad){
            return true;
        } else {
            return false;
        }
    }
    
    
    this.changeDir = function(other) {
        var dist = new p5.Vector.sub(this.loc, other.loc);
        //var distCorr = (this.rad + other.rad-dist.mag())/2;
        this.vel = dist.normalize();
        this.update();
    }
    
    
    this.changeCol = function() {
        this.col= color(random(255),random(255),random(255));
    }
    
    this.checkEdges = function() {
        if (this.loc.x < this.rad || this.loc.x > width-2*this.rad) {
            this.vel.x *= -1;
        } else if (this.loc.y < this.rad || this.loc.y > height-2*this.rad) {
            this.vel.y *= -1;    
            }
    }
    
    this.gravitate = function(attractor) {
        var attraction = new p5.Vector.sub( attractor.loc, this.loc);
        var distance = attraction.mag();
        var gMag = 0.01*this.mass * attractor.mass / distance* distance;
        attraction.normalize();
        attraction.mult(gMag);
        this.applyForce(attraction);
    }

    this.repulse = function(repulsor) {
        let repulsion = new p5.Vector.sub(this.loc, repulsor.loc);
        let distance = repulsion.mag();
        let repMag = 0.1*this.mass * repulsor.mass / distance* distance;
        repulsion.normalize();
        repulsion.mult(repMag);
        this.applyForce(repulsion);
    }
    }    

// Big huge ball class

function Attractor(x,y,r) {
    this.loc = new p5.Vector(x,y);
    this.acc = new p5.Vector();
    this.vel = new p5.Vector();
    this.col = color(183, 20, 118);
    this.mass = r;
    this.rad = r;
    
    this.display = function() {
    ellipseMode(RADIUS);
    fill(230, 247, 202);
    noStroke();
    ellipse(this.loc.x, this.loc.y, this.rad,this.rad);
        
    }
    
    this.updateLocation = function() {
        this.loc.x = mouseX;
        this.loc.y = mouseY;
    }
    
}


     
     

    

    


