require_relative '../ludo/matrix'
require_relative 'builders/world_builder'

class World < Ludo::Matrix

  def create
    options = {}
    builder = WorldBuilder.new(self)
    builder.create(options)
    self
  end

end
