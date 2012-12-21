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
      opacity: 0
    });

    this.element.drag(this.onmove, this.onstart, this.onend);
    this.element.model = this;
  };

  this.center = function(){
    this.x = Client.headquarter.pawn.ax - Client.paper.width * this.zoom / 2;
    this.y = Client.headquarter.pawn.ay - Client.paper.height * this.zoom / 2;
    this.apply();
    this.update();
  };

  this.apply = function(){
    Client.paper.setViewBox(this.x, this.y, Client.paper.width * this.zoom, Client.paper.height * this.zoom);
  };

  this.update = function(){
    var position = Client.map.relativePosition(this.x, this.y);
    Client.map.render_fields(position[0], position[1], Client.map.fieldsVisible * this.zoom + 1, Client.map.fieldsVisible * this.zoom + 1);
  };

  // --- dragging ---

  this.onstart = function(x, y, e){
  };

  this.onmove = function(dx, dy, x, y, e){
    // TODO how to handle world border crossing?
    if(this.model.x - dx < 0){
      this.model.x = 0;
    } else if (this.model.x - dx > Client.map.width - Client.paper.width * this.model.zoom){
      this.model.x = Client.map.width - Client.paper.width * this.model.zoom;
    } else {
      this.model.x -= dx / 2;
    }

    if(this.model.y - dy < 0){
      this.model.y = 0;
    } else if (this.model.y - dy > Client.map.height - Client.paper.height * this.model.zoom){
      this.model.y = Client.map.height - Client.paper.height * this.model.zoom;
    } else {
      this.model.y -= dy / 2;
    }

    this.model.apply();
  };

  this.onend = function(e){
    this.model.update();
  };

};
