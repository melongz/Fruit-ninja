// 随机生成一个水果
function arcadeFruit(arr,l,t) {
    var fruitData = arr.sort(function () {
        return Math.random() - 0.5;
    })[0];
    var beginTop = t;
    var beginLeft = l;
    var fruit = document.createElement('div');
    fruit.className = fruitData.name;
    fruit.onoff = true;
    oFruitContent.appendChild(fruit);
    fruit.style.top = t + 'px';
    fruit.style.left = l + 'px';
    // 是否冰冻
    if (iceOnOff){
        var speedY = -(parseInt(Math.random()*3) + 9);
        var speedX = 1;
        var g = 0.1;
    }else if (hotOnOff && beginTop == 100){// 是否狂热
        var speedY = 0;
        if (beginLeft == 684){
            var speedX = -(parseInt(Math.random()*8) + 6);
        }else {
            var speedX = (parseInt(Math.random()*8) + 6);
        }
        var g = 0.15;
    }else {
        var speedY = -(parseInt(Math.random()*3) + 15);
        var speedX = 2;
        var g = 0.25;
    }
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
                if (nScore == bestArcadeScore ){
                    bestArcadeScore -= 10;
                    if (bestArcadeScore < 0){
                        bestArcadeScore = 0;
                    }
                    oBestScoreNum.innerHTML = bestArcadeScore;
                    localStorage.setItem('bestArcadeScore',bestArcadeScore);
                }
                nScore -= 10;
                if (nScore < 0){
                    nScore = 0;
                }
                oGetScoreNum.innerHTML = nScore;
                return;
            }
            // 如果切中冰冻石榴
            if (fruit.className == 'pome-ice'){
                oOtherContent.style.background = 'url(img/ice-mask.png)';
                iceOnOff = true;
                setTimeout(function () {
                    oOtherContent.style.background = '';
                    iceOnOff = false;
                },5000)
            }
            // 如果切中狂热石榴
            if (fruit.className == 'pome-hot'){
                oOtherContent.style.background = 'url(img/hot-mask.png)';
                hotOnOff = true;
                setTimeout(function () {
                    oOtherContent.style.background = '';
                    hotOnOff = false;
                },5000)
            }
            // 如果切中双倍石榴
            if (fruit.className == 'pome-double'){
                oOtherContent.style.background = 'url(img/double-mask.png)';
                doubleOnOff = true;
                setTimeout(function () {
                    oOtherContent.style.background = '';
                    doubleOnOff = false;
                },5000)
            }
            // 得分增加
            if (doubleOnOff){
                nScore += 2;
            }else {
                nScore++;
            }
            oGetScoreNum.innerHTML = nScore;
            // 最大得分
            if (bestArcadeScore < nScore){
                bestArcadeScore = nScore;
                oBestScoreNum.innerHTML = bestArcadeScore;
                localStorage.setItem('bestArcadeScore',bestArcadeScore)
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
function arcadeFruits() {
    timer = setInterval(function () {
        var n = Math.round(Math.random()*3 + 1);
        makeSound(objSound.throw);
        for (var i=0; i<n; i++){
            arcadeFruit(arrHot,parseInt(Math.random()*684),600);
        }
    },2000)
}



