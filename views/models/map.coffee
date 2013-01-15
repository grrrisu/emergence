class Map

  constructor: () ->
    @presenter  = new MapPresenter(this)

  setFieldWidth: (width) =>
    @fieldWidth = width

  setWorldSize: (size) =>
    @worldWidth   = size.width
    @worldHeight  = size.height

  mapWidth: =>
    @worldWidth * @fieldWidth

  mapHeight: =>
    @worldHeight * @fieldWidth

  fetch: () =>

  render: (layer) =>
    @presenter.render(layer)

  render_fields: () =>
