var Grapher = function(width, height){

  var self = this,
      image_sources = {
        '0_desert': 'images/0_desert4.png',
        '1_grass': 'images/1_grass4.png',
        '2_grass': 'images/2_grass4.png',
        '3_grass': 'images/3_grass4.png',
        '5_grass': 'images/5_grass4.png',
        '8_forest': 'images/8_forest4.png',
        '13_forest': 'images/13_forest4.png'
      };

  this.stage = null;

  this.init = function(){
    this.preload_images(image_sources, this.render);
    return this;
  };

  this.preload_images = function(sources, callback){
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        console.log(loadedImages, numImages);
        if(++loadedImages >= numImages) {
          console.log('callback');
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  };

  this.render = function(){
    self.stage = new Kinetic.Stage({
      container: 'prawns',
      width: width,
      height: height
    });
  };

  this.init();

};
