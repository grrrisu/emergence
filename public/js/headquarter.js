var Headquarter = function(){

  this.render = function(x, y){
    return new ImagePresenter('Raratonga_Mask.gif', 40, 40).render(function(element){
      var pawn = new Pawn(element);
      pawn.view_radius = 2;
      pawn.influence_radius = 138;
      Emergence.hq = pawn;
      pawn.put(x, y);
      pawn.view(x, y, pawn.unfog);
      return pawn;
    });
  };

};
