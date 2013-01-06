var MapPresenter = function(model){

  this.cachedFieldWidth = null;

  this.fieldWidth = function(){
    if(this.cachedFieldWidth === null){
      this.cachedFieldWidth = Client.grapher.width() / model.fieldsVisible;
    }
    return this.cachedFieldWidth;
  };

  this.render = function(width, height){
    this.width  = width * this.fieldWidth();
    this.height = height * this.fieldWidth();
    var rect   = new Kinetic.Rect({
      width: this.width,
      height: this.height,
      fill: {image: Client.grapher.images['fog']},
      stroke: 'black',
      strokeWidth: 1
    });

    Client.viewport.layer.add(rect);
    Client.viewport.layer.draw();
    return rect;
  };

};
