(function ($, root){
    var duration,// 总时间
        iframeId,// requestAnimationFrame定时器标识
        startTime,// 开始播放的时间
        lastPercent = 0;// 记录上次的播放进度，重复点击开始暂停时使用
    // 渲染歌曲总时间
    function renderAlltime (alltime) {
        duration = alltime;
        var time = formateTime(alltime);
        $(".pro .all-time").html(time);
    }
    // 将时间处理成 00:00 格式
    function formateTime (t){
        t = Math.round(t);
        var min = Math.floor(t / 60);
        var sec = t - min * 60;
        min = min >= 10 ? min : "0" + min;
        sec = sec >= 10 ? sec : "0" + sec;
        return min + ":" + sec;
    }
    // 进度条移动
    // p 是进度条开始移动的位置
    function start (p) {
        cancelAnimationFrame(iframeId);
        startTime = new Date().getTime();
        lastPercent = p == undefined ? 0 : p;
        function frame () {
            var curTime = new Date().getTime();
            var percent = lastPercent + (curTime - startTime) / (duration * 1000);// 单位是毫秒
            if(percent <= 1) {
                update(percent);
            } else {
                cancelAnimationFrame(iframeId);
            }
            iframeId = requestAnimationFrame(frame);
        }
        frame();
    }
    // 更新时间和进度条移动距离
    function update (percent){
        // 已经播放的时间
        var palyedTime = percent * duration
        $(".cur-time").html(formateTime(palyedTime));
        // 进度条移动百分比
        var x = -100 + percent * 100;
        $(".pro-top").css({
            "transform": "translateX("+ x +"%)"
        });

    }
    // 暂定运动
    function stop (){
        cancelAnimationFrame(iframeId);
        var curTime = new Date().getTime();
        lastPercent = lastPercent + (curTime - startTime) / (duration * 1000);
    }

    root.pro = {
        renderAlltime: renderAlltime,
        start: start,
        stop: stop,
        update: update,
    }
})(window.Zepto, window.player || (window.player = {}))