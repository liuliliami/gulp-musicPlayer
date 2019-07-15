// 根据取到的数据渲染页面
(function ($, root) {

    function renderImg (src){
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $(".img-box img").attr("src",src);
            root.blurImg(img,$("body"));
        }
    }
    function renderInfo (data){
        var str = '<div class="song-name">'+ data.song +'</div>\
        <div class="singer-name">'+ data.singer +'</div>\
        <div class="aibum-name">'+ data.album +'</div>'
        $(".song-info").html(str);
    }
    function renderIslike (isLike){
        if(isLike){
             $(".like").addClass("liking")
        } else {
            $(".like").removeClass("liking")
        }
    }

    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIslike(data.isLike);
    }

})(window.Zepto, window.player || (window.player = {}))