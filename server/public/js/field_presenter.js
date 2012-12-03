var FieldPresenter = function(width){

  this.render = function(data, x, y){
    var ground = Emergence.paper.rect(x * width, y * width, width, width)
                      .attr({
                        "stroke-width": 1,
                        stroke: '#ccc',
                        fill: this.pattern(data),
                        "fill-opacity": 1
                      });
    ground.fog = Emergence.paper.rect(x * width, y * width, width, width)
                      .attr({
                        fill: "url('/images/fog2-1.png')",
                        "fill-opacity": 1
                      });

    ground.fog.clear_up = function(){
      this.attr({'fill-opacity': 0});
    };

    ground.click(function(event, x, y){
      console.log('field', event, x, y);
    });

    ground.fog.click(function(event, x, y){
      console.log('fog', event, x, y);
    });

    return ground;
  };

  this.pattern = function(data){
    switch(data){
      case 0:
        return "url('images/0_desert.png')"; // "#F8D76D"; //
      case 1:
        return "url('images/1_grass.png')"; //"#DBB253";
      case 2:
        return "url('images/2_grass.png')"; // "#A3AE45";
      case 3:
        return "url('images/3_grass.png')"; // "#94CB54";
      case 5:
        return "url('images/5_grass.png')"; // "#2EB24B";
      case 8:
        return "url('images/8_forest.png')"; //"#35942A"; //
      case 13:
        return "url('images/13_forest.png')"; // "#296134"; //
    }
  };

};
