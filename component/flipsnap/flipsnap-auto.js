function setFlipsnapAuto(){
  var prefix = ['webkit', 'moz', 'o', 'ms'];

  var doWhenActive = window.requestAnimationFrame;
  for(var x = 0; x < prefix.length && !doWhenActive; ++x) {
    doWhenActive = window[prefix[x]+'RequestAnimationFrame'];
  }
  if ( !doWhenActive ) {
    doWhenActive = function(func){
      func();
    };
  }

  // Auto-play interfaces: isAutoPlayEnable, autoPlay, cancleAutoPlay, pauseAutoPlay, resumeAutoPlay
  Flipsnap.prototype.isAutoPlayEnable = function( ) {

    return this.enableAutoPlay;
  };

  Flipsnap.prototype.autoPlay = function(playDelay , playDuration) {

    this.enableAutoPlay = true;
    return this.resumeAutoPlay(playDelay , playDuration);
  };

  Flipsnap.prototype.cancleAutoPlay = function(){

    this.enableAutoPlay = false;
    if(self._handle){
      window.cancelAnimationFrame(self._handle);
    }
    return this.pauseAutoPlay();
  };

  Flipsnap.prototype.pauseAutoPlay = function(){

    clearTimeout( this._autoPlayTimeout );
    return this;
  };

  Flipsnap.prototype.resumeAutoPlay = function(playDelay , playDuration){
    var self = this;

    function nextLoop(){
      self._autoPlayTimeout = setTimeout(function(){
        if ( self.hasNext() ) {
          self.toNext(playDuration);
        }else {
          self.moveToPoint(0 , playDuration);
        }
        clearTimeout( self._autoPlayTimeout );
        self._handle = doWhenActive(nextLoop);
      }, playDelay);
    }

    if ( self.isAutoPlayEnable() ) {
      nextLoop();
    }
    return this;
  };

}



export default setFlipsnapAuto;