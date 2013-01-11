var Viewport = function() {

  this.x = 0;
  this.y = 0;
  this.zoom   = 1;
  this.element = null;
  this.presenter = new ViewportPresenter(this);

  this.render = function(data) {
    var width   = data.width * Client.map.fieldWidth;
    var height  = data.height * Client.map.fieldWidth;
    this.layer  = this.presenter.render(data.width, data.height);
  };

  this.setZoom = function(zoom){
    this.zoom = zoom;
    this.presenter.apply();
    this.layer.draw();
  }

  this.center = function(){
    pos = Client.map.absolutePosition(24, 70);
    this.x = pos[0] - Client.grapher.width() * this.zoom / 2;
    this.y = pos[1] - Client.grapher.height() * this.zoom / 2;
    //this.x = Client.headquarter.pawn.ax - Client.grapher.width() * this.zoom / 2;
    //this.y = Client.headquarter.pawn.ay - Client.grapher.height() * this.zoom / 2;
    this.presenter.apply();
    this.update();
  };

  // this.update = function(){
  //   var position = Client.map.relativePosition(this.x, this.y);
  //   Client.map.render_fields(position[0], position[1], Client.map.fieldsVisible * this.zoom + 1, Client.map.fieldsVisible * this.zoom + 1);
  // };

};
