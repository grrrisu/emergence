class StagePresenter

  constructor: (@viewport) ->

  render: =>
    @stage = new Kinetic.Stage
      container: 'prawns'
      width: @viewport.width
      height: @viewport.height
      fill: 'red'
      draggable: true
      dragBoundFunc: (pos) =>
        @viewport.checkBoundaries(pos)

    @stage.on 'dragend', (event) ->
      #Client.map.update();

    @layer = new Kinetic.Layer()
    @stage.add(@layer)
