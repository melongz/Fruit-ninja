// canvas画板
var drawBoard = document.querySelector('#drawBoard');

// 背景canvas
var bgCanvas = document.querySelector('.bg');

// 声音
var sound = document.querySelector('.sound');

//刀光
var light = document.querySelector('.light');

// ipad
var oIpad = document.querySelector('.ipad'),
    oScreen = document.querySelector('.screen');

// 文字区
var oMask = document.querySelector('.mask'),
    oLogo = document.querySelector('.logo'),
    oNinja = document.querySelector('.ninja'),
    oDesc = document.querySelector('.desc');

// 游戏区
var oGameArea = document.querySelector('.game-area'),
    // 分数区
    oScoreArea = document.querySelector('.score-area'),
    oGetScore = document.querySelector('.get-score'),
    oGetScorePic = document.querySelector('.get-score-pic'),
    oGetScoreNum = document.querySelector('.get-score-num'),
    oBestScore = document.querySelector('.best-score'),
    oBestScoreNum = document.querySelector('.best-score-num'),
    // xxx区
    oLostArea = document.querySelector('.lost-area'),
    oLosts1 = document.querySelector('.losts1'),
    oLosts2 = document.querySelector('.losts2'),
    oLosts3 = document.querySelector('.losts3'),
    // 倒计时区
    oCountDown = document.querySelector('.countdown');

// 功能区
var oFuncArea = document.querySelector('.func-area'),
    // 退出按钮
    oQuit = document.querySelector('.quit'),
    oQuitCricle = document.querySelector('.quit-cricle'),
    oQuitBomb = document.querySelector('.quit-bomb'),
    // 经典按钮
    oClassicMode = document.querySelector('.classic-mode'),
    oClassicModeCricle = document.querySelector('.classic-mode-cricle'),
    oClassicModeFruit = document.querySelector('.classic-mode-fruit'),
    // 街机按钮
    oArcadeMode = document.querySelector('.arcade-mode'),
    oArcadeModeCricle = document.querySelector('.arcade-mode-cricle'),
    oArcadeModeFruit = document.querySelector('.arcade-mode-fruit'),
    // 限时按钮
    oTimeMode = document.querySelector('.time-mode'),
    oTimeModeCricle = document.querySelector('.time-mode-cricle'),
    oTimeModeFruit = document.querySelector('.time-mode-fruit');
    // 计分区
var oScoreboard = document.querySelector('.scoreboard'),
    oScoreboardClassic = document.querySelector('.scoreboard-classic'),
    oScoreboardTime = document.querySelector('.scoreboard-time'),
    oScoreboardArcade = document.querySelector('.scoreboard-arcade');

// 水果容器
var oFruitContent = document.querySelector('.fruit-content');

// 其他容器
var oOtherContent = document.querySelector('.other-content');


// 按钮的中心点坐标(因为最开始按钮的缩放比为0,宽高都为0，所以left和top就是中心点)
var ClassicModeCenterX = oClassicMode.getBoundingClientRect().left,
    ClassicModeCenterY = oClassicMode.getBoundingClientRect().top,
    ArcadeModeCenterX = oArcadeMode.getBoundingClientRect().left,
    ArcadeModeCenterY = oArcadeMode.getBoundingClientRect().top,
    TimeModeCenterX = oTimeMode.getBoundingClientRect().left,
    TimeModeCenterY = oTimeMode.getBoundingClientRect().top,
    QuitCenterX = oQuitBomb.getBoundingClientRect().left,
    QuitCenterY = oQuitBomb.getBoundingClientRect().top;

// 声音地址
var objSound = {
    boom:'sound/boom.mp3',
    menu:'sound/menu.mp3',
    over:'sound/over.mp3',
    splatter:'sound/splatter.mp3',
    start:'sound/start.mp3',
    throw:'sound/throw.mp3'
}

