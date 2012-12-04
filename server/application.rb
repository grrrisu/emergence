require 'sinatra'
require 'sinatra/reloader'
require 'json'

require 'sinatra-websocket'

set :server, 'thin'

clients = []
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

get '/websocket' do
  send_file "#{settings.root}/websocket.html", :type => 'text/html'
end

get '/websocket2' do
  unless request.websocket?
    send_file "#{settings.root}/websocket.html", :type => 'text/html'
  else
    request.websocket do |ws|

      ws.onopen do
        clients << ws
        puts 'client connected'
      end

      ws.onmessage do |message|
        puts message
        clients.each do |client|
          client.send message
        end
      end

      ws.onclose do
        puts "client closed"
      end

    end
  end
end
