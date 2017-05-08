
// 鼠标移动时画线，obj必须要是canvas
function drawLine(obj) {
    var ctx = obj.getContext('2d');
    var arr = [];
    obj.onmousedown = function (ev) {
        ev.preventDefault();
        clearInterval(obj.timer);
        arr = [];
        var w = 5;
        obj.onmousemove = function (ev) {
            var x = ev.offsetX;
            var y = ev.offsetY;

            arr.unshift({left:x,top:y});
            if (arr.length > 20){
                arr.pop()
            }
            obj.width = obj.width;
            for (var i=0; i<arr.length; i++){
                // ctx.shadowBlur = 5;
                // ctx.shadowColor = 'red'
                ctx.lineWidth = 7;
                ctx.strokeStyle = '#fff'
                ctx.lineTo(arr[i].left,arr[i].top);
                ctx.stroke();
            }
        }

        obj.onmouseup = function () {
            obj.onmousemove  = null;
            obj.onmouseup = null;
            obj.timer = setInterval(function () {
                w--;
                obj.width = obj.width;
                for (var i=0; i<arr.length; i++){
                    ctx.lineWidth = w;
                    ctx.strokeStyle = '#fff';
                    ctx.lineTo(arr[i].left,arr[i].top);
                    ctx.stroke();
                }
                if (w == 1){
                    clearInterval(obj.timer);
                    obj.width = obj.width;
                }

            },20)
        }

        obj.onmouseout = function () {
            obj.onmousemove  = null;
            obj.onmouseup = null;
            obj.width = obj.width;
        }
    }
}

// 背景
function bg(obj) {
    obj.width = window.innerWidth;
    obj.height = window.innerHeight;
    var ctx = obj.getContext('2d');
    var arrDots = [];
    var r = 65;
    for (var i=0; i<100; i++){
        var x = obj.width*Math.random();
        var y = obj.height*Math.random();
        var vx = Math.random()*4 - 2;
        var vy = Math.random()*4 - 2;
        var a = Math.random()*5;
        arrDots.push({x,y,vx,vy,a})
    }

    setInterval(function () {
        obj.width = obj.width;
        arrDots.forEach(function (item) {
            var arr = arrDots.slice();
            var x = item.x;
            var y = item.y;

            if (item.x > window.innerWidth || item.x < 0){
                item.vx = -item.vx;
            }
            if (item.y > window.innerHeight || item.y < 0){
                item.vy = -item.vy;
            }
            item.x += item.vx;
            item.y += item.vy;
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.arc(item.x ,item.y,item.a,0,2*Math.PI);
            ctx.fill();

            arr.forEach(function (item) {
                var w = x - item.x;
                var h = y - item.y;
                var c = w*w + h*h;
                if (c < r*r){
                    ctx.beginPath();
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 1 - c/(r*r);
                    ctx.moveTo(x,y);
                    ctx.lineTo(item.x,item.y);
                    ctx.stroke();
                }
            })
        })
    },50)
}

// 加载最高分数
function loadScore() {
    if (localStorage.getItem('bestClassicScore')){
        oScoreboardClassic.innerHTML = localStorage.getItem('bestClassicScore');
    }else {
        oScoreboardClassic.innerHTML = 0;
    }
    if (localStorage.getItem('bestTimeScore')){
        oScoreboardTime.innerHTML = localStorage.getItem('bestTimeScore');
    }else {
        oScoreboardTime.innerHTML = 0;
    }
    if (localStorage.getItem('bestArcadeScore')){
        oScoreboardArcade.innerHTML = localStorage.getItem('bestArcadeScore');
    }else {
        oScoreboardArcade.innerHTML = 0;
    }
}

// 过场动画
function cutscene() {
oMask.style.transition = '0.5s';
oLogo.style.transition = '0.5s';
oDesc.style.transition = '0.5s';
oQuit.style.transition = '0.5s';
oClassicMode.style.transition = '0.5s';
oArcadeMode.style.transition = '0.5s';
oTimeMode.style.transition = '0.5s';
oScoreboard.style.transition = '0.5s'
oScoreArea.style.transition = '1s';
oLostArea.style.transition = '1s';
oCountDown.style.transition = '1s';


setTimeout(function () {
    oMask.style.top = 0;
},500)
setTimeout(function () {
    oLogo.style.left = '30px';
},1000)
setTimeout(function () {
    reduceShake(oNinja);
},1500)
setTimeout(function () {
    oDesc.style.left = '10px';
},2500)
setTimeout(function () {
    oQuit.style.transform = 'scale(1)';
    oClassicMode.style.transform = 'scale(1)';
    oArcadeMode.style.transform = 'scale(1)';
    oTimeMode.style.transform = 'scale(1)';
    oScoreboard.style.left = '50px';
    stratOnOff = true;
},3000)

setTimeout(function () {
    moveRotate(oQuitCricle,1,50);
    moveRotate(oClassicModeCricle,1,50);
    moveRotate(oArcadeModeCricle,1,50);
    moveRotate(oTimeModeCricle,1,50);
    moveRotate(oQuitBomb,-1,20);
    moveRotate(oClassicModeFruit,-1,20);
    moveRotate(oArcadeModeFruit,-1,20);
    moveRotate(oTimeModeFruit,-1,20);
    stratOnOff = true;
},3500)
}

// 旋转函数 n为1/-1  m为20/50
function moveRotate(obj,n,m) {
    var degree = 0;
    var timer = setInterval(function () {
        degree = degree + (50*n*Math.PI)/180;
        obj.style.cssText = "transform:rotate("+degree+"deg)";
    },m)
}

