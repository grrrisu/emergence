var View = function(width) {

  var self = this,
      fieldWidth = 0;

  this.data     = null;
  this.element  = null;

  this.init = function() {
    var view = Emergence.paper.rect(0, 0, width, width).attr({
      stroke: '#ff0000',
      fill: "#000",
      opacity: 1
    });

    return view;
  };

  this.initFields = function(data){
    this.dimension  = data.length;
    this.fieldWidth = width / data.length;
    this.fields     = new Array(this.dimension);
    this.dimension.times(function(i){
      self.fields[i] = new Array(this.dimension);
    });
  };

  this.fetch = function(callback){
    Emergence.api.get('/view', function(data, status, xhr){
      self.data = data;
      self.initFields(data);
      callback(data);
    })
  };

  this.render = function() {
    var presenter = new FieldPresenter(this.fieldWidth);
    Emergence.paper.setStart();
    this.data.each(function(row, y){
      row.each(function(field_data, x){
        self.fields[x][y] = presenter.render(field_data, x, y);
      });
    });
    this.element = Emergence.paper.setFinish();
  };

  // --- position helpers ---

  this.field = function(x, y){
    if(x < 0) x = this.dimension +x;
    if(y < 0) y = this.dimension +y;
    if(x >= this.dimension) x = x - this.dimension;
    if(y >= this.dimension) y = y - this.dimension;
    return this.fields[x][y];
  };

  this.relativePosition = function(ax, ay){
    var rx = ((ax - this.fieldWidth / 2) / this.fieldWidth).round();
    var ry = ((ay - this.fieldWidth / 2) / this.fieldWidth).round();
    return [rx, ry];
  };

  this.absolutePosition = function(rx, ry){
    var ax = rx * this.fieldWidth + (this.fieldWidth / 2);
    var ay = ry * this.fieldWidth + (this.fieldWidth / 2);
    return [ax, ay];
  };

  this.snapToGrid = function(x, y){
    var position = this.relativePosition(x, y);
    return this.absolutePosition(position[0], position[1]);
  };

  this.init();

};



