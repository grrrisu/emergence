var Viewport = function() {

  this.x = 0;
  this.y = 0;
  this.zoom   = 1;
  this.element = null;

  this.render = function(data) {
    var width   = data.width * Client.map.fieldWidth;
    var height  = data.height * Client.map.fieldWidth;
    this.element = Client.paper.rect(0, 0, width, height).attr({
      fill: '#0000ff',
      opacity: 0.5
    });

    this.element.drag(this.onmove, this.onstart, this.onend);
    this.element.model = this;
  };

  // TODO center to HQ
  this.center = function(){
    this.x = Client.headquarter.pawn.ax - Client.paper.width * this.zoom / 2;
    this.y = Client.headquarter.pawn.ay - Client.paper.height * this.zoom / 2;
    this.apply();
  }

  this.apply = function(){
    Client.paper.setViewBox(this.x, this.y, Client.paper.width * this.zoom, Client.paper.height * this.zoom);
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

};
