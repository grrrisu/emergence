require 'bundler/setup'
Bundler.setup

require 'sinatra'
require 'sinatra/reloader'
require 'json'

require File.join(settings.root, 'world')

get '/' do
  send_file "#{settings.root}/index.html", :type => 'text/html'
end

get '/world' do
  content_type :json
  World.new(11).create.to_json
end

get '/test' do
  send_file "#{settings.root}/public/spec/SpecRunner.html", :type => 'text/html'
end
