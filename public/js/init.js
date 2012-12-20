var Client = {
  paper:        null,
  api:          new ApiCaller(),
  map:          new Map(),
  headquarter:  new Headquarter(),
  viewport:     new Viewport(),
  init :  function(width){
    Client.paper = Raphael('prawns', width, width);

    Client.fetch(function(data){
      Client.map.render(data.world);
      Client.viewport.render(data.world);
      Client.headquarter.render(data.headquarter);
      data.headquarter.pawns.each(function(pawn_data){
        new Population().render(pawn_data);
      });
      Client.viewport.center();
    });

    // Client.view = new View(width);
    // Client.view.fetch(function(data){
    //   Client.view.render();

    //   var banana = new Thing('banana.png', 40, 40).render(3,5);
    //   var gazelle = new Thing('gazelle.png', 38, 45).render(3,4);
    //   var lion = new Thing('lion2.png', 45, 34).render(4,4);
    //   var meat = new Thing('meat.png', 40, 23).render(5,4);
    //   var hyena = new Thing('hyena3.png', 40, 37).render(6,4);
    //   var leopard = new Thing('leopard3.png', 45, 31).render(3,6);
    //   var rabbit = new Thing('rabbit.png', 27, 30).render(4,6);

    //   Client.viewport = new Viewport(width);

    //   var hq = new Headquarter().render(3, 3);
    //   var population1 = new Population().render(2, 3);
    //   var population2 = new Population().render(4, 3);
    // });
  },

  fetch: function(callback){
    Client.api.get('/init', function(data, status, xhr){
      callback(data);
    });
  }

};

$(document).ready(function(){
  Client.init(605);

  $('#center_view').on('click', function(e){
    Client.viewport.center();
    return false;
  });

});
