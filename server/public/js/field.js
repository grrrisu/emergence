var Field = function(width){

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
        return "#F8D76D"; // "images/0_desert.png";
      case 1:
        return "#DBB253"; // "images/1_grass.png";
      case 2:
        return "#A3AE45"; // "images/2_grass.png";
      case 3:
        return "#94CB54"; // "images/3_grass.png";
      case 5:
        return "#2EB24B"; //"images/5_grass.jpeg";
      case 8:
        return "#35942A"; //"images/8_forest.jpeg";
      case 13:
        return "#296134"; // "images/13_forest.jpeg";
    }
  };

};
