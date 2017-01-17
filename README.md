# let_it_rain
1. 引入jquery，引入rain-canvas.js
2. 创建canvas元素，调用方法let_it_snow(option)
   
            $(canvasElem).let_it_rain({
                speed: 10,      //1-100,默认
                angle: 30,      // 0-90
                maxHeight: 25,  // >=0
                color: '#ffffff',
                count:40,       //>=1
                opacity:'0.6'
            });
