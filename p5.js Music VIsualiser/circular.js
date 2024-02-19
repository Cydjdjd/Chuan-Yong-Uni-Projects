var particleColour = "#e7820d";
var hexColour = "#00FFFF";
var ellipseColour = "#FF0000";
var outerEllipseColour = "#002AFF";
var innerEllipseColour = "#FFFFFF"
var linesColour = "#AAAAAA"
var widthX = 0.25;

function Circular() {
    var angleRotation = 0;
    var angleRotation2 = 0;

    var particles = [];
    this.name = "circular";
    this.setup = function () {
        outerEllipse = 325;
        cartWheel = 101.875;
        innerEllipse = 82.5;
        var spectrum = fourier.analyze();
        var amp = spectrum[1];
        var l2 = map(amp, 0, 256, outerEllipse, outerEllipse + 100);
        //gui
        gui = createGui("Circular VIsualizer");
        gui.setPosition(width - 200, 0);

        sliderRange(0.001, 0, 0.001);
        gui.addGlobals("noiseStep");
        //gui for outer ellipse 
        sliderRange(325, 500, 1);
        gui.addGlobals("outerEllipse");
        //gui for cartwheel
        sliderRange(101.875, l2 * 0.497, 1);
        gui.addGlobals("cartWheel");
        //gui for inner ellipse
        sliderRange(82.5, 110, 1);
        gui.addGlobals("innerEllipse");
        //gui for particle colour
        gui.addGlobals("particleColour");
        //gui for hexagon colour
        gui.addGlobals("hexColour");
        //gui for ellipse colour
        gui.addGlobals("ellipseColour");
        //gui for outer ellipse colour
        gui.addGlobals("outerEllipseColour");
        //gui for inner ellipse colour
        gui.addGlobals("innerEllipseColour");
        //gui for lines colour
        gui.addGlobals("linesColour");
        gui.hide();
        //emitter 1
        emitter1 = new Emitter(cos(radians(0)) * 165, //xPos
            sin(radians(0)) * 165, //yPos
            4, //xSpeed
            0, //ySpeed
            1, //size
            color(200, 0, 200), 1000);
        emitter1.startEmitter(200, 100);

        //emitter 2
        emitter2 = new Emitter(cos(radians(60)) * 165, //xPos
            sin(radians(60)) * 165, //yPos
            1.71, //xSpeed
            2.29, //ySpeed
            1, //size
            color(200, 0, 200), 1000);
        emitter2.startEmitter(200, 100);

        //emitter 3
        emitter3 = new Emitter(cos(radians(120)) * 165, //xPos
            sin(radians(120)) * 165, //yPos
            -1.71, //xSpeed
            2.29, //ySpeed
            1, //size
            color(200, 0, 200), 1000);
        emitter3.startEmitter(200, 100);

        //emitter 4
        emitter4 = new Emitter(cos(radians(180)) * 165, //xPos
            sin(radians(180)) * 165, //yPos
            -4, //xSpeed
            0, //ySpeed
            1, //size
            color(200, 0, 200), 1000);
        emitter4.startEmitter(200, 100);

        //emitter 5
        emitter5 = new Emitter(cos(radians(240)) * 165, //xPos
            sin(radians(240)) * 165, //yPos
            -1.43, //xSpeed
            -2.29, //ySpeed
            1, //size
            color(200, 0, 200), 1000);
        emitter5.startEmitter(200, 100);

        //emitter 6
        emitter6 = new Emitter(cos(radians(300)) * 165, //xPos
            sin(radians(300)) * 165, //yPos
            1.71, //xSpeed
            -2.29, //ySpeed
            1, //size
            color(200, 0, 200), 1000);
        emitter6.startEmitter(200, 100);






        emitters = [emitter1, emitter2, emitter3, emitter4, emitter5, emitter6];
    }
    this.setup();
    this.unSelectVisual = function () {
        gui.hide();
    }

    this.selectVisual = function () {
        gui.show();
    }
    this.draw = function () {
        background(0);
        var spectrum = fourier.analyze();
        strokeWeight(2);
        var amp = spectrum[1];
        //put functions into draw functions
        push();
        translate(width / 2, height / 2);
        this.circular();
        pop();

        push();
        translate(width / 2, height / 2);
        this.cartwheel()
        this.particleDraw();
        this.ellipse();
        this.attachingLine();
        pop();
        //rotation of inner spinning ball
        angleRotation += radians(0.1);
        //rotation of particle effect
        angleRotation2 += radians(0.5);
        //width of particle effect react to fourier
        if (amp > 150 && widthX <= 4) {
            widthX += 0.5
        } else if (amp < 150 && widthX >= 0.25) {
            widthX -= 0.5
        }
    };

    this.circular = function () {
        var spectrum = fourier.analyze();
        var amp = spectrum[1];
        console.log(amp);
        var d = map(amp, 0, 256, innerEllipse, innerEllipse + 55);


        colorMode(HSB, 360);
        fill(0);
        //inner ellipse
        stroke(innerEllipseColour);
        ellipse(0, 0, d);
        //inner spinning ball
        for (var i = 0; i < spectrum.length; i++) {

            var angle = map(i, 0, spectrum.length, 0, 360);
            var amp = spectrum[i];
            var r = map(amp, 0, 256, 0, innerEllipse - 32.5);
            var x = r * cos(angle);
            var y = r * sin(angle);
            stroke(frameCount % 360, 360, 360);
            rotate(angleRotation);
            line(0, 0, x, y);


        }
    }
    this.cartwheel = function () {
        colorMode(RGB);
        stroke(linesColour);
        rotate(angleRotation2);
        var spectrum = fourier.analyze();
        var amp = spectrum[1];
        console.log(amp);
        //start of line that reacts to fourier
        var l = map(amp, 0, 256, innerEllipse / 2, innerEllipse / 2 + 27.5);
        //end of line that reacts to fourier
        var l2 = map(amp, 0, 256, outerEllipse, outerEllipse + 100);
        //drawing of 6 cartwheel-like lines
        for (var a = 0; a < radians(360); a += radians(60)) {
            var cartX = cos(a) * l;
            var cartXEnd = cos(a) * l2 / 2;
            var cartY = sin(a) * l;
            var cartYEnd = sin(a) * l2 / 2;
            line(cartX, cartY, cartXEnd, cartYEnd);


        }

        noFill();
        //outer ellipse
        stroke(outerEllipseColour);
        ellipse(0, 0, l2);
    }

    this.ellipse = function () {
        stroke(ellipseColour);
        var spectrum = fourier.analyze();
        var amp = spectrum[1];
        //drawing of ellipse on hexagon
        var l2 = map(amp, 0, 256, outerEllipse, outerEllipse + 100);
        cartWheel2 = map(amp, 0, 256, cartWheel, l2 * 0.497);
        for (var a = 0; a < radians(360); a += radians(60)) {
            ellipse(cos(a + radians(30)) * cartWheel2, sin(a + radians(30)) * cartWheel2, 5, 5);

        }
    }
    this.attachingLine = function () {
        fill(5);
        stroke(hexColour);
        //drawing of hexagon
        for (var a = 0; a < radians(360); a += radians(60)) {
            line(cos(a + radians(30)) * cartWheel2, sin(a + radians(30)) * cartWheel2, cos(a + radians(90)) * cartWheel2, sin(a + radians(90)) * cartWheel2);


        }
    }
    this.particleDraw = function () {
        for (i in emitters) {
            stroke(particleColour);
            //drawing of particle emitters
            emitters[i].drawAndUpdateParticles();
            console.log(i + ":" + emitters[i].lifetime);
        }

    }
}

