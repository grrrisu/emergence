var View = function(width) {

  var self = this,
      fieldsVisible = 11;

  this.data     = null;
  this.element  = null;

  this.init = function() {
    this.renderBox(width, width);
  };

  this.renderBox = function(width, height){
    var view = Emergence.paper.rect(0, 0, width, width).attr({
      stroke: '#ff0000',
      fill: "#ff0000",
      opacity: 1
    });

    return view;
  }

  this.initFields = function(data){
    this.fieldWidth = width / fieldsVisible;
    this.fields     = new Array(data.length);
    data.length.times(function(i){
      self.fields[i] = new Array(data[0].length);
    });
  };

  this.getField = function(x,y){
    return this.fields[y][x];
  };

  this.setField = function(x,y,value){
    this.fields[y][x] = value;
  };

  this.fetch = function(callback){
    Emergence.api.get('/view', function(data, status, xhr){
      self.data = data;
      self.initFields(data);
      callback(data);
    })
  };

  this.world_width = function(){
    return this.fieldWidth * this.fields[0].length;
  };

  this.world_height = function(){
    return this.fieldWidth * this.fields.length;
  };

  this.render = function() {
    var presenter = new FieldPresenter(this.fieldWidth);
    Emergence.paper.setStart();
    this.data.each(function(row, y){
      row.each(function(field_data, x){
        self.setField(x, y, presenter.render(field_data, x, y));
      });
    });
    this.element = Emergence.paper.setFinish();
  };

  // --- position helpers ---

  this.field = function(x, y){
    var x_dimension = this.fields[0].length;
    var y_dimension = this.fields.length;
    if(x < 0) x = x_dimension + x;
    if(y < 0) y = y_dimension + y;
    if(x >= x_dimension) x = x - x_dimension;
    if(y >= y_dimension) y = y - y_dimension;
    return this.getField(x,y);
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



