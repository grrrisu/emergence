class Headquarter extends Pawn

  constructor: (data) ->
    @presenter        = new ImagePresenter(this)
    @view_radius      = 2
    @influence_radius = 2
    @secure_radius    = 2
    @image            = client.images['headquarter']
    super(data)

  getPresenter: () =>
    @presenter
