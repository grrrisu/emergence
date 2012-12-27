var Headquarter = function(){

  var self = this;

  this.pawn = null;

  this.render = function(data){
    this.id = data.id;
    return new ImagePresenter('Raratonga_Mask.gif', 40, 40).render(function(element){
      self.pawn = new Pawn(element);
      self.pawn.model = self;
      self.pawn.view_radius = 2;
      self.pawn.influence_radius = 138;
      self.pawn.put(data.x, data.y);
      return self.pawn;
    });
  };

};
