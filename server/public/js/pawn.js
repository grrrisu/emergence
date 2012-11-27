var Pawn = function(){

  this.view_border = 1;

  this.put = function(graphic, x, y){
    var position = Emergence.world.absolutePosition(x,y),
        px = position[0] + this.xOffset,
        py = position[1] + this.yOffset;
    graphic.xOffset = this.xOffset;
    graphic.yOffset = this.yOffset;
    graphic.px = px;
    graphic.py = py;
    graphic.transform("t"+px+","+py);
    graphic.model = this;

    graphic.influence_area = Emergence.paper.circle(position[0] + 28 , position[1] + 28, this.influence_radius)
                                       .attr({stroke: "#ff0000", fill: "#ff0000", opacity: 0.3})
                                       .hide();

    graphic.drag(this.onmove, this.onstart, this.onend);
    graphic.dblclick(function(e){
      $(this.influence_area.node).toggle();
      this.toFront();
    });
  };

  this.onstart = function(x, y, e){
    this.dx = this.dy = 0;
  };

  this.onmove = function(dx, dy, x, y, e){
    this.tx = dx + this.px;
    this.ty = dy + this.py;
    this.transform("t"+this.tx+","+this.ty);
  };

  this.onend = function(e){
    if(this.tx && this.ty){
      var position = Emergence.world.snapToGrid(this.tx, this.ty);
      this.px = position[0]+this.xOffset;
      this.py = position[1]+this.yOffset;
      this.transform("t"+this.px+","+this.py);

      var rposition = Emergence.world.relativePosition(this.px, this.py);
      this.model.fog(rposition[0], rposition[1], 0, this.model.unfog);
      this.influence_area.attr({cx: position[0] + 28, cy: position[1] + 28});
    }
  };

  this.unfog = function(x, y, opacity){
    Emergence.world.field(x, y).fog.attr({'fill-opacity': opacity});
  };

  this.fog = function(x, y, opacity, callback){
    var radius = this.view_radius;
    for(var i = -radius; i <= radius; i++){
      for(var j = -radius; j <= radius; j++){
        if(this.withinRadius(i, j)){
          callback(x+i, y+j, opacity);
        }
      }
    }
  };

  this.withinRadius = function(dx, dy){
    var radius = this.view_radius;
    var border = this.view_border;
    if (dx > radius || dy > radius) return false;
    return (Math.pow(dx,2) + Math.pow(dy,2)) <= (Math.pow(radius, 2) + border);
  };

};
