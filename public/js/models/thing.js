var Thing = function(image, width, height){

  this.render = function(x, y){
    return new ImagePresenter(image, width, height).render(function(element){
        Emergence.view.element.push(element);
        var placeable = new Placeable(element);
        placeable.move(x, y);
        return placeable;
    });
  };

}
