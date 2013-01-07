var Map = function() {

  var self = this;

  this.element  = null;
  this.fields = [];
  this.fieldsVisible = 11;
  this.fieldWidth = 0;
  this.presenter = new MapPresenter(this);

  this.init = function() {
    this.fieldWidth = this.presenter.fieldWidth();
    this.fieldPresenter = new FieldPresenter(this.fieldWidth);
  }

  this.render = function(data){
    this.element = this.presenter.render(data.width, data.height);
  };

  this.getField = function(x,y){
    return this.fields[y][x];
  };

  this.setField = function(x,y,value){
    this.fields[y][x] = value;
  };

  this.render_fields = function(x, y, width, height){
    var request_data = {x: x, y: y, width: width, height: height};
    this.fetch(request_data, function(data){
      while(self.fields.length > 0){
        self.fields.pop().remove();
      }
      data.each(function(row, j){
        row.each(function(field_data, i){
          var field = self.fieldPresenter.render(field_data, (x + i) , (y + j));
          if(field !== null) self.fields.push(field);
        });
      });
      Client.viewport.layer.draw();
    });
  };

  this.fetch = function(request_data, callback){
    Client.api.post('/view', request_data, function(data, status, xhr){
      callback(data);
    });
  };

  this.world_width = function(){
    return this.fieldWidth * this.fields[0].length;
  };

  this.world_height = function(){
    return this.fieldWidth * this.fields.length;
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



