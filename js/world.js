var World = function(width, dimension) {

  var self = this,
      fieldWidth = 0;

  this.init = function() {
    Emergence.paper.rect(0, 0, width, width).attr({
      stroke: '#ff0000',
      fill: "#000",
      opacity: 1
    });
    this.fieldWidth = (width / dimension);
  };

  this.render = function() {
    var field = new Field(this.fieldWidth);
    (dimension).times(function(x){
      (dimension).times(function(y){
        field.render(x, y);
      });
    });
  }

  this.relativePosition = function(ax, ay){
    var rx = (ax / this.fieldWidth).round();
    var ry = (ay / this.fieldWidth).round();
    return [rx, ry];
  };

  this.absolutePosition = function(rx, ry){
    var ax = rx * this.fieldWidth;
    var ay = ry * this.fieldWidth;
    return [ax, ay];
  };

  this.snapToGrid = function(x, y){
    var position = this.relativePosition(x, y)
    return this.absolutePosition(position[0], position[1]);
  }

  this.init();

}


