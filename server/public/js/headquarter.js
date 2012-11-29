var Headquarter = function(){

  this.render = function(x, y){
    var self = this;
    this.xOffset = 8;
    this.yOffset = 8;
    this.view_radius = 2;
    this.influence_radius = 138;
    hq = Emergence.paper.image("/images/Raratonga_Mask.gif", 0, 0, 40, 40);
    this.put(hq, x, y);
    this.view(x, y, this.unfog);
  };

};

Headquarter.prototype = new Pawn();
