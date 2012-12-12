var Viewport = function(view_element, width) {

  this.init = function() {
    var element = Emergence.paper.rect(0, 0, width, width).attr({
      fill: '#fff',
      opacity: 0
    });

    element.drag(this.onmove, this.onstart, this.onend);
    element.view = view_element;
    element.toFront();

  };

  // --- dragging ---

  this.onstart = function(x, y, e){
    console.log('viewport start');
    this.dx = this.dy = 0;
  };

  this.onmove = function(dx, dy, x, y, e){
    console.log(dx, dy);
    //this.tx = dx + this.model.ax;
    //this.ty = dy + this.model.ay;
    this.view.transform("t"+dx+","+dy);
  };

  this.onend = function(e){
    console.log("viewport end");
  };

  this.init();

};
