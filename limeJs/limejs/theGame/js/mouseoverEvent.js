
/**
 Test for correctly dispatching mouseover/mouseout for LimeJS objects
 
 Usage: scene.listenOverOut(shape,function(e){ console.log('over'); }, function(e){ console.log('out'); });
 
 Advice welcome about how to have the same result with more LimeJS/Closure style API.
 
*/
lime.Scene.prototype.listenOverOut = (function(){

    var moveHandler = function(e){
        for(var i in this.registeredOverOut_){
            var item = this.registeredOverOut_[i];
            var shape = item[0];
            if(!shape.inTree_) continue;
            var insideShape = shape.hitTest(e);
            if(!shape.insideShape_ && insideShape && goog.isFunction(item[1])){
                item[1].call(shape,e);
            }
            if(shape.insideShape_ && !insideShape && goog.isFunction(item[2])){
                item[2].call(shape,e);
            }
            shape.insideShape_ = insideShape;
        }
    };

    return function(shape,over,out){
        if(shape==this) return; //scene itself is always full

        if(!this.registeredOverOut_){
             this.registeredOverOut_ = {};
        }

        var uuid = goog.getUid(shape);

        if(!over && !out) //clear if empty
            delete this.registeredOverOut_[uuid];

        if(!this.isListeningOverOut_){
            goog.events.listen(this,"mousemove",moveHandler,false,this);
            this.isListeningOverOut_ = true;
        }

        this.registeredOverOut_[uuid] = [shape,over,out];
    }
})();