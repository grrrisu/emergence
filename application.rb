require 'bundler/setup'
Bundler.setup

require 'sinatra/base'
require 'sinatra/reloader'
require 'json'
require 'rack/coffee'
require "better_errors"

class Application < Sinatra::Base

  use Rack::Coffee,
      root: settings.root + '/views',
      urls: '/',
      bare: true

  configure :development do
    use BetterErrors::Middleware
    BetterErrors.application_root = File.expand_path("..", __FILE__)
  end

  require File.join(settings.root, 'server', 'level')

  configure do
    register Sinatra::Reloader
  end

  set :level, Level.instance
  set :world, settings.level.create_world
  # TODO
  set :current_user, nil
  set :current_view, nil

  get '/' do
    send_file "#{settings.root}/index.html", :type => 'text/html'
  end

  get '/world' do
    settings.world = settings.level.create_world
    redirect to('/')
  end

  post '/init' do
    content_type :json
    hq    = settings.current_user = settings.level.initialize_player
    view  = settings.current_view = hq.create_view(settings.world, View)
    { world:
      {
        width: settings.world.width,
        height: settings.world.height
      },
      headquarter:
      {
        x: hq.x,
        y: hq.y,
        id: hq.id,
        pawns:
        [
          {id: hq.pawns[0].id, type: 'base', x: hq.pawns[0].x, y: hq.pawns[0].y},
          {id: hq.pawns[1].id, type: 'base', x: hq.pawns[1].x, y: hq.pawns[1].y}
        ]
      }
    }.to_json
  end

  post '/view' do
    content_type :json
    settings.current_view.filter_slice(params[:x].to_i, params[:y].to_i, params[:width].to_i, params[:height].to_i).to_json
  end

  post '/move' do
    content_type :json
    position = settings.current_user.move(params[:id].to_i, params[:x].to_i, params[:y].to_i)
    position.to_json
  end

  get '/test' do
    send_file "#{settings.root}/public/spec/SpecRunner.html", :type => 'text/html'
  end

  run! if app_file == $0 && !running?

end
