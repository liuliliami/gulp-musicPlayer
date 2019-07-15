(function($, root){
    // getAudio paly pause
    function AudioManager (src){
        // 创建音频对象
        this.audio = new Audio();
        this.src = src;
        // 标记音频状态
        this.status = "pause";
    }
    AudioManager.prototype = {
        play: function () {
            // play() pause() load() 是 audio 对象上的原生方法
            this.audio.play();
            this.status = "play";
        },
        pause: function () {
            this.audio.pause();
            this.status = "pause"
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (time) {
            // currentTime 是 audio 对象的原生属性，可以设置或者获取音频当前播放时间
            this.audio.currentTime = time;
        }
    }
    root.audioManager = new AudioManager();

})(window.Zepto, window.player || (window.player = {}))