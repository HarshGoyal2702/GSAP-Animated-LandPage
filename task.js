var t1 = gsap.timeline();

t1.to("#top-h , #bottom-h",{
    translate : "-20%",
    transition : Power3,
    delay : 3
},"b");

t1.from("#top-h , #bottom-h",{
    opacity : 0,
    duration:2,
},"b");
t1.to(".top",{
    translateY : "-110%",
    top : 0,
    duration : 2,
    delay : 1 ,
    display : "none"
},"a");
t1.to(".bottom",{
    translateY : "100%",
    bottom : 0,
    duration : 2,
    delay : 1 ,
    display :"none"
},"a");
t1.to(".main2",{
    delay : 2,
    rotate:"90deg",
    duration : 7,
    scale:"3"
},"c");

t1.to("canvas",{
    display:"flex",
    zIndex:500,
    width : "50%",
    height:"80%",
    borderRadius : "50%"
});
t1.to("canvas",{
    translateX : "70%",
});
t1.to(".card ,.content, .front , .back",{
    display : "flex",
    ease: Power2.easeOut
});



        var sketchProc = function(processingInstance) {
            with (processingInstance) {
              size(600, 600); 
              frameRate(60);    
              smooth();
          
              var RoboCat = (function() {
                RoboCat = function(args) {
                    this.x = args.x || 0;
                    this.y = args.y || 0;
                    this.timer = 0;
                    this.rot_timer = 0;
                    this.speed = 2;
                    this.shake = 0;
                    this.shakedown = 0.1;
                    this.colors = args.colors || {
                        light: color(242, 239, 242),
                        dark: color(33, 33, 33),
                        side: color(182, 101, 235),
                        accent: color(93, 227, 209),
                        accentRGB: [93, 227, 209]
                    };
                    this.body = {
                        x: 0,
                        y: 0,
                        angle: 0,
                        timer: 40,
                        xoff: 0
                    };
                    this.arms = {
                        right: {
                            joint1: 0,
                            joint2: 0,
                            finger1: 0,
                            finger2: 0,
                            finger3: 0,
                            joint1t: 0,
                            joint2t: 0
                        },
                        left: {
                            xoff: {
                                value: 0,
                                target: 0,
                                timer: 0,
                                delay: {
                                    value: 0,
                                    min: 30,
                                    max: 120
                                }
                            },
                            yoff: {
                                value: 0,
                                target: 0,
                                timer: 0,
                                delay: {
                                    value: 0,
                                    min: 30,
                                    max: 120
                                }
                            }
                        }
                    };
                    this.legs = {
                        right: {
                            x1: 423,
                            y1: 393,
                            x2: 400,
                            y2: 400,
                            x3: 416,
                            y3: 502,
                            l1: 67,
                            l2: 60,
                            vx3: 0,
                            vy3: 0
                        },
                        left: {
                            x1: 423,
                            y1: 393,
                            x2: 400,
                            y2: 400,
                            x3: 416,
                            y3: 502,
                            l1: 67,
                            l2: 60,
                            vx3: 0,
                            vy3: 0
                        }
                    };
                    this.eye = {
                        show: true,
                        timer: 0,
                        delay: {
                            value: 60,
                            min: 60,
                            max: 240
                        }
                    };
                    this.state = 0;
                    this.change = 0;
                    this.fire = {
                        state: 0, //0 = normal, 1 = heating up, 2 = blast
                        opacity: 0,
                        timer: 0,
                        fired: false,
                        bullets: [],
                        smokes: []
                    };
                };
                RoboCat.prototype = {
                    //Credit to JentGent for this function
                    joint: function(Ax, Ay, Bx, By, b, c, v) {
                        var t = atan2(By - Ay, Bx - Ax);
                        var a = dist(Ax, Ay, Bx, By);
                      
                        var f = acos(((Bx - Ax) * (Bx - Ax) + (By - Ay) * (By - Ay) + (c * c) - (b * b)) / (2 * a * b)) || 0;
                        var Cx = Ax + cos(t + f * v) * c || 0,
                            Cy = Ay + sin(t + f * v) * c || 0;
          
                        return {x: Cx, y: Cy};
                    },
                    draw: function() {
                        pushMatrix();
                            translate(0, this.body.y);
          
                            {
                            //back of ears
                            noStroke();
                            fill(this.colors.dark);
                            beginShape();
                                vertex(285, 118);
                                bezierVertex(311, 130, 329, 153, 340, 182);
                                vertex(285, 182);
                            endShape(CLOSE);
                            beginShape();
                                vertex(371, 118);
                                bezierVertex(398, 130, 415, 153, 430, 182);
                                vertex(371, 182);
                            endShape(CLOSE);
          
                            //front of ears
                            noStroke();
                            fill(this.colors.light);
                            beginShape();
                                vertex(242, 182);
                                vertex(264, 126);
                                bezierVertex(273, 112, 286, 112, 296, 126);
                                vertex(317, 182);
                            endShape(CLOSE);
                            beginShape();
                                vertex(330, 182);
                                vertex(350, 129);
                                bezierVertex(359, 112, 374, 112, 382, 127);
                                vertex(404, 182);
                            endShape(CLOSE);
          
                            //inner ears
                            noFill();
                            stroke(this.colors.accent);
                            strokeWeight(2);
                            beginShape();
                                vertex(257, 182);
                                vertex(269, 146);
                                bezierVertex(276, 133, 284, 133, 291, 146);
                                vertex(304, 182);
                            endShape(CLOSE);
                            beginShape();
                                vertex(343, 182);
                                vertex(356, 146);
                                bezierVertex(364, 133, 370, 133, 377, 146);
                                vertex(390, 182);
                            endShape(CLOSE);
                            } //ears
          
                            {
                            //handle on back of body
                            noFill();
                            stroke(this.colors.accent);
                            strokeWeight(2);
                            beginShape();
                                vertex(444, 195);
                                vertex(464, 200);
                                bezierVertex(473, 200, 478, 206, 480, 213);
                                vertex(495, 266);
                                bezierVertex(497, 272, 498, 280, 494, 286);
                                vertex(476, 305);
                            endShape(CLOSE);
                            } //handle on back of body
          
                            {
                            //RIGHT LEG
                            pushMatrix();
                                translate(-145, 0); //move to the right (right leg)
                                translate(0, -this.body.y);
          
                                //lower leg on right
                                noFill();
                                strokeWeight(26);
                                stroke(this.colors.dark);
                                line(   this.legs.right.x2, 
                                        this.legs.right.y2, 
                                        this.legs.right.x3 + this.legs.right.vx3, 
                                        this.legs.right.y3 + this.legs.right.vy3);
                                strokeWeight(1);
          
                                //TOP PART OF LEG
                                pushMatrix();
                                    noFill();
                                    strokeWeight(26);
                                    stroke(this.colors.dark);
                                    line(   this.legs.right.x1, 
                                            this.legs.right.y1 + this.body.y, 
                                            this.legs.right.x2, 
                                            this.legs.right.y2);
                                    strokeWeight(1);
                                popMatrix();
          
                                pushMatrix();
                                    translate(0, this.body.y);
          
                                    translate(this.legs.right.x1, this.legs.right.y1);                    
                                    rotate(radians(50) + atan2((this.legs.right.y1 + this.body.y) - this.legs.right.y2, this.legs.right.x1 - this.legs.right.x2));
                                    translate(-this.legs.right.x1, -this.legs.right.y1);
          
                                    // top of leg on right
                                    noStroke();
                                    fill(this.colors.light);
                                    beginShape();
                                        vertex(375, 472);
                                        bezierVertex(333, 474, 311, 443, 331, 412);
                                        vertex(388, 366);
                                        bezierVertex(402, 359, 413, 359, 435, 363);
                                    endShape(CLOSE);
          
                                    //leg on right
                                    noStroke();
                                    fill(this.colors.side);
                                    beginShape();
                                        vertex(408, 367);
                                        bezierVertex(447, 348, 475, 386, 455, 417);
                                        vertex(388, 469);
                                        bezierVertex(357, 482, 329, 446, 347, 419);
                                    endShape(CLOSE);
          
                                    //arc behind leg
                                    noFill();
                                    stroke(this.colors.dark);
                                    strokeWeight(2);
                                    bezier(412, 365, 449, 351, 459, 380, 462, 393);
          
                                    //circle on leg on right
                                    noFill();
                                    stroke(this.colors.accent);
                                    strokeWeight(2);
                                    ellipse(376, 437, 25, 25);
                                popMatrix();
          
                                pushMatrix();
                                    translate(this.legs.right.x3 + this.legs.right.vx3, this.legs.right.y3 + this.legs.right.vy3);
                                    rotate(radians(sin(radians(this.timer * 2))) * -1);
                                    translate(-this.legs.right.x3, -this.legs.right.y3 + 10);
          
                                    //curve on top of foot on right
                                    noStroke();
                                    fill(this.colors.side);
                                    bezier(374, 495, 399, 476, 437, 476, 457, 495);
          
                                    //front of foot on right
                                    noStroke();
                                    fill(this.colors.light);
                                    beginShape();
                                        vertex(362, 491);
                                        vertex(292, 491);
                                        bezierVertex(278, 495, 278, 514, 292, 518);
                                        vertex(362, 518);
                                    endShape(CLOSE);
          
                                    //lines on front of foot on right
                                    noFill();
                                    stroke(this.colors.dark);
                                    strokeWeight(2);
                                    line(354, 495, 285, 495);
                                    line(352, 505, 283, 505);
                                    line(356, 514, 288, 514);
          
                                    //foot on right
                                    noStroke();
                                    fill(this.colors.side);
                                    beginShape();
                                        vertex(362, 491);
                                        vertex(481, 492);
                                        bezierVertex(498, 493, 498, 518, 483, 518);
                                        vertex(362, 518);
                                        bezierVertex(344, 518, 344, 493, 362, 491);
                                    endShape(CLOSE);
          
                                    //line on top of foot on right
                                    noFill();
                                    stroke(this.colors.dark);
                                    strokeWeight(2);
                                    line(370, 492, 464, 492);
          
                                    //line on foot on right
                                    noFill();
                                    strokeWeight(3);
                                    stroke(this.colors.accent);
                                    line(362, 505, 480, 505);
                                    strokeWeight(1);
          
                                    //circles on line on foot on right
                                    noStroke();
                                    fill(this.colors.dark);
                                    ellipse(362, 505, 10, 10);
                                    ellipse(480, 505, 10, 10);
          
                                    //thin line on foot on right
                                    noFill();
                                    stroke(this.colors.accent);
                                    strokeWeight(2);
                                    line(362, 505, 480, 505);
                                popMatrix();
                            popMatrix();
                            } //right leg
          
                            {
                            //back (behind) of body
                            noStroke();
                            fill(this.colors.dark);
                            beginShape();
                                vertex(459, 231);
                                bezierVertex(471, 233, 475, 237, 478, 243);
                                vertex(495, 301);
                                bezierVertex(496, 307, 493, 316, 487, 324);
                            endShape(CLOSE);
          
                            //blue section under dark section under body
                            noStroke();
                            fill(this.colors.dark);
                            beginShape();
                                vertex(284, 376);
                                bezierVertex(288, 399, 305, 411, 337, 408);
                                vertex(410, 406);
                                vertex(419, 376);
                            endShape(CLOSE);
          
                            //dark section under body
                            noStroke();
                            fill(this.colors.dark);
                            beginShape();
                                vertex(240, 365);
                                bezierVertex(240, 377, 242, 384, 255, 386);
                                vertex(388, 384);
                                bezierVertex(400, 382, 401, 374, 402, 365);
                            endShape(CLOSE);
          
                            //antenna straight
                            noFill();
                            stroke(this.colors.dark);
                            strokeWeight(2);
                            line(420, 177, 420, 89);
                            noStroke();
                            fill(this.colors.side);
                            ellipse(420, 89, 10, 10);
          
                            //antenna jagged
                            noFill();
                            stroke(this.colors.dark);
                            strokeWeight(2);
                            beginShape();
                                vertex(430, 178);
                                vertex(430, 134);
                                vertex(425, 125);
                                vertex(436, 121);
                                vertex(430, 117);
                                vertex(430, 109);
                            endShape();
                            } //body / antenna
          
                            {
                            //FIRING ARM
                            pushMatrix();
                                translate(this.arms.left.xoff.value, this.arms.left.yoff.value);
          
                                if(this.shake > 0) {
                                    this.shake = lerp(this.shake, 0, this.shakedown);
                                    translate(round(random(-this.shake, this.shake)), round(random(-this.shake, this.shake)));
                                }
          
                                //arm
                                noStroke();
                                fill(this.colors.dark);
                                beginShape();
                                    vertex(235, 228);
                                    vertex(155, 228);
                                    vertex(155, 350);
                                    vertex(235, 350);
                                endShape(CLOSE);
          
                                //lines on arm
                                noFill();
                                stroke(this.colors.accent);
                                strokeWeight(2);
                                line(162, 250, 234, 250);
                                bezier(193, 250, 193, 263, 193, 278, 229, 287);
          
                                //arm oval back
                                noStroke();
                                fill(this.colors.side);
                                beginShape();
                                    vertex(115, 203);
                                    vertex(142, 203);
                                    bezierVertex(167, 206, 180, 222, 178, 236);
                                    vertex(178, 348);
                                    bezierVertex(173, 369, 160, 375, 143, 378);
                                    vertex(115, 378);
                                endShape(CLOSE);
          
                                //arm oval outer
                                noStroke();
                                fill(this.colors.light);
                                beginShape();
                                    vertex(144, 228);
                                    vertex(144, 353);
                                    bezierVertex(137, 387, 88, 387, 80, 353);
                                    vertex(80, 228);
                                    bezierVertex(90, 195, 137, 195, 144, 228);
                                endShape(CLOSE);
          
                                //arm oval inner
                                noStroke();
                                fill(this.colors.dark);
                                beginShape();
                                    vertex(131, 230);
                                    vertex(131, 349);
                                    bezierVertex(127, 373, 97, 373, 92, 349);
                                    vertex(92, 230);
                                    bezierVertex(97, 210, 127, 210, 131, 230);
                                endShape(CLOSE);
          
                                fill(this.colors.accent, this.fire.opacity);
                                beginShape();
                                    vertex(131, 230);
                                    vertex(131, 349);
                                    bezierVertex(127, 373, 97, 373, 92, 349);
                                    vertex(92, 230);
                                    bezierVertex(97, 210, 127, 210, 131, 230);
                                endShape(CLOSE);
          
                                //handle on top of arm
                                noFill();
                                stroke(this.colors.dark);
                                strokeWeight(2);
                                line(120, 192, 139, 192);
                                noFill();
                                stroke(this.colors.accent);
                                bezier(115, 205, 115, 199, 113, 194, 119, 192);
                                bezier(139, 191, 143, 193, 144, 197, 144, 203);
          
                                //handle on bottom of arm
                                noFill();
                                stroke(this.colors.dark);
                                strokeWeight(2);
                                line(120, 385, 139, 385);
                                noFill();
                                stroke(this.colors.accent);
                                bezier(114, 376, 114, 381, 116, 385, 118, 385);
                                bezier(138, 385, 142, 385, 144, 382, 144, 376);
          
                                //line on side of arm top
                                noFill();
                                stroke(this.colors.accent);
                                strokeWeight(2);
                                beginShape();
                                    vertex(155, 207);
                                    vertex(155, 213);
                                    bezierVertex(156, 222, 161, 222, 165, 230);
                                    vertex(165, 262);
                                endShape();
                                ellipse(165, 262, 12, 12);
          
                                //line on side of arm bottom
                                noFill();
                                stroke(this.colors.accent);
                                strokeWeight(2);
                                beginShape();
                                    vertex(162, 370);
                                    vertex(162, 350);
                                    bezierVertex(160, 341, 156, 342, 153, 330);
                                    vertex(153, 300);
                                endShape();
                                ellipse(153, 300, 12, 12);
                            popMatrix();
                            } //firing arm
          
                            {
                            //side of body
                            noStroke();
                            fill(this.colors.side);
                            beginShape();
                                vertex(401, 173);
                                vertex(424, 173);
                                bezierVertex(442, 173, 451, 183, 455, 199);
                                vertex(496, 335);
                                bezierVertex(499, 355, 486, 375, 456, 372);
                                vertex(342, 372);
                            endShape(CLOSE);
          
                            //front of body
                            noStroke();
                            fill(this.colors.light);
                            beginShape();
                                vertex(401 + this.body.xoff, 173);
                                vertex(342 + this.body.xoff, 372);
                                vertex(212, 372);
                                bezierVertex(186, 372, 174, 352, 180, 333);
                                vertex(219, 197);
                                bezierVertex(226, 177, 240, 171, 253, 173);
                            endShape(CLOSE);
          
                            //line on top of body
                            noFill();
                            stroke(this.colors.dark);
                            strokeWeight(2);
                            line(242, 172, 415, 172);
          
                            pushMatrix();
                                translate(this.body.xoff, 0);
          
                                //face (circle)
                                strokeWeight(3);
                                stroke(this.colors.accent);
                                fill(this.colors.dark);
                                beginShape();
                                    vertex(294, 207);
                                    bezierVertex(335, 208, 359, 242, 351, 281);
                                    bezierVertex(341, 322, 302, 351, 262, 347);
                                    bezierVertex(229, 344, 203, 306, 215, 265);
                                    bezierVertex(227, 232, 257, 205, 294, 207);
                                endShape(CLOSE);
                                strokeWeight(1);
          
                                //circles on body for arms
                                noFill();
                                stroke(this.colors.accent);
                                strokeWeight(2);
                                ellipse(420, 308, 55, 55);
                                noStroke();
                                fill(this.colors.light);
                                ellipse(420, 308, 35, 35);
          
                                //lines on side of body
                                noFill();
                                stroke(this.colors.dark);
                                line(471, 287, 483, 328);
                                line(466, 287, 473, 313);
          
                                //lines on top of face
                                noFill();
                                stroke(this.colors.dark);
                                strokeWeight(2);
                                line(356, 180, 390, 180);
                                line(369, 187, 386, 187);
          
                                //lines on bottom/left of face
                                noFill();
                                stroke(this.colors.dark);
                                strokeWeight(2);
                                line(320, 350, 340, 350);
                                rect(300, 355, 38, 10, 50);
          
                                //line on top/left of face
                                noFill();
                                stroke(this.colors.accent);
                                strokeWeight(2);
                                beginShape();
                                    vertex(222 - this.body.xoff, 190);
                                    bezierVertex(228, 190, 234, 190, 240, 194);
                                    bezierVertex(244, 200, 250, 202, 259, 202);
                                endShape();
                                ellipse(259, 202, 10, 10);
          
                                //line on bottom/left of face
                                noFill();
                                stroke(this.colors.accent);
                                strokeWeight(2);
                                beginShape();
                                    vertex(225, 372);
                                    bezierVertex(225, 366, 221, 362, 215, 362);
                                    bezierVertex(207, 359, 205, 353, 205, 343);
                                endShape();
                                ellipse(205, 343, 10, 10);
                                noStroke();
                                fill(this.colors.accent);
                                ellipse(205, 331, 5, 5);
          
                                //line on top/side of body
                                noFill();
                                stroke(this.colors.accent);
                                strokeWeight(2);
                                beginShape();
                                    vertex(424, 175);
                                    vertex(440, 241);
                                    bezierVertex(441, 245, 443, 248, 448, 248);
                                    bezierVertex(458, 248, 457, 256, 448, 255);
                                    vertex(427, 255);
                                endShape();
                                ellipse(427, 255, 15, 15);
          
                                if(this.eye.show) {
                                    //eyes open
                                    stroke(this.colors.accent);
                                    line(253, 268, 266, 272);
                                    line(309, 268, 293, 272);
                                    noStroke();
                                    fill(this.colors.accent);
                                    ellipse(260, 278, 15, 16);
                                    ellipse(299, 278, 15, 16);
                                }
                                else {
                                    //eyes closed
                                    noFill();
                                    stroke(this.colors.accent);
                                    strokeWeight(3);
                                    beginShape();
                                        vertex(258, 273);
                                        vertex(265, 281);
                                        vertex(252, 282);
                                    endShape();
                                    beginShape();
                                        vertex(304, 273);
                                        vertex(294, 281);
                                        vertex(308, 282);
                                    endShape();
                                }
          
                                //mouth
                                noFill();
                                stroke(this.colors.accent);
                                beginShape();
                                    vertex(285, 283);
                                    bezierVertex(283, 292, 275, 292, 274, 283);
                                endShape();
          
                                //stripes on right
                                noFill();
                                stroke(this.colors.accent);
                                strokeWeight(2);
                                line(307, 293, 318, 300);
                                line(310, 290, 324, 298);
                                line(313, 286, 325, 291);
          
                                //stripes on left
                                noFill();
                                stroke(this.colors.accent);
                                strokeWeight(2);
                                line(248, 295, 235, 300);
                                line(246, 290, 230, 297);
                                line(245, 284, 232, 291);
                            popMatrix();
                            } //body / face
          
                            {
                            //LEFT LEG
                            pushMatrix();
                                translate(0, -this.body.y);
          
                                pushMatrix();
                                    //lower leg on right
                                    noFill();
                                    strokeWeight(26);
                                    stroke(this.colors.dark);
                                    line(   this.legs.left.x2, 
                                            this.legs.left.y2, 
                                            this.legs.left.x3 + this.legs.left.vx3, 
                                            this.legs.left.y3 + this.legs.left.vy3);
                                    strokeWeight(1);
          
                                    //TOP PART OF LEG
                                    noFill();
                                    strokeWeight(26);
                                    stroke(this.colors.dark);
                                    line(   this.legs.left.x1, 
                                            this.legs.left.y1 + this.body.y, 
                                            this.legs.left.x2, 
                                            this.legs.left.y2);
                                    strokeWeight(1);
          
                                    pushMatrix();
                                        translate(0, this.body.y);
          
                                        translate(this.legs.left.x1, this.legs.left.y1);
                                        rotate(radians(50) + atan2((this.legs.left.y1 + this.body.y) - this.legs.left.y2, this.legs.left.x1 - this.legs.left.x2));
                                        translate(-this.legs.left.x1, -this.legs.left.y1);
          
                                        //top of leg on right
                                        noStroke();
                                        fill(this.colors.light);
                                        beginShape();
                                            vertex(375, 472);
                                            bezierVertex(333, 474, 311, 443, 331, 412);
                                            vertex(388, 366);
                                            bezierVertex(402, 359, 413, 359, 435, 363);
                                        endShape(CLOSE);
          
                                        //leg on right
                                        noStroke();
                                        fill(this.colors.side);
                                        beginShape();
                                            vertex(408, 367);
                                            bezierVertex(447, 348, 475, 386, 455, 417);
                                            vertex(388, 469);
                                            bezierVertex(357, 482, 329, 446, 347, 419);
                                        endShape(CLOSE);
          
                                        //arc behind leg
                                        noFill();
                                        stroke(this.colors.dark);
                                        strokeWeight(2);
                                        bezier(412, 365, 449, 351, 459, 380, 462, 393);
          
                                        //circle on leg on right
                                        noFill();
                                        stroke(this.colors.accent);
                                        strokeWeight(2);
                                        ellipse(376, 437, 25, 25);
                                    popMatrix();
          
                                    pushMatrix();
                                        translate(this.legs.left.x3 + this.legs.left.vx3, this.legs.left.y3 + this.legs.left.vy3);
                                        rotate(radians(sin(radians(this.timer * 2))) * 1);
                                        translate(-this.legs.left.x3, -this.legs.left.y3 + 10);
          
                                        //curve on top of foot on right
                                        noStroke();
                                        fill(this.colors.side);
                                        bezier(374, 495, 399, 476, 437, 476, 457, 495);
          
                                        //front of foot on right
                                        noStroke();
                                        fill(this.colors.light);
                                        beginShape();
                                            vertex(362, 491);
                                            vertex(292, 491);
                                            bezierVertex(278, 495, 278, 514, 292, 518);
                                            vertex(362, 518);
                                        endShape(CLOSE);
          
                                        //lines on front of foot on right
                                        noFill();
                                        stroke(this.colors.dark);
                                        strokeWeight(2);
                                        line(354, 495, 285, 495);
                                        line(352, 505, 283, 505);
                                        line(356, 514, 288, 514);
          
                                        //foot on right
                                        noStroke();
                                        fill(this.colors.side);
                                        beginShape();
                                            vertex(362, 491);
                                            vertex(481, 492);
                                            bezierVertex(498, 493, 498, 518, 483, 518);
                                            vertex(362, 518);
                                            bezierVertex(344, 518, 344, 493, 362, 491);
                                        endShape(CLOSE);
          
                                        //line on top of foot on right
                                        noFill();
                                        stroke(this.colors.dark);
                                        strokeWeight(2);
                                        line(370, 492, 464, 492);
          
                                        //line on foot on right
                                        noFill();
                                        strokeWeight(3);
                                        stroke(this.colors.accent);
                                        line(362, 505, 480, 505);
                                        strokeWeight(1);
          
                                        //circles on line on foot on right
                                        noStroke();
                                        fill(this.colors.dark);
                                        ellipse(362, 505, 10, 10);
                                        ellipse(480, 505, 10, 10);
          
                                        //thin line on foot on right
                                        noFill();
                                        stroke(this.colors.accent);
                                        strokeWeight(2);
                                        line(362, 505, 480, 505);
                                    popMatrix();
                                popMatrix();
                            popMatrix();
                            } //left leg
          
                            {
                            //ARM
                            pushMatrix();
                                translate(420 + this.body.xoff, 308);
                                rotate(radians(this.arms.right.joint1));
                                translate(-420, -308);
          
                                //upper arm //need to add accent
                                noFill();
                                stroke(this.colors.dark);
                                strokeWeight(22);
                                line(420, 308, 432, 423);
                                strokeWeight(2);
                                stroke(this.colors.accent);
                                line(420, 308, 432, 423);
                                strokeWeight(1);
          
                                //circle for elbow joint
                                // noStroke();
                                stroke(this.colors.accent);
                                fill(this.colors.side);
                                ellipse(432, 423, 60, 60);
          
                                pushMatrix();
                                    translate(432, 423);
                                    rotate(radians(this.arms.right.joint2));
                                    translate(-432, -423);
          
                                    //lower arm //need to add accent
                                    noFill();
                                    stroke(this.colors.dark);
                                    strokeWeight(22);
                                    line(432, 423, 345, 362);
                                    strokeWeight(2);
                                    stroke(this.colors.accent);
                                    line(432, 423, 345, 362);
                                    strokeWeight(1);
          
                                    //finger behind
                                    pushMatrix();
                                        translate(328, 373);
                                        rotate(radians(this.arms.right.finger1));
                                        translate(-328, -373);
          
                                        noFill();
                                        stroke(this.colors.dark);
                                        strokeWeight(16);
                                        beginShape();
                                            vertex(328, 373);
                                            vertex(323, 388);
                                            vertex(308, 394);
                                        endShape();
                                        strokeWeight(1);
                                    popMatrix();
          
                                    //circle for hand
                                    noStroke();
                                    fill(this.colors.light);
                                    ellipse(345, 362, 56, 56);
          
                                    //fingers in front
                                    pushMatrix();
                                        translate(341, 341);
                                        rotate(radians(this.arms.right.finger2));
                                        translate(-341, -341);
          
                                        noFill();
                                        stroke(this.colors.dark);
                                        strokeWeight(16);
                                        beginShape();
                                            vertex(341, 341);
                                            vertex(336, 320);
                                            vertex(320, 311);
                                        endShape();
                                        strokeWeight(1);
                                    popMatrix();
                                    pushMatrix();
                                        translate(356, 372);
                                        rotate(radians(this.arms.right.finger3));
                                        translate(-356, -372);
          
                                        noFill();
                                        stroke(this.colors.dark);
                                        strokeWeight(16);
                                        beginShape();
                                            vertex(356, 372);
                                            vertex(363, 389);
                                            vertex(350, 405);
                                        endShape();
                                        strokeWeight(1);
                                    popMatrix();
                                popMatrix();
                            popMatrix();
                            } //right arm
                        popMatrix();
          
                        noFill();
                        strokeWeight(8);
                        for(var i = this.fire.smokes.length - 1; i >= 0; i--) {
                            var smoke = this.fire.smokes[i];
          
                            stroke(smoke.color, smoke.opacity);
                            ellipse(smoke.x, smoke.y, smoke.diameter, smoke.diameter);
          
                            smoke.x+= smoke.vx;
                            smoke.y+= smoke.vy;
                            smoke.diameter+= 0.2;
                            smoke.opacity = constrain(smoke.opacity - 1, 0, 255);
          
                            if(smoke.opacity === 0) {
                                this.fire.smokes.splice(i, 1);
                            }
                        }
          
                        noStroke();
                        fill(this.colors.dark);
                        for(var i = this.fire.bullets.length - 1; i >= 0; i--) {
                            var bullet = this.fire.bullets[i];
          
                            ellipse(bullet.x, bullet.y, bullet.diameter, bullet.diameter);
          
                            bullet.x-= 15;
          
                            if(bullet.x + bullet.diameter < 0) {
                                this.fire.bullets.splice(i, 1);
                            }
                        }
                    },
                    update: function() {
                        this.timer++;
                        this.body.timer++;
          
                        this.body.xoff = constrain(sin(radians(this.timer * this.speed * 0.5)) * 10, 0, 7);
          
                        this.body.y = constrain(cos(radians(this.body.timer * this.speed * 2)) * 20, -20, 0);
          
                        this.legs.right.vx3 = constrain(sin(radians(this.timer * this.speed)) * 70, -50, 20);
                        this.legs.right.vy3 = constrain(cos(radians(this.timer * this.speed)) * 20, -20, 0);
          
                        this.legs.left.vx3 = constrain(-sin(radians((this.timer - 180) * this.speed)) * 70, -50, 20);
                        this.legs.left.vy3 = constrain(-cos(radians((this.timer - 180) * this.speed)) * 20, -20, 0);
          
                        var legRight = this.joint(
                            this.legs.right.x3 + this.legs.right.vx3, this.legs.right.y3 + this.legs.right.vy3, 
                            this.legs.right.x1, this.legs.right.y1 + this.body.y, 
                            this.legs.right.l1, this.legs.right.l2, -1);
          
                        this.legs.right.x2 = legRight.x;
                        this.legs.right.y2 = legRight.y;
          
                        var legLeft = this.joint(
                            this.legs.left.x3 + this.legs.left.vx3, this.legs.left.y3 + this.legs.left.vy3, 
                            this.legs.left.x1, this.legs.left.y1 + this.body.y, 
                            this.legs.left.l1, this.legs.left.l2, -1);
          
                        this.legs.left.x2 = legLeft.x;
                        this.legs.left.y2 = legLeft.y;
          
                        //right arm
                        if(round(this.arms.right.joint1) === round(this.arms.right.joint1t)) {
                            this.arms.right.joint1t = random(-50, 50);
                        }
                        this.arms.right.joint1 = lerp(this.arms.right.joint1, this.arms.right.joint1t, 0.04);
          
                        if(round(this.arms.right.joint2) === round(this.arms.right.joint2t)) {
                            this.arms.right.joint2t = random(-50, 30);
                        }
                        this.arms.right.joint2 = lerp(this.arms.right.joint2, this.arms.right.joint2t, 0.04);
          
                        this.arms.right.finger1 = constrain(sin(radians(this.timer * this.speed * 1.5)) * 155, 0, 65);
                        this.arms.right.finger2 = -this.arms.right.finger1;
                        this.arms.right.finger3 = this.arms.right.finger1;
          
                        switch(this.fire.state) {
                            case 0:
                                this.fire.timer++;
                                if(this.fire.timer === 30) {
                                    this.arms.left.xoff.delay.value = 30;
                                }
                                else if(this.fire.timer === 300) {
                                    this.fire.state++;
                                    this.fire.timer = 0;
                                }
                                break;
                            case 1:
                                this.fire.opacity = constrain(this.fire.opacity + 2, 0, 255);
          
                                if(this.fire.opacity === 255 && this.fire.timer++ === 60) {
                                    this.arms.left.xoff.delay.value = 240;
                                    this.arms.left.xoff.target = 60;
                                    this.fire.fired = true;
                                    this.fire.timer = 0;
                                    this.fire.state++;
                                    this.shake = 10;
          
                                    for(var i = 0; i < 4; i++) {
                                        this.fire.bullets.push({
                                            x: 120 + this.arms.left.xoff.value,
                                            y: 240 + this.body.y + this.arms.left.yoff.value + (i * 35),
                                            diameter: 30
                                        });
                                        for(var j = 0; j < 3; j++) {
                                            this.fire.smokes.push({
                                                x: 120 + this.arms.left.xoff.value,
                                                y: 240 + this.body.y + this.arms.left.yoff.value + (i * 35),
                                                diameter: random(25, 35),
                                                vx: random(-0.2, 0.2),
                                                vy: random(-0.2, 0.2),
                                                opacity: random(70, 100),
                                                color: color(
                                                    random(this.colors.accentRGB[0] - 10, this.colors.accentRGB[0] + 10),
                                                    random(this.colors.accentRGB[1] - 10, this.colors.accentRGB[1] + 10),
                                                    random(this.colors.accentRGB[2] - 10, this.colors.accentRGB[2] + 10))
                                            });
                                        }
                                    }
                                }
                                break;
                            case 2:
                                this.fire.opacity = constrain(this.fire.opacity -10, 0, 255);
                                if(this.fire.opacity === 0) {
                                    this.arms.left.xoff.timer = 0;
                                    this.fire.state = 0;
                                    this.fire.timer = 0;
                                    this.fire.fired = false;
                                }
                                break;
                        }
          
                        //firing arm (left)
                        var leftArm = this.arms.left;
                        if(leftArm.xoff.timer++ === leftArm.xoff.delay.value) {
                            leftArm.xoff.timer = 0;
                            leftArm.xoff.delay.value = random(leftArm.xoff.delay.min, leftArm.xoff.delay.max) | 0;
                            leftArm.xoff.target = random(30) | 0;
                        }
                        leftArm.xoff.value = lerp(leftArm.xoff.value, leftArm.xoff.target, (this.fire.fired === true ? 0.5 : 0.05));
          
                        if(leftArm.yoff.timer++ === leftArm.yoff.delay.value) {
                            leftArm.yoff.timer = 0;
                            leftArm.yoff.delay.value = random(leftArm.yoff.delay.min, leftArm.yoff.delay.max) | 0;
                            leftArm.yoff.target = random(-10, 30) | 0;
                        }
                        leftArm.yoff.value = lerp(leftArm.yoff.value, leftArm.yoff.target, 0.05);
          
                        //blinking eyes
                        if(this.eye.show) {
                            if(this.eye.timer++ === this.eye.delay.value) {
                                this.eye.timer = 0;
                                this.eye.delay.value = 10;
                                this.eye.show = false;
                            }
                        }
                        else {
                            if(this.eye.timer++ === this.eye.delay.value) {
                                this.eye.timer = 0;
                                this.eye.show = true;
                                this.eye.delay.value = random(this.eye.delay.min, this.eye.delay.max) | 0;
                            }
                        }
                    },
                    run: function() {
                        this.draw();
                        this.update();
                    }
                };
                return RoboCat;
              })();
          
              var App = (function() {
                  App = function() {
                      this.robocat = new RoboCat({});
                  };
                  App.prototype = {
                      draw: function() {
                          background(85, 48, 171);
          
                          //ground
                          stroke(40);
                          strokeWeight(10);
                          line(61, 534, 537, 534);
                          strokeWeight(1);
          
                          this.robocat.run();
                      },
                      run: function() {
                        this.draw();
                      }
                  };
                  return App;
              })();
          
              var app = new App();
          
              draw = function() {
                  app.run();
              };
              
            }
          }
          
          var canvas = document.getElementById("canvas"); 
          var processingInstance = new Processing(canvas, sketchProc);

          const loud = ()=>{
            const message = new SpeechSynthesisUtterance();
            
            // set the text to be spoken
            message.text = "Hello World!";
            
            // create an instance of the speech synthesis object
            const speechSynthesis = window.speechSynthesis;
            
            // start speaking
            speechSynthesis.speak(message);
            }
            loud();
   