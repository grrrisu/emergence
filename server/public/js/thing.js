var Thing = function(image, width, height){

  this.render = function(x, y){
    var self = this;
    this.xOffset = 8;
    this.yOffset = 8;

    this.view_radius = 2;
    this.influence_radius = 138;

    lion = Emergence.paper.image("/images/"+image, 0, 0,width, height);
    this.put(lion, x, y);
  };

};

Thing.prototype = new Pawn();
