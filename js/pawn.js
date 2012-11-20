var Pawn = function(){

  this.put = function(graphic, x, y){
    var position = Emergence.world.absolutePosition(x,y),
        px = position[0] + this.xOffset,
        py = position[1] + this.yOffset;
    graphic.drag(this.onmove, this.onstart, this.onend);
    graphic.xOffset = this.xOffset;
    graphic.yOffset = this.yOffset;
    graphic.px = px;
    graphic.py = py;
    graphic.transform("t"+px+","+py);
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
    var position = Emergence.world.snapToGrid(this.tx, this.ty);
    this.px = position[0]+this.xOffset;
    this.py = position[1]+this.yOffset;
    this.transform("t"+this.px+","+this.py);
  };

};
