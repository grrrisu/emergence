var Grapher = function(width, height){

  var self = this,
      image_sources = {
        'fog': 'images/fog3.png',
        '0_desert': 'images/0_desert4.png',
        '1_grass': 'images/1_grass4.png',
        '2_grass': 'images/2_grass4.png',
        '3_grass': 'images/3_grass4.png',
        '5_grass': 'images/5_grass4.png',
        '8_forest': 'images/8_forest4.png',
        '13_forest': 'images/13_forest4.png'
      };

  this.stage = null;
  this.layer = null;
  this.zoom  = 1;

  this.width = function(){
    return this.stage.getWidth();
  }

  this.height = function(){
    return this.stage.getHeight();
  }

  this.init = function(){
    this.preload_images(image_sources, Client.render);
    return this;
  };

  this.preload_images = function(sources, callback){
    this.images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      this.images[src] = new Image();
      this.images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback();
        }
      };
      this.images[src].src = sources[src];
    }
  };

  this.render_stage = function(){
    this.stage = new Kinetic.Stage({
      container: 'prawns',
      width: width,
      height: height,
      fill: 'red',
      draggable: true,
      dragBoundFunc: function(pos){
        return self.checkBoundaries(pos);
      }
    });

    this.stage.on('dragend', function(event){
      Client.map.update();
    });

    this.layer = new Kinetic.Layer();
    this.stage.add(this.layer);
  }

  this.checkBoundaries = function(pos){
    return {x: pos.x, y: pos.y};
    var x = pos.x,
        y = pos.y;
    if(x > 0){
      x = 0;
    } else if(x < -Client.map.getWidth() / this.zoom + this.stage.getWidth()){
      x = -Client.map.getHeight() / this.zoom + this.stage.getHeight();
    }

    if(y > 0){
      y = 0;
    } else if(y < -Client.map.getWidth() / this.zoom + this.stage.getWidth()){
      y = -Client.map.getHeight() / this.zoom + this.stage.getHeight();
    }
    return { x: x, y: y };
  };

  this.setZoom = function(zoom){
    this.zoom = zoom;
    this.apply();
    this.layer.draw();
  }

  this.center = function(){
    pos = Client.map.absolutePosition(24, 70);
    this.x = pos[0] - this.getWidth() * this.zoom / 2;
    this.y = pos[1] - this.getHeight * this.zoom / 2;
    //this.x = Client.headquarter.pawn.ax - Client.grapher.width() * this.zoom / 2;
    //this.y = Client.headquarter.pawn.ay - Client.grapher.height() * this.zoom / 2;
    this.apply();
    Client.map.update();
  };

  this.apply = function(){
    this.stage.setAttrs({
      x: -model.x * 1/model.zoom,
      y: -model.y * 1/model.zoom,
      scale: 1 / model.zoom
    });
  }

  this.drawPosition = function(ax, ay){
    return {
      x: this.stage.getX() + ax,
      y: this.stage.getY() + ay
    }
  }

  this.init();

};
