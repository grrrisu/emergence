class Pawn

  constructor: (data) ->
    @id        = data.id
    @rx        = data.x
    @ry        = data.y
    apos = client.map.absolutePosition(@rx, @ry)
    @ax        = apos.x
    @ay        = apos.y
    @draggable = true

  checkBoundaries: (pos) =>
    console.log('drag pawn')
    pos

  render: (layer) =>
    @getPresenter().render(layer)
