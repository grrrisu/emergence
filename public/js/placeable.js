var Placeable = function(element){

  var self = this;

  // relative position
  this.rx = 0;
  this.ry = 0;
  // absolute position
  this.ax = 0;
  this.ay = 0;
  this.offset = 0;
  this.element = 666;

  this.init = function(element){
    this.element = element;
  };

  // move to relative position
  this.move = function(rx, ry){
    this.rx = rx;
    this.ry = ry;
    var position = Client.map.absolutePosition(rx, ry);
    this.ax = position[0];
    this.ay = position[1];
    this.element.transform("t"+ (this.ax + this.offset) +","+ (this.ay + this.offset));
  };

  this.init(element);

};
