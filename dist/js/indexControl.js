(function ($, root){    
    function Control (){
        this.index = 0;
    }
    Control.prototype = {
        prev: function (){
            if(this.index == 0){
                this.index = len - 1;
            } else {
                this.index --;
            }
            return this.index;
        },
        next: function (){
            if(this.index == len - 1){
                this.index = 0;
            } else {
                this.index ++;
            }
            return this.index;
        },
        getIndex: function (){
            return this.index;
        }
    }
    root.indexControl = new Control();

})(window.Zepto, window.player || (window.player = {}))