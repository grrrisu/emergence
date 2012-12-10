var ImagePresenter = function(image, width, height){

  this.render = function(callback){
    var element = Emergence.paper.image("/images/"+image, -width/2, -height/2, width, height);
    callback(element);
  };

};
