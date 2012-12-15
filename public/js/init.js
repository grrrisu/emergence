var Emergence = {
  paper:      null,
  api:        new ApiCaller(),
  view:       null,
  viewport:   null,
  init :  function(width){
    Emergence.paper = Raphael('prawns', width, width);
    Emergence.view = new View(width);
    Emergence.view.fetch(function(data){
      Emergence.view.render();

      var banana = new Thing('banana.png', 40, 40).render(3,5);
      var gazelle = new Thing('gazelle.png', 38, 45).render(3,4);
      var lion = new Thing('lion2.png', 45, 34).render(4,4);
      var meat = new Thing('meat.png', 40, 23).render(5,4);
      var hyena = new Thing('hyena3.png', 40, 37).render(6,4);
      var leopard = new Thing('leopard3.png', 45, 31).render(3,6);
      var rabbit = new Thing('rabbit.png', 27, 30).render(4,6);

      Emergence.viewport = new Viewport(width);

      var hq = new Headquarter().render(3, 3);
      var population1 = new Population().render(2, 3);
      var population2 = new Population().render(4, 3);
    });
  }
};

$(document).ready(function(){
  Emergence.init(605);

  $('#center_view').on('click', function(e){
    Emergence.viewport.center();
    return false;
  });

});
