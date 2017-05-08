// 随机生成一个水果
function timeFruit() {
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
            // 如果切中减分炸弹
            if (fruit.className == 'bomb-10'){
                clearInterval(fruit.timer);
                oFruitContent.innerHTML = '';
                fruit.style.background = 'transparent';
                setTimeout(function () {
                    fruit.remove();
                },3000)
                makeVoice(fruit,objSound.boom);
                showWhiteMask();
                // 减分
                if (nScore == bestTimeScore ){
                    bestTimeScore -= 10;
                    if (bestTimeScore < 0){
                        bestTimeScore = 0;
                    }
                    oBestScoreNum.innerHTML = bestTimeScore;
                    localStorage.setItem('bestTimeScore',bestTimeScore);
                }
                nScore -= 10;
                if (nScore < 0){
                    nScore = 0;
                }
                oGetScoreNum.innerHTML = nScore;
                return;
            }
            // 得分增加
            nScore++;
            oGetScoreNum.innerHTML = nScore;
            // 最大得分
            if (bestTimeScore < nScore){
                bestTimeScore = nScore;
                oBestScoreNum.innerHTML = bestTimeScore;
                localStorage.setItem('bestTimeScore',bestTimeScore)
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
        speedY += g;
        fruit.style.top = fruit.offsetTop + speedY + 'px';
        fruit.style.left = fruit.offsetLeft + speedX + 'px';
        if (fruit.offsetTop > 600 && speedY > 0){
            clearInterval(fruit.timer);
            fruit.remove();
        }
    },15)
}

// 随机生成多个水果
function timeFruits() {
    timer = setInterval(function () {
        var n = Math.round(Math.random()*3 + 1);
        makeSound(objSound.throw);
        for (var i=0; i<n; i++){
            timeFruit();
        }
    },2000)
}















