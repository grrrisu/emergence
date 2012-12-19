require 'bundler/setup'
Bundler.setup

require 'sinatra/base'
require 'sinatra/reloader'
require 'json'

class Application < Sinatra::Base

  require File.join(settings.root, 'server', 'level')

  configure do
    register Sinatra::Reloader
  end

  set :level, Level.instance
  set :world, settings.level.create_world
  # TODO
  set :current_user, nil

  get '/' do
    send_file "#{settings.root}/index.html", :type => 'text/html'
  end

  get '/world' do
    settings.world = settings.level.create_world
    redirect to('/')
  end

  get '/init' do
    content_type :json
    hq = settings.current_user = settings.level.initialize_player
    { world:
      {
        width: settings.world.width,
        height: settings.world.height
      },
      headquarter:
      {
        x: hq.x,
        y: hq.y,
        max_view_radius: hq.max_view_radius
      },
      pawns:
      [
        {type: 'base', x: hq.pawns[0].x, y: hq.pawns[0].y},
        {type: 'base', x: hq.pawns[1].x, y: hq.pawns[1].y}
      ]
    }.to_json
  end

  get '/view' do
    content_type :json
    view  = hq.create_view(settings.world)
    view.filter.to_json
  end

  get '/test' do
    send_file "#{settings.root}/public/spec/SpecRunner.html", :type => 'text/html'
  end

  run! if app_file == $0 && !running?

end
