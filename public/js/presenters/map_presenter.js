var MapPresenter = function(model){

  this.cachedFieldWidth = null;

  this.fieldWidth = function(){
    if(this.cachedFieldWidth === null){
      this.cachedFieldWidth = Client.grapher.stage.attrs.width / model.fieldsVisible;
    }
    return this.cachedFieldWidth;
  };

  this.render = function(width, height){
    var layer = new Kinetic.Layer({
      draggable: true
    });

    this.width  = width * this.fieldWidth();
    this.height = height * this.fieldWidth();
    var rect   = new Kinetic.Rect({
      width: this.width,
      height: this.height,
      fill: {image: Client.grapher.images['fog']},
      stroke: 'black',
      strokeWidth: 1
    });

    layer.add(rect);
    layer.draw();
    Client.grapher.stage.add(layer);

    return layer;
  };

};
