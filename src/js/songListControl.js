(function ($, root){
    function renderSongList (data){
        var str = '';
        data.forEach(function(item){
            str += '<li>' + item.song + ' - ' + item.singer + '</li>';
        })
        $(".song-list ul").html(str);
    }
    function setActive(index){
        var activeLi = $(".song-list ul").children().eq(index)
        activeLi.addClass("active");
        activeLi.siblings().removeClass("active");
    }

    root.songListControl = {
        renderSongList: renderSongList,
        setActive: setActive
    }
})(window.Zepto, window.player || (window.player = {}))