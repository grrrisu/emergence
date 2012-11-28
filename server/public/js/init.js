var Emergence = {
  paper:      null,
  api:        new ApiCaller(),
  world:      null,
  init :  function(width){
    Emergence.paper = Raphael('prawns', width, width);
    Emergence.world = new World(width);
    Emergence.world.fetch(function(data){
      Emergence.world.render();
      var hq = new Headquarter().render(5, 5);
      var population1 = new Population().render(4, 5);
      var population2 = new Population().render(6, 5);
    });
  }
};

$(document).ready(function(){
  Emergence.init(605);
});
