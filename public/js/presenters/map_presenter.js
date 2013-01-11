var MapPresenter = function(model){

  this.cachedFieldWidth = null;

  this.fieldWidth = function(){
    if(this.cachedFieldWidth === null){
      this.cachedFieldWidth = Client.grapher.getWidth() / model.fieldsVisible;
    }
    return this.cachedFieldWidth;
  };

  this.render = function(width, height){
    this.width  = width * this.fieldWidth();
    this.height = height * this.fieldWidth();
    var fog   = new Kinetic.Rect({
      width: this.width,
      height: this.height,
      fill: {image: Client.grapher.images['fog']},
      stroke: 'black',
      strokeWidth: 1
    });

    Client.grapher.layer.add(fog);
    Client.grapher.layer.draw();
    return fog;
  };

};
