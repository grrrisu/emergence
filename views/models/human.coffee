class Human extends Pawn

  constructor: (data) ->
    @presenter        = new ImagePresenter(this)
    @view_radius      = 1
    @influence_radius = 1
    @type             = data.type
    @image            = client.images['man']
    super(data)

  getPresenter: () =>
    @presenter
