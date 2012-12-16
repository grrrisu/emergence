var FieldPresenter = function(width){

  this.render = function(data, x, y){
    var ground = Emergence.paper.rect(x * width, y * width, width, width)
                      .attr({
                        "stroke-width": 1,
                        stroke: '#444',
                        fill: this.pattern(data),
                        "fill-opacity": 1
                      });

    ground.click(function(event, x, y){
      console.log('field', event, x, y);
    });

    return ground;
  };

  this.pattern = function(data){
    if(data === null) return "url('/images/fog2-1.png')";
    switch(data.vegetation){
      case 0:
        return "url('images/0_desert4.png')"; // "#F8D76D"; //
      case 1:
        return "url('images/1_grass4.png')"; //"#DBB253";
      case 2:
        return "url('images/2_grass4.png')"; // "#A3AE45";
      case 3:
        return "url('images/3_grass4.png')"; // "#94CB54";
      case 5:
        return "url('images/5_grass4.png')"; // "#2EB24B";
      case 8:
        return "url('images/8_forest4.png')"; //"#35942A"; //
      case 13:
        return "url('images/13_forest4.png')"; // "#296134"; //115A00
    }
  };

};
