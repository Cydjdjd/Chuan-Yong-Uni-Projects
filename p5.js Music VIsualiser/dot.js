
function Dot(x,y,x2,y2) {
        //mapping of line to spiral
        this.start = createVector(x, y);
        this.end = createVector(x2, y2);
        this.current = this.end;
        this.angle = 0.0;
    

    
    this.animateLine=function() {
        tempX = map(this.angle, 0, 100, this.start.x, this.end.x, 1);
        tempY = map(this.angle, 0, 100, this.start.y, this.end.y, 1);

        this.current = createVector(tempX, tempY);

        if(tempX == this.end.x && tempY == this.end.y){
          ready = true; 
        }
        this.angle += speed;
    }
}