class Client

  image_sources =
    'fog': 'images/fog3.png'
    '0_desert': 'images/0_desert4.png'
    '1_grass': 'images/1_grass4.png'
    '2_grass': 'images/2_grass4.png'
    '3_grass': 'images/3_grass4.png'
    '5_grass': 'images/5_grass4.png'
    '8_forest': 'images/8_forest4.png'
    '13_forest': 'images/13_forest4.png'

  constructor: (width) ->
    fieldsVisible = 11
    @api          = new ApiCaller('http://localhost:4567')
    @viewport     = new Viewport(width, fieldsVisible)
    @map          = new Map(@viewport)
    @presenter    = new StagePresenter(@viewport)

  fetch: (callback) =>
    @api.post '/init', null, (data) =>
      @viewport.setWorldSize(data.world)
      callback()

  preload_images: (sources, callback) =>
    @images = {};
    loadedImages = 0;
    numImages = 0;
    # get num of sources
    for src of sources
      numImages++

    for src of sources
      @images[src] = new Image()
      @images[src].onload = () =>
        callback() if ++loadedImages >= numImages
      @images[src].src = sources[src]

  render: () =>
    @preload_images image_sources, () =>
      @fetch () =>
        @presenter.render()
        @map.render()
