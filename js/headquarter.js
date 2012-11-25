var Headquarter = function(width){

  this.render = function(x, y){
    var self = this;
    this.xOffset = 8;
    this.yOffset = 8;
    this.view_radius = 2;
    hq = Emergence.paper.image("images/Raratonga_Mask.gif", 0, 0, 40, 40);
    this.put(hq, x, y);
    this.fog(x, y, 0, this.unfog);
  };

};

Headquarter.prototype = new Pawn();
