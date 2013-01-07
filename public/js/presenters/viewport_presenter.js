var ViewportPresenter = function(model){

  var self = this;

  this.render = function(width, height){
    this.width  = width * Client.map.presenter.fieldWidth();
    this.height = height * Client.map.presenter.fieldWidth();
    var layer = new Kinetic.Layer({
      draggable: true,
      width: this.width,
      height: this.height,
      dragBoundFunc: function(pos){
        return self.checkBoundaries(pos);
      }
    });

    layer.on('dragend', function(event){
      model.update();
    });

    Client.grapher.stage.add(layer);
    return layer;
  };

  this.checkBoundaries = function(pos){
    return {x: pos.x, y: pos.y};
    var x = pos.x,
        y = pos.y;
    if(x > 0){
      x = 0;
    } else if(x < -this.width / model.zoom + Client.grapher.width()){
      x = -this.width / model.zoom + Client.grapher.width();
    }

    if(y > 0){
      y = 0;
    } else if(y < -this.height / model.zoom + Client.grapher.height()){
      y = -this.height / model.zoom + Client.grapher.height();
    }
    model.x = x;
    model.y = y;
    return { x: x, y: y };
  };

  this.apply = function(){
    Client.grapher.stage.setAttrs({
      x: -model.x * 1/model.zoom,
      y: -model.y * 1/model.zoom,
      scale: 1 / model.zoom
    });
  }

}
