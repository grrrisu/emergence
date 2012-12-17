var Viewport = function(width) {

  this.x = 0;
  this.y = 0;
  this.zoom = 1;

  this.init = function() {
    var element = Emergence.paper.rect(0, 0, Emergence.view.world_width(), Emergence.view.world_height()).attr({
      fill: '#0000ff',
      opacity: 0
    });

    element.drag(this.onmove, this.onstart, this.onend);
    element.model = this;

  };

  // TODO center to HQ
  this.center = function(){
    this.x = 0;
    this.y = 0;
    this.apply();
  }

  this.apply = function(){
    Emergence.paper.setViewBox(this.x, this.y, width * this.zoom, width);
  }

  // --- dragging ---

  this.onstart = function(x, y, e){
  };

  this.onmove = function(dx, dy, x, y, e){
    // TODO how to handle world border crossing?
    this.model.x -= dx / 2;
    this.model.y -= dy / 2;
    this.model.apply();
  };

  this.onend = function(e){
  };

  this.init();

};