// 水果参数
var arrFruit = [
    /*{
     name:'bomb',
     R:40
     },
    {
     name:'bomb-10',
     R:40
     },
    {
        name:'pome-ice',
        R:50,
        cut:['img/fruit/pome-ice1.png','img/fruit/pome-ice2.png'],
        // juice:'#a61d13'
    },
    {
        name:'pome-hot',
        R:50,
        cut:['img/fruit/pome-hot1.png','img/fruit/pome-hot2.png'],
        // juice:'#a61d13'
    },
    {
        name:'pome-double',
        R:50,
        cut:['img/fruit/pome-double1.png','img/fruit/pome-double2.png'],
        // juice:'#a61d13'
    },*/
    {
        name:'basaha',
        R:30,
        cut:['img/fruit/basaha-1.png','img/fruit/basaha-2.png'],
        juice:'#9b0000'
    },
    {
        name:'apple',
        R:30,
        cut:['img/fruit/apple-1.png','img/fruit/apple-2.png'],
        juice:'#99cc00'
    },
    {
        name:'peach',
        R:30,
        cut:['img/fruit/peach-1.png','img/fruit/peach-2.png'],
        juice:'#ffd028'
    },
    {
        name:'coconut',
        R:40,
        cut:['img/fruit/coconut-2.png','img/fruit/coconut-1.png'],
        juice:'#f8f8f8'
    },
    {
        name:'green',
        R:30,
        cut:['img/fruit/green-2.png','img/fruit/green-1.png'],
        juice:'#6cac38'
    },
    {
        name:'kiwi',
        R:30,
        cut:['img/fruit/kiwi-1.png','img/fruit/kiwi-2.png'],
        juice:'#96d03e'
    },
    {
        name:'lemon',
        R:30,
        cut:['img/fruit/lemon-2.png','img/fruit/lemon-1.png'],
        juice:'#e3b617'
    },
    {
        name:'orange',
        R:30,
        cut:['img/fruit/orange-1.png','img/fruit/orange-2.png'],
        juice:'#fc650f'
    },
    {
        name:'pear',
        R:40,
        cut:['img/fruit/pear-1.png','img/fruit/pear-2.png'],
        juice:'#f0e050'
    },
    {
        name:'rapple',
        R:40,
        cut:['img/fruit/rapple-2.png','img/fruit/rapple-1.png'],
        juice:'#f8f0a8'
    },
];
var arrPome = [
    {
        name:'pome-ice',
        R:50,
        cut:['img/fruit/pome-ice1.png','img/fruit/pome-ice2.png'],
        // juice:'#a61d13'
    },
    {
        name:'pome-hot',
        R:50,
        cut:['img/fruit/pome-hot1.png','img/fruit/pome-hot2.png'],
        // juice:'#a61d13'
    },
    {
        name:'pome-double',
        R:50,
        cut:['img/fruit/pome-double1.png','img/fruit/pome-double2.png'],
        // juice:'#a61d13'
    }
];

// 根据该变量判断过场动画是否加载完
var stratOnOff = false;
// 记录鼠标移动角度
var mouseDir;
// 记录鼠标在屏幕上的位置
var mouseX,mouseY;
// 随机抛出随机个数水果定时器
var timer = null;
// 得分
var nScore = 0;
// 最大得分
var bestClassicScore = localStorage.getItem('bestClassicScore');
var bestTimeScore = localStorage.getItem('bestTimeScore');
var bestArcadeScore = localStorage.getItem('bestArcadeScore');
// 记录掉落水果个数
var numLostFruit = 0;
// 记录出现特殊水果时间
var timeA,timeB,timeC,timeD,timeE;
// 冰冻开关
var iceOnOff = false;
// 双倍开关
var doubleOnOff = false;
// 狂热开关
var hotOnOff = false;
// 街机水果数组（为了不改变原数组）
var arrHot = arrFruit.slice();
// 暂存水果数量，用于判断连击
var arrCutNum = [];





