// 随机生成一个水果
function classicFruit() {
    // 随机挑选一个水果
    var fruitData = arrFruit.sort(function () {
        return Math.random() - 0.5;
    })[0];
    var speedY = -(parseInt(Math.random()*3) + 15);
    var speedX = 2;
    var g = 0.25;
    var fruit = document.createElement('div');
    fruit.className = fruitData.name;
    fruit.onoff = true;
    oFruitContent.appendChild(fruit);
    fruit.style.top = '600px';
    fruit.style.left = parseInt(Math.random()*684 ) + 'px';
    if (fruit.offsetLeft > 684/2){
        speedX = -Math.abs(speedX);
    }else {
        speedX = Math.abs(speedX);
    }
    // 抛水果
    fruit.timer = setInterval(function () {
        var centerX = fruit.offsetLeft + fruit.offsetWidth/2;
        var centerY = fruit.offsetTop + fruit.offsetHeight/2;
        var w = centerX - mouseX;
        var h = centerY - mouseY;
        var r = Math.sqrt(w*w + h*h);
        // 如果切中水果
        if (r < fruitData.R && fruit.onoff){
            // 只允许切中一次
            fruit.onoff = false;
            // 如果切中炸弹
            if (fruit.className == 'bomb'){
                // 关闭水果移动定时器
                clearInterval(fruit.timer);
                // 关闭生成水果定时器
                clearInterval(timer);
                // 移除这个炸弹
                setTimeout(function () {
                    fruit.remove();
                },1000)
                // 炸弹声音
                makeVoice(fruit,objSound.boom);
                // 出现白色遮罩层
                showWhiteMask();
                // 出现ganme over,返回主菜单
                showGameOver();
                oFruitContent.innerHTML = '';
                return;
            }
            // 得分增加
            nScore++;
            oGetScoreNum.innerHTML = nScore;
            // 最大得分
            if (bestClassicScore < nScore){
                bestClassicScore = nScore;
                oBestScoreNum.innerHTML = bestClassicScore;
                localStorage.setItem('bestClassicScore',bestClassicScore);
            }
            // 自己颜色变透明
            fruit.style.background = 'transparent';
            // 水果旋转
            fruit.style.transform = 'rotate('+ (mouseDir - 90) +'deg)';
            // 生成水果碎片
            makeFruitCut(fruit,fruitData);
            // 生成刀光
            makeLight(fruit);
            // 发出声音
            makeVoice(fruit,objSound.splatter);
        }
        // 重力加速度
        speedY += g;
        fruit.style.top = fruit.offsetTop + speedY + 'px';
        fruit.style.left = fruit.offsetLeft + speedX + 'px';
        if (fruit.offsetTop > 600 && speedY > 0){
            // 如果水果没被切中
            if (fruit.children[1]== undefined && fruit.classList.contains('bomb')== false){
                // 掉落水果个数
                numLostFruit++;
                // 大叉叉出现和消失
                var lostBigx = document.createElement('span');
                lostBigx.className = 'lostx';
                oFruitContent.appendChild(lostBigx);
                lostBigx.style.left = fruit.offsetLeft + 'px';
                setTimeout(function () {
                    lostBigx.remove();
                },1000);
                //
                if (numLostFruit == 1){
                    oLosts1.style.background = 'url("./img/xf.png")';
                }else if (numLostFruit == 2){
                    oLosts2.style.background = 'url("./img/xxf.png")';
                }else if (numLostFruit == 3) {
                    oLosts3.style.background = 'url("./img/xxxf.png")';
                    clearInterval(fruit.timer);
                    clearInterval(timer);
                    oFruitContent.innerHTML = '';
                    showGameOver();
                }
            }
            clearInterval(fruit.timer);
            fruit.remove();
        }
    },15)
}

// 随机生成多个水果
function classicFruits() {
    timer = setInterval(function () {
        var n = Math.round(Math.random()*3 + 1);
        makeSound(objSound.throw);
        for (var i=0; i<n; i++){
            classicFruit();
        }
    },2000)
}



