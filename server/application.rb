require 'sinatra'
require 'sinatra/reloader'

get '/' do
  send_file "#{settings.root}/index.html", :type => 'text/html'
end

get '/test' do
  send_file "#{settings.root}/public/spec/SpecRunner.html", :type => 'text/html'
end
