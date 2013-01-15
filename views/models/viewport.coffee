class Viewport

  constructor: (@width, @fieldsVisible, @map) ->
    @zoom   = 1
    @height = @width
    @map.setFieldWidth(@width / @fieldsVisible)

  setZoom: (zoom) =>
    @zoom = zoom

  checkBoundaries: (pos) =>
    console.log('checkBounderies')
    pos

  center: () =>