function Particle(pos, velocity, size, colour) {
    //Particle function
    this.pos = pos;
    this.velocity = velocity;
    this.size = size;
    this.colour = colour;
    this.age = 0; //use to track the lifetime

    this.drawParticle = function () {
        fill(this.colour);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    this.updateParticle = function () {
        this.pos = this.pos.add(this.velocity);
        this.age++;
    }
}

function Emitter(xPos, yPos, xSpeed, ySpeed, size, colour, lifetime) {
    //Emitter function
    this.pos = createVector(xPos, yPos);
    this.velocity = createVector(xSpeed, ySpeed);
    this.size = size;
    this.colour = colour;
    this.particles = []; //to store many particles
    this.lifetime = lifetime;
    this.startParticles = 0;
    this.lifetime = 0;

    this.startEmitter = function (startParticles, lifetime) {
        this.startParticles = startParticles;
        this.lifetime = lifetime;
        //start emmitter with inital particles
        for (var i = 0; i < this.startParticles; i++) {
            var p = this.createNewParticle();
            this.particles.push(p);
        }
    }


    this.createNewParticle = function () {
        var spectrum = fourier.analyze();
        var amp = spectrum[1];
        var l2 = map(amp, 0, 256, outerEllipse, outerEllipse + 100);
        var xPos = random(this.pos.x - 2.5, this.pos.x + 2.5) * l2 / 325;
        var yPos = random(this.pos.y - 2.5, this.pos.y + 2.5) * l2 / 325;
        var pos = createVector(xPos, yPos);
        console.log("amp:" + amp);



        console.log("width:" + widthX);
        var height = map(amp, 0, 256, 0, 4);
        var xVel = random(this.velocity.x - widthX, this.velocity.x + widthX);
        var yVel = random(this.velocity.y - widthX, this.velocity.y + widthX);
        var velocity = createVector(xVel, yVel);

        var r = random(200, 230);
        var g = random(50, 150);
        var b = 10;
        var colour = color(r, g, b);

        var p = new Particle(pos, velocity, this.size, colour);
        return p;
    }

    this.drawAndUpdateParticles = function () {
        this.lifetime++;
        var deadParticleCount = 0;
        for (var i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].drawParticle();
            this.particles[i].updateParticle();

            if (this.particles[i].age > random(0, this.lifetime)) {
                this.particles.splice(i, 1); //remove the particle
                deadParticleCount++;
            }
        }

        for (var i = 0; i < deadParticleCount; i++) {
            var p = this.createNewParticle();
            this.particles.push(p);
        }
    }

    this.isMouseInGUI = function () {
        var inGUI = false;
        var gui_x = gui.prototype._panel.style.left;
        var gui_y = gui.prototype._panel.style.top;
        var gui_height = gui.prototype._panel.clientHeight;
        var gui_width = gui.prototype._cpanel.clientWidth;

        gui_x = parseInt(gui_x, 10);
        gui_y = parseInt(gui_y, 10);
        gui_height = parseInt(gui_height, 10);
        gui_width = parseInt(gui_width, 10);

        if (mouseX > gui_x && mouseX > gui_x + gui_width) {
            if (mouseY > gui_y && mouseY < gui_y + gui_height) {
                inGUI = true;
            }

            return inGUI;
        }
    }
}
