var FieldPresenter = function(width){

  this.render = function(data, x, y){
    var ground = null;
    if(data !== null){
      ground = new Kinetic.Rect({
        x: x * width,
        y: y * width,
        width: width,
        height: width,
        fill: {image: Client.grapher.images[this.pattern(data)]},
        stroke: 'black',
        strokeWidth: 1
      });

      Client.viewport.layer.add(ground);

      // ground.click(function(event, x, y){
      //   console.log('field', event, x, y);
      // });
    }
    return ground;
  };

  this.pattern = function(data){
    switch(data.vegetation){
      case 0:
        return "0_desert"; // "#F8D76D"; //
      case 1:
        return "1_grass"; //"#DBB253";
      case 2:
        return "2_grass"; // "#A3AE45";
      case 3:
        return "3_grass"; // "#94CB54";
      case 5:
        return "5_grass"; // "#2EB24B";
      case 8:
        return "8_forest"; //"#35942A"; //
      case 13:
        return "13_forest"; // "#296134"; //115A00
    }
  };

};
