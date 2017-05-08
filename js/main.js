// 鼠标添加画线功能
drawLine(drawBoard);

// 背景
bg(bgCanvas);

// 加载最高分
loadScore();

// 过场动画
cutscene();

// 选择游戏模式
drawBoard.onoff = false;
var fnDown = null;
drawBoard.addEventListener('mousedown',function () {
    // 如果过场动画还没有完，则不能选择模式
    if (stratOnOff == false){
        return;
    }
    fnDown = arguments.callee;
    drawBoard.addEventListener('mousemove',mousefn);
    drawBoard.addEventListener('mouseup',upfn)
})
//move事件有名函数
function mousefn(ev){
    var strMode = choiceMode(ev);
    if (strMode == 'classic-mode' || strMode == 'arcade-mode' || strMode == 'time-mode' ){
        txtGoBack();
        makeSound(objSound.splatter);
        makeVoice(oOtherContent,objSound.start);
        drawBoard.onoff = true;
        oFuncArea.style.display = 'none';
    }
    // 选择经典模式
    if (strMode == 'classic-mode'){
        oBestScoreNum.innerHTML = bestClassicScore ? bestClassicScore : 0;
        arrFruit.push({name:'bomb', R:40});
        classicFruits();
        setTimeout(function () {
            oScoreArea.style.left = '10px';
            oLostArea.style.right = '10px';
        },800)
    }
    // 选择街机模式
    if (strMode == 'arcade-mode'){
        timeA = parseInt(Math.random()*5 + 50);
        timeB = parseInt(Math.random()*5 + 40);
        timeC = parseInt(Math.random()*5 + 30);
        timeD = parseInt(Math.random()*5 + 20);
        timeE = parseInt(Math.random()*5 + 10);
        oBestScoreNum.innerHTML = bestArcadeScore ? bestArcadeScore : 0;
        arrHot.push({name:'bomb-10', R:40});
        arcadeFruits();
        changeTime(60);
        setInterval(function () {
            if (hotOnOff){
                arcadeFruit(arrFruit,0,100)
                arcadeFruit(arrFruit,684,100)
            }
        },800)
        setTimeout(function () {
            oScoreArea.style.left = '10px';
            oCountDown.style.right = '10px';
        },800)
    }
    // 选择限时模式
    if (strMode == 'time-mode'){
        oBestScoreNum.innerHTML = bestTimeScore ? bestTimeScore : 0;
        arrFruit.push({name:'bomb-10', R:40});
        changeTime(90);
        timeFruits();
        setTimeout(function () {
            oScoreArea.style.left = '10px';
            oCountDown.style.right = '10px';
        },800)
    }
    // 如果选中一个模式，取消鼠标按下和移动的绑定事件；
    if (drawBoard.onoff){
        drawBoard.removeEventListener('mousedown',fnDown);
        drawBoard.removeEventListener('mousemove',mousefn);
    }
}
//up事件有名函数
function upfn(){
    drawBoard.removeEventListener('mousemove',mousefn);
    drawBoard.removeEventListener('mouseup',upfn);
}

// 记录鼠标移动方向
getMouseDir();

// 切水果
drawBoard.addEventListener('mousedown',function () {
    drawBoard.addEventListener('mousemove',movefn1)
    drawBoard.addEventListener('mouseup',upfn1)
})
//move事件有名函数1
function movefn1(ev){
    mouseX = ev.offsetX;
    mouseY = ev.offsetY;
}
//up事件有名函数1
function upfn1(){
    mouseX = NaN;
    mouseY = NaN;
    drawBoard.removeEventListener('mousemove',movefn1);
    drawBoard.removeEventListener('mouseup',upfn1);
}































