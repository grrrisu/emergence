var Pawn = function(){

  this.view_border = 1;

  this.put = function(graphic, x, y){

    // x, y absolute Position
    graphic.setPosition = function(x, y){
      this.px = x + this.xOffset;
      this.py = y + this.yOffset;
      this.transform("t"+this.px+","+this.py);
    };

    var position = Emergence.world.absolutePosition(x,y);
    graphic.xOffset = this.xOffset;
    graphic.yOffset = this.yOffset;
    graphic.setPosition(position[0], position[1]);
    graphic.model = this;

    var ia_offset = Emergence.world.fieldWidth / 2;
    graphic.influence_area = Emergence.paper.circle(position[0] + ia_offset , position[1] + ia_offset, this.influence_radius)
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
      this.setPosition(position[0], position[1]);

      var rposition = Emergence.world.relativePosition(this.px, this.py);
      this.model.view(rposition[0], rposition[1], this.model.unfog);

      var ia_offset = Emergence.world.fieldWidth / 2;
      this.influence_area.attr({cx: position[0] + ia_offset, cy: position[1] + ia_offset});
    }
  };

  this.unfog = function(x, y){
    Emergence.world.field(x, y).fog.clear_up();
  };

  this.view = function(x, y, callback){
    var radius = this.view_radius;
    for(var i = -radius; i <= radius; i++){
      for(var j = -radius; j <= radius; j++){
        if(this.withinRadius(i, j)){
          callback(x+i, y+j);
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
