var Map = function(width) {

  var self = this,
      fieldsVisible = 11;

  this.element  = null;

  this.render = function(data){
    this.map    = this.render_map(data.width, data.height);
  };

  this.render_map = function(width, height){
    this.fieldWidth = Client.paper.width / fieldsVisible;
    var element = Client.paper.rect(0, 0, width * this.fieldWidth, height * this.fieldWidth).attr({
      fill: "url('/images/fog3.png')",
      opacity: 0.8
    });
  };

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

  // this.fetch = function(callback){
  //   Client.api.get('/view', function(data, status, xhr){
  //     self.data = data;
  //     self.initFields(data);
  //     callback(data);
  //   })
  // };

  this.world_width = function(){
    return this.fieldWidth * this.fields[0].length;
  };

  this.world_height = function(){
    return this.fieldWidth * this.fields.length;
  };

  this.render_fields = function() {
    var presenter = new FieldPresenter(this.fieldWidth);
    Client.paper.setStart();
    this.data.each(function(row, y){
      row.each(function(field_data, x){
        self.setField(x, y, presenter.render(field_data, x, y));
      });
    });
    this.element = Client.paper.setFinish();
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

};



