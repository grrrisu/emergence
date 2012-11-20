var Field = function(width){

  this.render = function(x, y){
    field = Emergence.paper.rect(x * width, y * width, width, width)
                      .attr({
                        "stroke-width": 1,
                        stroke: '#ccc',
                        fill: '#00bb3f',
                        "fill-opacity": 1
                      });
    field.click(function(event, x, y){
      console.log('field', event, x, y);
    });
  };

  function on_click(x, y, event){
    console.log('onClick', x, y, event);
  };

};
