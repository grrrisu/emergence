class Map

  constructor: () ->
    @presenter      = new MapPresenter(this)
    @fieldPresenter = new FieldPresenter(this)

  setFieldWidth: (width) =>
    @fieldWidth = width

  setWorldSize: (size) =>
    @worldWidth   = size.width
    @worldHeight  = size.height

  mapWidth: =>
    @width = @worldWidth * @fieldWidth

  mapHeight: =>
    @height = @worldHeight * @fieldWidth

  fetch: () =>

  render: (layer) =>
    @presenter.render(layer)

  render_fields: () =>
    console.log('render fields')

  # --- position helpers ---

  # this.field = function(x, y){
  #   var x_dimension = this.fields[0].length;
  #   var y_dimension = this.fields.length;
  #   if(x < 0) x = x_dimension + x;
  #   if(y < 0) y = y_dimension + y;
  #   if(x >= x_dimension) x = x - x_dimension;
  #   if(y >= y_dimension) y = y - y_dimension;
  #   return this.getField(x,y);
  # };

  relativePosition: (ax, ay) =>
    rx = ((ax - @fieldWidth / 2) / @fieldWidth).round()
    ry = ((ay - @fieldWidth / 2) / @fieldWidth).round()
    {x: rx, y: ry}

  absolutePosition: (rx, ry) =>
    ax = rx * @fieldWidth + (@fieldWidth / 2)
    ay = ry * @fieldWidth + (@fieldWidth / 2)
    {x: ax, y: ay}

  snapToGrid: (ax, ay) =>
    position = @relativePosition(ax, ay)
    @absolutePosition(position.x, position.y)
