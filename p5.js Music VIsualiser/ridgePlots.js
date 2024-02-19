function RidgePlots(){
    this.name = "Ridge Plots";
    var startX;
    var startY;
    var endY;
    var spectrumWidth;
    var speed =0.7;
    var output = [];
    var wave1X;
    var wave2X;
    var wave1YSlope;
    var wave2YSlope;
    var wave1YPos=0;
    var wave2YPos=0;
    var wave1X2;
    var wave2X2;
    
    this.onResize = function(){
        startX = width/2;
        endY = height/5;
        startY = height- endY;
        spectrumWidth = (width/5);
    };
    // call onResize when we new RidgePlots() object in sketch.
    this.onResize();
    
    this.draw = function(){
        background(0);
        stroke(255);
        strokeWeight(20);
        //set colour mode to HSB
        colorMode(HSB,360);
        //insert animation functions into draw
        this.loop();
        this.xaxisMovement();
        this.slope();
        this.inAndOut();
        this.merge();
        this.extend();
        this.wave(wave1YSlope,wave1X,wave1YPos,wave1X2);
        this.wave(wave2YSlope,wave2X,wave2YPos,wave2X2);
    }
    this.loop=function(){
        //loops the animation
        if(frameCount%1200==0){
            wave1X=375;
            wave2X=25;
            wave1YSlope =5;
            wave2YSlope =-5;
            wave1YPos=0;
            wave2YPos=258;
            wave1X2=0;
            wave2X2=0;
            spectrumWidth = (width/5);
            output.splice(0,1200);
        }
        
    }
    this.xaxisMovement=function(){
        //1st animation-movement along x-axis
        if(wave1X != 0 ){
        wave1X=400-(frameCount*4)%1200;
        wave2X=(frameCount*4)%1200
        }
    }
    this.slope=function(){
        //2nd animation- straightening of ridge plots to become horizontal
        wave1YSlope =5
        wave2YSlope =-5
        
        wave1YPos=0;
        wave2YPos=258;
        if(wave1X==0 && wave1YSlope > 0 && wave2YSlope < 0 ){
        wave1YSlope -= 5/30*(frameCount%1200-100);
        wave2YSlope += 5/30*(frameCount%1200-100);
        wave1YPos += 129/30*(frameCount%1200-100);
        wave2YPos -= 129/30*(frameCount%1200-100);
        }
        if(wave1YSlope<=0 && wave2YSlope>=0 ){
            wave1YSlope = 0;
            wave2YSlope = 0;
            wave1YPos = 133;
            wave2YPos = 133;
        }
    }
    this.inAndOut=function(){
        //3rd animation-ridge plots go out and in
         wave1X2=0;
        wave2X2=0;
        if(wave1YSlope == 0 ){
            wave1X2+=40*(frameCount%1200-130)/2;
            wave2X2-=40*(frameCount%1200-130)/2;;
        }
        if(wave1X2 >= 550 ){
            wave1X2 = 550;
            wave2X2 = -550;
            wave1X2-=40*(frameCount%1200-160)/2;
            wave2X2+=40*(frameCount%1200-160)/2;;
        }
        
        if(wave1X2 <= 0){
            wave1X2=0;
            wave2X2=0;
            
        }
    }
    this.merge=function(){
        //4th animation-2 ridge plots merge into 1
        if(frameCount%1200>=220 && wave1X2==0){
            wave1X2=0;
            wave2X2=0;
            wave1YSlope = 0;
            wave2YSlope = 0;
            wave1YPos = 133;
            wave2YPos = 133;
            console.log(frameCount);
            wave1X=400-(frameCount%1200-220);
            wave2X=(frameCount%1200-220);
        }
        if(frameCount%1200>400){
            wave1X=200;
            wave2X=200;
        }
    }
    this.extend=function(){
        //5th animation- single ridge plot extends in length
        if(wave1X==200 && frameCount%1200>400){
            spectrumWidth+=(frameCount%1200-400)/100
            wave1X+=(frameCount%1200-400);
            wave2X+=(frameCount%1200-400);
        }
        if(wave1X>=450 &&frameCount%1200>600 ){
            wave1X=450;
            wave2X=450;
            spectrumWidth=(width/5)*3;
        }
    }
        this.wave =function(t1,t2,t3,t4){
            //drawing of ridge plots
            var m = 100;
            //gradient effect
            var topR = 255 * noise(frameCount / m);
            var topG = 255 * noise(1000 + frameCount / m);
            var topB = 255 * noise(2000 + frameCount / m);
            var bottomR = 255 * noise(3000 + frameCount / m);
            var bottomG = 255 * noise(4000  + frameCount / m);
            var bottomB = 255 * noise(5000 + frameCount / m);
            var topColor = color(topR, topG, topB);
            var bottomColor = color(bottomR, bottomG, bottomB);
            //add wave every 30 frames
        if(frameCount%30==0){
            addWave();
        }
        for(var i =output.length-1;i>=0;i--){
            var wave = output[i];
            colorMode(RGB);
            var lineColor = lerpColor(topColor, bottomColor, i / output.length);

            
            
            beginShape();
            for(var j=0;j<wave.length;j++){
                wave[j].y-=speed;// move the wave up
                stroke(lineColor);
                fill(0);
                vertex((wave[j].x-t2)+t4,wave[j].y+j*t1+t3);
                
            }
            endShape();
            //remove the "old" wave
            if(wave[0].y+100<endY){
                output.splice(i,1);
            }
        }
        //switch the color mode back to RGB
        colorMode(RGB);
    };
    
    function addWave(){
        //function to add wave
        var w = fourier.waveform();
        var outputWave = [];
        var smallScale =10;
        var bigScale = 120;
        
        for(var i =0;i<w.length;i++){
            if(i%20==0){
                var x= map(i,0,1024,startX,startX+spectrumWidth);
                
                if(i<1024 *0.25 ||i>1024*0.75){
                    var y = map (w[i],-1,1,-smallScale,smallScale);
                    var o= {x:x,y:startY+y};
                    outputWave.push(o);
                }else{
                    var y = map (w[i],-1,1,-bigScale,bigScale);
                    var o= {x:x,y:startY+y};
                    outputWave.push(o);
                }
            }
        }
        
        output.push(outputWave);
    }
}
