class Map

  constructor: (@viewport) ->
    @fieldWidth = @viewport.width / @viewport.fieldsVisible

  fetch: () =>

  render: () =>
    console.log('map render')

  render_fields: () =>
