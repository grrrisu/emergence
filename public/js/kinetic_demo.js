var KineticDemo = {

  init: function(width){
    var pattern = new Image();
    pattern.onload = function(){
      KineticDemo.render(this, width);
    };
    pattern.src = 'images/0_desert4.png';
  },

  render: function(pattern, width){
    var stage = new Kinetic.Stage({
      container: 'prawns',
      width: width,
      height: width
    });

    var layer = new Kinetic.Layer({
      draggable: true
    });

    for(var i = 0; i < 50; i++){
      for(var j = 0; j < 50; j++){
        var rect = new Kinetic.Rect({
          x: i * 15,
          y: j * 15,
          width: 15,
          height: 15,
          fill: {image: pattern},
          stroke: 'black',
          strokeWidth: 0.75
        });
        // add the shape to the layer
        layer.add(rect);
      }
    }
    layer.draw();

    // add the layer to the stage
    stage.add(layer);
  }

}
