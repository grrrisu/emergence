class Client

  constructor: (width) ->
    @api = new ApiCaller()
    @viewport = new Viewport(width)

  render: () ->

