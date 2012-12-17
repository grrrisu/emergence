require 'bundler/setup'
Bundler.setup

require 'sinatra/base'
require 'sinatra/reloader'
require 'json'

class Application < Sinatra::Base

  require File.join(settings.root, 'server', 'world')
  require File.join(settings.root, 'server', 'headquarter')
  require File.join(settings.root, 'server', 'view')

  configure do
    register Sinatra::Reloader
  end

  set :world, World.new(50, 100).create

  get '/' do
    send_file "#{settings.root}/index.html", :type => 'text/html'
  end

  get '/world' do
    settings.world = World.new(50, 100).create
    redirect to('/')
  end

  get '/view' do
    content_type :json
    hq = Headquarter.new(24, 94)
    hq.create_pawns
    view  = hq.create_view(settings.world)
    view.filter.to_json
  end

  get '/test' do
    send_file "#{settings.root}/public/spec/SpecRunner.html", :type => 'text/html'
  end

  run! if app_file == $0 && !running?

end
