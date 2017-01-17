/**
 * Created by sks on 2017/1/15.
 */
(function($){
    var defaults = {
        speed: 10,
        angle: 0,
        maxHeight: 15,
        color: '#F5F2F2',
        count:20,
        opacity:0.8
    };
    (function() {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    $.fn.let_it_rain = function(options){
        var settings = $.extend({},defaults,options);
        var canvas = $(this).get(0) ;
        var ctx = canvas.getContext('2d');


        var color = settings.color, reg = /^#([\da-zA-Z]{2})([\da-zA-Z]{2})([\da-zA-Z]{2})/i,
            matches = reg.exec(color);
        if(matches.length > 0){
            color = parseInt(matches[1],'16')+','+parseInt(matches[2],'16')+','+parseInt(matches[3],'16');
        }
        var flakes = [];
        var initY = (-1)*Math.tan(settings.angle*Math.PI/180)*canvas.width ;
        //var  maxWidth = canvas.width/Math.cos(settings.angle*Math.PI/180) + canvas.height*Math.sin(settings.angle*Math.PI/180),
        //   maxHeight = (canvas.height - initY)*Math.cos(settings.angle*Math.PI/180);
        var maxWidth = canvas.width + Math.tan(settings.angle*Math.PI/180)*canvas.height ;


        init();

        function getFlakeParm(){
            var y = initY,  x = random(0,maxWidth),
                dropHeight = random(settings.maxHeight - 10,settings.maxHeight),
                dropWidth = dropHeight / 20,
                opacity = random(0.01,settings.opacity),
                speedY = random(parseInt(settings.speed)-5,settings.speed);
           return {
               x:x,
               y:y,
               width: dropWidth,
               height: dropHeight,
               opacity: opacity,
               speedY : speedY
           }
        }
        function init(){
            for(var i=0; i<settings.count; i++){
               var obj = getFlakeParm() ;
                flakes.push(obj)
            }
            rain();
        }
        function random(min,max){
            return Math.random()*parseFloat(max) + parseFloat(min) ;
        }
        function rain(){
            ctx.clearRect(0,0,maxWidth,canvas.height);
            ctx.save();
            ctx.rotate(settings.angle*Math.PI/180);

            for(var i=0; i<flakes.length; i++){
                var flake = flakes[i];
                ctx.beginPath();
                ctx.fillStyle='rgba('+color+','+flake.opacity+')';
                ctx.fillRect(flake.x,flake.y,flake.width,flake.height);
                ctx.closePath();
                ctx.fill();
                var y2 = flake.y + flake.speedY ;
                flake.y = y2 ;
                if(y2 >=  canvas.height || y2 <= initY){
                    reset(flake);
                }
            }

            requestAnimationFrame(rain);
            ctx.restore();
        }
        function reset(flake){
            var obj = getFlakeParm() ;
            flake.x = obj.x ;
            flake.y = obj.y ;
            flake.width = obj.width;
            flake.height = obj.height;
            flake.speedY = obj.speedY;
            flake.opacity = obj.opacity ;
        }
    };
})(window.jQuery)