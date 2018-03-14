var Exposure = {
  init: function($imgs, handler){
    this.$c = $(window),
    this.$target = $imgs;
    this.handler = handler;
    this.bind();
  },
  bind: function(){
    var me = this,
        timer = null,
        interval = 100;
    $(window).on( 'scroll', function(e){
          timer && clearTimeout( timer );
          timer = setTimeout( function(){
              me.checkShow();
          }, interval );
    } );
  },
  checkShow: function(){
    //console.log('checkShow');
    var me = this;
    this.$target.each(function(){
      var $cur = $(this);
      if(me.isShow($cur) && !me.hasLoaded($cur) ){
          me.handler && me.handler.call( this, this );
          $cur.data('loaded', true);
      }
    });
  },
  isShow: function($el){
    //console.log($el);
    var scrollH = this.$c.scrollTop(),
        winH = this.$c.height(),
        top = $el.offset().top ;
        
    if(top < winH + scrollH){
      return true;
    }else{
      return false;
    }
  },
  hasLoaded: function($el){
    if($el.data('loaded')){
      return true;
    }else{
      return false;
    }
  }
}