require 'em-websocket'

clients = []

EventMachine::WebSocket.start(host: 'localhost', port: 8080) do |ws|

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
