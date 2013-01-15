class Viewport

  constructor: (@width, @fieldsVisible) ->
    @zoom = 1

  setWorldSize: (size) =>
    @worldWidth   = size.width
    @worldHeight  = size.height

  setZoom: (zoom) =>
    @zoom = zoom

  checkBounderies: (pos) =>
    console.log('checkBounderies')
    pos

  center: () =>
