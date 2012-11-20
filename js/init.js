var Emergence = {
  paper:      null,
  world:      null,
  init :  function(width, dimension){
    Emergence.paper = Raphael('matrix', width, width);
    Emergence.world = new World(width, dimension);
    Emergence.world.render();
    var hq = new Headquarter().render(5, 5);
    var population1 = new Population().render(4, 4);
    var population2 = new Population().render(6, 5);
  }
};

$(document).ready(function(){
  Emergence.init(605, 11);
});
