var World = function(width, dimension) {

  var self = this,
      fieldWidth = 0;

  this.init = function() {
    var world = Emergence.paper.rect(0, 0, width, width).attr({
      stroke: '#ff0000',
      fill: "#000",
      opacity: 1
    });
    this.fieldWidth = (width / dimension);

    this.fields = new Array(dimension);
    dimension.times(function(i){
      self.fields[i] = new Array(dimension);
    });

    return world;
  };

  this.render = function() {
    // var world  = $('#world');
    // world.css({
    //   "height": width,
    //   "width":  width
    // });
    // for(var i = 0; i < dimension * dimension; i++){
    //   world.append('<div class="field"></div>');
    //   world.children().last()
    //        .css({
    //         "background-color": '#00bb3f',
    //         "height": this.fieldWidth -1,
    //         "width": this.fieldWidth -1,
    //         opacity: 1
    //        });
    // }

    var field = new Field(this.fieldWidth);
    (dimension).times(function(x){
      (dimension).times(function(y){
        self.fields[x][y] = field.render(x, y);
      });
    });
  };

  this.field = function(x, y){
    return this.fields[x][y];
  };

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
    var position = this.relativePosition(x, y);
    return this.absolutePosition(position[0], position[1]);
  };

  this.init();

};



