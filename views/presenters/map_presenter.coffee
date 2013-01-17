class MapPresenter

  constructor: (@model) ->

  render: (layer) =>
    @fog   = new Kinetic.Rect
      width: @model.mapWidth()
      height: @model.mapHeight()
      fill:
        image: client.images['fog']
      stroke: 'black'
      strokeWidth: 1

    layer.add(@fog);
    layer.draw()
    @fog