// 倒计时,结束后出现game over，自动返回主菜单
function changeTime(n) {
    oCountDown.timer = setInterval(function () {
        if (iceOnOff){
            return;
        }
        if(n==0){
            clearInterval(oCountDown.timer);
            clearInterval(timer);
            oFruitContent.innerHTML = '';
            showGameOver();
        }
        if (n == timeA || n == timeB || n == timeC || n == timeD || n == timeE){
            arcadeFruit(arrPome,parseInt(Math.random()*684),600);
        }
        oCountDown.innerHTML = n;
        n--;
    },1000)
}

// 文字回初始位置
function txtGoBack() {
    oMask.style.top = '-180px';
    oLogo.style.left = '-288px';
    oNinja.style.top = '-100px';
    oDesc.style.left = '-160px';
}

// 减震运动
function reduceShake(obj) {
    var speedY = -8;
    obj.timer = setInterval(function () {
        var t = obj.offsetTop;
        speedY++;
        obj.style.top = t + speedY + 'px';
        if (obj.offsetTop >= 40) {
            obj.style.top = '40px';
            speedY -= 8;
            speedY = -speedY;
        }
    }, 20)
}

// 声音
function makeSound(src) {
    sound.src = src;
    sound.loop = '';
}

// 发出声音
function makeVoice(obj,src) {
    var sound = document.createElement('audio');
    obj.appendChild(sound);
    sound.src = src;
    sound.autoplay = 'autoplay';
}

// 得到鼠标移动方向
function getMouseDir() {
    var oldX,oldY;
    drawBoard.addEventListener('mousemove',function (ev) {
        var x = ev.offsetX;
        var y = ev.offsetY;
        var w = x - oldX;
        var h = y - oldY;
        oldX = x;
        oldY = y;
        // mouseDir = `rotate(${(-Math.atan(w/h)*180/Math.PI)+90}deg)`;
        mouseDir = -Math.atan(w/h)*180/Math.PI+90;
    })
}

// 生成刀光
function makeLight(obj) {
    var oLight = document.createElement('span');
    oLight.className = 'light';
    obj.appendChild(oLight);
    oLight.style.left = -(360-obj.offsetWidth)/2 + 'px';
    oLight.style.top = (obj.offsetHeight-20)/2 + 'px';
    oLight.style.transform = 'rotate('+ (90) +'deg)';
    setTimeout(function () {
        oLight.remove();
    },100)
}

// 生成水果碎片
function makeFruitCut(obj,data) {
    var cut1 = document.createElement('div');
    var cut2 = document.createElement('div');
    var rotateNum1=0;
    var rotateNum2=0;
    obj.appendChild(cut1);
    obj.appendChild(cut2);
    cut1.className = 'cut';
    cut2.className = 'cut';
    cut1.style.backgroundImage = `url(${data.cut[1]})`;
    cut2.style.backgroundImage = `url(${data.cut[0]})`;
    cut1.style.width = obj.offsetWidth + 'px';
    cut1.style.height = obj.offsetHeight + 'px';
    cut2.style.width = obj.offsetWidth + 'px';
    cut2.style.height = obj.offsetHeight + 'px';
    setInterval(function () {
        cut1.style.left = cut1.offsetLeft + 2 + 'px';
        cut2.style.left = cut2.offsetLeft - 2 + 'px';
    },15)
    /*//旋转
    setInterval(function(){
        rotateNum1--;
        rotateNum2++;
        cut1.style.transform = 'rotate('+ (rotateNum1) +'deg)';
        cut2.style.transform = 'rotate('+ (rotateNum2) +'deg)';
    },20)*/
}

// 生成白色遮罩层
function showWhiteMask() {
    var whiteMask = document.createElement('div');
    oOtherContent.appendChild(whiteMask);
    whiteMask.className = 'cover';
    setTimeout(function () {
        whiteMask.style.opacity = 0;
    },30)
    setTimeout(function () {
        whiteMask.remove();
    },3000)
}

// 生成game over,返回主菜单
function showGameOver() {
    var gameOver = document.createElement('img');
    oOtherContent.appendChild(gameOver);
    gameOver.className = 'game-over-pic';
    gameOver.src = 'img/game-over.png';
    setTimeout(function () {
        gameOver.style.transform = 'scale(1)';
        makeSound(objSound.over);
    },1000)
    setTimeout(function () {
        location.search = Math.random();
    },4000)
}

// 显示连击文字
function showTxt(num) {
    var txt = document.createElement('span');
    oOtherContent.appendChild(txt);
    txt.style.background = 'url(./img/'+ num +'.png)'
    txt.className = 'txt';
    setTimeout(function () {
        txt.style.transform = 'scale(1)'
    },10)
    setTimeout(function () {
        txt.style.transform = 'scale(0)'
    },1000)
    setTimeout(function () {
        txt.remove();
    },2000)
}

// 判定选择哪种游戏模式
function choiceMode(ev) {
    var X = ev.clientX;
    var Y = ev.clientY;
    //经典模式
    var a1 = X-ClassicModeCenterX;
    var b1 = Y-ClassicModeCenterY;
    if(Math.sqrt(a1*a1+b1*b1)<45){
        return 'classic-mode';
    }
    //街机模式
    var a2 = X-ArcadeModeCenterX;
    var b2 = Y-ArcadeModeCenterY;
    if(Math.sqrt(a2*a2+b2*b2)<25){
        return 'arcade-mode';
    }
    //限时模式
    var a3 = X-TimeModeCenterX;
    var b3 = Y-TimeModeCenterY;
    if(Math.sqrt(a3*a3+b3*b3)<35){
        return 'time-mode';
    }
}










