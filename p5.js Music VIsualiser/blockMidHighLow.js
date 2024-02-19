var rotateThresh;
var progThresh;
var seedThresh;
var dotPair;
var dotArray = [];
var tempX;
var tempY;
var speed ; 
var ready = false; 
var boxColour = "#6800FF";
var lineColour = "#00FF91";
var angle = 2.0;
var offset = 500;
var scalar = 200;
var speed = 0.1;
var speed2=0.5;
function BlockMidHighLow(){
    
    this.name = "Block Mid High Low";
    var rot=0;
    var noiseStep = 0.01;
    var prog=0;
    //GUI for rotateThresh,progThresh and seedThresh
    var gui;
    this.setup= function(){
        
        rotateThresh =67;
        progThresh = 180;
        seedThresh =100;
        //Gui
        gui = createGui("Blocks extension");
        gui.setPosition(width-200,0);
        
        sliderRange(0.001,0,0.001);
        gui.addGlobals("noiseStep");
        
        sliderRange(0,255,1);
        //gui for rotation of blocks
        gui.addGlobals("rotateThresh");
        //gui for prog thresh
        gui.addGlobals("progThresh");
        //gui for seed thresh
        gui.addGlobals("seedThresh");
        //gui for box colour
        gui.addGlobals("boxColour");
        //gui for line colour
        gui.addGlobals("lineColour");
        gui.hide();
        
    }
    this.setup();
    this.onResize = function(){
        gui.setPosition(width-200,0);
    }
    this.onResize();
    
    this.draw = function(){
        
        this.spiral();
    
        console.log(dotArray);
    }
    this.unSelectVisual=function(){
        gui.hide();
    }
    
    this.selectVisual=function(){
        gui.show();
    }
    function rotatingBlocks(energy){
        if(energy<rotateThresh){
            rot+=0.01;
        }
        // r is the length of the block
        //map the energy level (0 to 255) to 20 to 100
        var r = map(energy,0,255,8,30);
        
        push();
        rectMode(CENTER);
        translate(width/2,height/2);
        rotate(rot);
        fill(boxColour);
        noStroke();
        var incr= 200/(6-1);
        //draw the row of squares
        for(var i =0;i<5;i++){
            rect(i*incr ,0,r,r);
        }
        pop();
    }
    
    function noiseLine(energy1,energy2){
        push();
        translate(width/2,height/2);
        
        //start drawing of the noise line using being and end shape
        beginShape();
        noFill();
        stroke(lineColour);
        strokeWeight(3);
        
        //get the noise value
        for(var i =0; i<dotArray.length;i++){
            var x = noise(i*noiseStep+prog);
            var y = noise(i*noiseStep+prog+1000);
            x=map(x,0,1,dotArray[i].start.x-500, dotArray[i].end.x-500);
            y=map(y,0,1,dotArray[i].start.y-500, dotArray[i].end.y-500);
            vertex(x,y);
        }
        endShape();
        if(energy1>progThresh){
            prog+=0.05;
        }
        if(energy2>seedThresh){
            noiseSeed();//randomise the noise value - make it more "random"
        } 
        pop();
    }
    this.isMouseInGUI = function(){
        var inGUI = false;
        var gui_x = gui.prototype._panel.style.left;
        var gui_y = gui.prototype._panel.style.top;
        var gui_height = gui.prototype._panel.clientHeight;
        var gui_width = gui.prototype._panel.clientWidth;
        
        gui_x=parseInt(gui_x,10);
        gui_y= parseInt(gui_y,10);
        gui_height= parseInt(gui_height,10);
        gui_width = parseInt(gui_width,10);
        
        if(mouseX>gui_x && mouseX >gui_x +gui_width){
            if(mouseY>gui_y && mouseY<gui_y + gui_height){
                inGUI = true;
            }
            
            return inGUI;
        }
    }
    this.spiral=function(){
        //spiral
        fourier.analyze();
        var b = fourier.getEnergy("bass");
        console.log(b);
        var t = fourier.getEnergy("treble");
        rotatingBlocks(b);
        noiseLine(b,t);
        var x = offset + cos(angle) * scalar;
        var y = offset + sin(angle) * scalar;
        var x2 = offset + cos(angle-0.1) * scalar+0.1;
        var y2 = offset + sin(angle-0.1) * scalar+0.1;
        if(b>170 &&t){
        angle += speed;
        scalar += speed2;
        dotArray.push(new Dot(x, y,x2,y2));
        dotArray[dotArray.length-1].animateLine();
        }
        console.log(x);
        console.log(y);
        
    
  
    
    //push dot in to make line appear
    if(ready){
        ready = false; 
        var prev = dotArray[dotArray.length-1];
        dotArray.push(new Dot(prev.end.x, prev.end.y));
        
    }
    //remove dot,make line retract
    if(scalar>400 &&b>170 &&t){
        dotArray.pop();
        dotArray.pop();
        
    }
    //restart the cycle
    if(dotArray.length==0){
        scalar=200;
    }
    }
}