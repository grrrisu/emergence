var ImagePresenter = function(image, width, height){

  this.render = function(callback){
    var element = Client.paper.image("/images/"+image, -width/2, -height/2, width, height);
    return callback(element);
  };

};
