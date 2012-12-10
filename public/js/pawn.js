var Pawn = function(element){

  this.view_border = 1;

  this.put = function(rx, ry){
    this.move(rx, ry);
    this.element.model = this;

    this.element.influence_area = Emergence.paper.circle(this.ax , this.ay, this.influence_radius)
                                       .attr({stroke: "#ff0000", fill: "#ff0000", opacity: 0.3})
                                       .hide();

    this.element.drag(this.onmove, this.onstart, this.onend);
    this.element.dblclick(function(e){
      $(this.influence_area.node).toggle();
      this.toFront();
    });

  };

  this.onstart = function(x, y, e){
    this.dx = this.dy = 0;
  };

  this.onmove = function(dx, dy, x, y, e){
    this.tx = dx + this.model.ax;
    this.ty = dy + this.model.ay;
    this.transform("t"+(this.tx+this.model.offset)+","+(this.ty+this.model.offset));
  };

  this.onend = function(e){
    if(this.tx && this.ty){
      var rposition = Emergence.world.relativePosition(this.tx, this.ty);
      this.model.move(rposition[0], rposition[1]);
      // TODO move this to lines to pawn move function
      this.model.view(this.model.rx, this.model.ry, this.model.unfog);
      this.influence_area.attr({cx: this.model.ax, cy: this.model.ay});
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

  this.init(element);

};

Pawn.prototype = new Placeable();
