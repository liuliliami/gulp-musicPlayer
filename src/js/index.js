var root = window.player;
// 数组列表及长度
var dataList,len;
// 当前索引
var nowIndex = 0;
// 旋转角度
var rotateDeg = 0;
// 引入音频控制函数
var audio = root.audioManager;
console.log(audio);
// 旋转定时器
var timer;
// 进度条控制模块
var pro = root.pro;
// 记录控制条进度
var lastPercent = 0;


// 获取数据
function getData (url){
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            dataList = data;
            len = data.length;
            console.log(dataList);
            root.render(dataList[0]);
            root.songListControl.renderSongList(data);
            root.songListControl.setActive(0);
            audio.getAudio(dataList[0].audio);
            bindEvent(dataList);
            bingTouch();
            $("body").trigger("play:change", 0);//{1}
        },
        error: function () {
            console.log("error");
        }
    })
}
getData("../mock/data.json")

// 按钮绑定事件
function bindEvent (data) {
    // 自定义切歌后播放事件,减少 {1} {2} 处代码的重复
    // 自定义事件回调中要有形参e，不然会报错
    $("body").on("play:change",function(e,index){
        root.render(data[index]);
        audio.getAudio(data[index].audio);
        pro.renderAlltime(dataList[index].duration);
        // 切歌后重置控制条进度、进度条起点、歌曲当前时间
        lastPercent = 0;
        audio.playTo(0);
        pro.update(0);
        if(audio.status == "play"){
            pro.start(0);
        }

        rotateDeg = 0;
        $(".img-box").css({
            "transform": "rotateZ("+ 0 +"deg)",
            "transition": "none"
        })
        if(audio.status == "play"){
            audio.play();
            rotate(rotateDeg);
        }
    })
    $(".prev").on("click",function () {
        nowIndex = root.indexControl.prev();
        $("body").trigger("play:change", nowIndex); //{1}
        pro.renderAlltime(dataList[nowIndex].duration);
        // 改变 songList 中 active 的歌曲（歌曲名称变红）
        root.songListControl.setActive(nowIndex);
    })
    $(".next").on("click",function () {
        nowIndex = root.indexControl.next();
        $("body").trigger("play:change", nowIndex); //{2}
        pro.renderAlltime(dataList[nowIndex].duration);
        // 改变 songList 中 active 的歌曲（歌曲名称变红）
        root.songListControl.setActive(nowIndex);
    }) 
    $(".play").on("click", function () {
        var curIndex = root.indexControl.getIndex();// 当前歌曲 index
        var duration = dataList[curIndex].duration;// 当前歌曲时长
        var curTime = lastPercent * duration;// 当前歌曲已经播放的时间
        if(audio.status == "pause"){
            audio.playTo(curTime);// 更新音频 currentTime 时间
            audio.play();// 从最新时间点处开始播放
            pro.start(lastPercent);// 移动进度条
            rotate();
        } else if(audio.status == "play"){
            audio.pause();
            pro.stop();
            clearInterval(timer);
            lastPercent = audio.audio.currentTime / duration;// 记录最新的音频播放进度
        }
        $(".play").toggleClass("playing");
    })
    $(".list").on("click", function (){// 歌曲列表显示/隐藏
        $(".song-list").toggle();
    })
    $(".song-list ul li").on("click", function(){
        // 获取被点击 li 的 index
        var index = $(this).index();
        root.songListControl.setActive(index);
        // 切歌后重置控制条进度、歌曲当前时间、进度条起点
        lastPercent = 0;
        audio.playTo(0);
        pro.update(0);
        $("body").trigger("play:change", index);
    })
}

// 进度条拖拽时间
function bingTouch (){
    var $spot = $(".spot");
    var offsetX = $(".pro-bottom").offset().left;
    var proWidth = $(".pro-bottom").width();
    $spot.on("touchstart", function(e){
        pro.stop();
    }).on("touchmove", function (e){
        var x = e.changedTouches[0].clientX - offsetX;
        var percent = x / proWidth;
        if(percent >= 0 && percent <= 1){
            pro.update(percent);
        }
    }).on("touchend", function (e){
        var x = e.changedTouches[0].clientX - offsetX;
        var percent = x / proWidth;
        if(percent >= 0 && percent <= 1){
            if(audio.status == "play"){
                var curIndex = root.indexControl.getIndex();
                var curTime = percent * dataList[curIndex].duration;
                audio.playTo(curTime);
                audio.play(); 
                pro.start(percent);
            } else if(audio.status == "play"){
                var curIndex = root.indexControl.getIndex();
                var curTime = percent * dataList[curIndex].duration;
                audio.playTo(curTime);
            }
            lastPercent = percent;
        }
    })
}

// 图片旋转
function rotate (deg) {
    clearInterval(timer);
    timer = setInterval(function (){
        rotateDeg += 1;
        deg = rotateDeg;
        $(".img-box").css({
            "transform": "rotateZ("+ deg +"deg)",
            "transition": "all 1s linear"
        })
    },100)
}



