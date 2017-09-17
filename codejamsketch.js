var movers= [];
var a1;
    
function setup() {
    noCursor();
    createCanvas(windowWidth, windowHeight);
    background(0);

        while (movers.length < 200) {
        var tempMover = new Mover(random(width), random(height),random(30));
        
        var overlap = false;
        for ( var i = 0; i < movers.length; i++) {
            if (tempMover.intersects(movers[i])) {
                overlap = true;
            }
        }
        
        if (!overlap) {
            movers.push(tempMover)
        }
    }
    
    a1 = new Attractor(mouseX, mouseY, 20);
}


function draw() {
    
    background(0);
    var gravity = new p5.Vector(0,1);
    a1.updateLocation();
    a1.display();
    
    
    for (var i=0; i< movers.length; i++) {
        
        // create the friction force
        var fricMag = 0.8;
        var friction = movers[i].vel.copy();
        friction.mult(-1);
        friction.normalize();
        friction.mult(fricMag)
        
        for ( var j =0; j < movers.length; j++) {
            
            if( i !== j && movers[i].intersects(movers[j]) || movers[i].intersects(a1)) {
            //movers[i].changeCol();
            //movers[j].changeCol();
            movers[i].changeDir(movers[j]);
            movers[j].changeDir(movers[i]);

               }
        
        }
        if(mouseIsPressed) {
            movers[i].repulse(a1);
        }
        
        movers[i].gravitate(a1);
        //smovers[i].checkEdges();
        movers[i].applyForce(friction);
        movers[i].applyForce(gravity);
        movers[i].update();
        movers[i].display();

        
    }

}