class ImagePresenter

  constructor: (@model) ->

  render: (layer) =>
    console.log(@model.ax, @model.image, @model.image.width)
    @image = new Kinetic.Image
      x: @model.ax
      y: @model.ay
      image: @model.image
      width: @model.image.width
      height: @model.image.height
      draggable: @model.draggable
      dragBoundFunc: (pos) =>
        @model.checkBoundaries(pos)

    layer.add(@image)
    @image.moveToTop()
    layer.draw

