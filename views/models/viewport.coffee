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
    @rx = rpos.x
    @ry = rpos.y
    @update_map()
    { x: x, y: y }

  center: () =>
    @ax = client.headquarter.ax - @width * @zoom / 2;
    @ay = client.headquarter.ay - @height * @zoom / 2;
    @move_stage(@ax, @ay)
    @rx = client.headquarter.rx - Math.floor(@fieldsVisible * @zoom / 2)
    @ry = client.headquarter.ry - Math.floor(@fieldsVisible * @zoom / 2)
    @update_map()

  move_stage: =>
    client.presenter.stage.setAttrs
      x: -@ax / @zoom
      y: -@ay / @zoom
      scale: 1 / @zoom

  update_map: =>
    @map.render_fields(@rx, @ry, @fieldsVisible * @zoom + 1, @fieldsVisible * @zoom + 1);
    client.presenter.stage.draw()
