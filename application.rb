require 'bundler/setup'
Bundler.setup

require 'sinatra'
require 'sinatra/reloader'
require 'json'

require File.join(settings.root, 'server', 'world')
require File.join(settings.root, 'server', 'headquarter')
require File.join(settings.root, 'server', 'view')

get '/' do
  send_file "#{settings.root}/index.html", :type => 'text/html'
end

get '/world' do
  content_type :json
  world = World.new(50, 100).create
  hq = Headquarter.new(24, 94)
  hq.create_pawns
  view  = hq.create_view(world)
  view.to_json
end

get '/test' do
  send_file "#{settings.root}/public/spec/SpecRunner.html", :type => 'text/html'
end
