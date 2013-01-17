class Viewport

  constructor: (@width, @fieldsVisible, @map) ->
    @zoom   = 1
    @height = @width
    @map.setFieldWidth(@width / @fieldsVisible)

  setZoom: (zoom) =>
    @zoom = zoom
    client.presenter.stage.setAttrs
      scale: 1 / @zoom

  checkBoundaries: (pos) =>
    x = pos.x
    y = pos.y
    if x > 0
      x = 0;
    else if x < -@map.width / @zoom + @width
      x = -@map.width / @zoom + @width

    if y > 0
      y = 0
    else if y < -@map.height / @zoom + @height
      y = -@map.height / @zoom + @height

    @ax = -x
    @ay = -y
    rpos = @map.relativePosition(@ax * @zoom, @ay * @zoom)
    @update_map(rpos.x, rpos.y)
    { x: x, y: y }

  center: () =>
    pos = @map.absolutePosition(24, 70);
    x = pos.x - @width * @zoom / 2;
    y = pos.y - @height * @zoom / 2;
    #this.x = Client.headquarter.pawn.ax - Client.grapher.width() * this.zoom / 2;
    #this.y = Client.headquarter.pawn.ay - Client.grapher.height() * this.zoom / 2;
    @move_stage(x, y)
    @update_map(24 - Math.floor(@fieldsVisible * @zoom / 2), 70 - Math.floor(@fieldsVisible * @zoom / 2))

  move_stage: (ax, ay) =>
    client.presenter.stage.setAttrs
      x: -ax / @zoom
      y: -ay / @zoom
      scale: 1 / @zoom

  update_map: (rx, ry) =>
    @map.render_fields(rx, ry, @fieldsVisible * @zoom + 1, @fieldsVisible * @zoom + 1);
