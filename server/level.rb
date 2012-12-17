require 'singleton'

require_relative 'world'
require_relative 'headquarter'
require_relative 'view'

# Level 1.0
# 50 x 100 fields
# 5 Zones:
# * bot dropzone 2    ( 0 - 19)
# * gateway zone      (20 - 39)
# * transit           (40 - 59)
# * players dropzone  (60 - 79)
# * bot dropzone 1    (80 - 99)
class Level
  include Singleton

  def create_world
    World.new(50, 100).create
  end

  def initialize_player
    hq = Headquarter.new(24, 70)
    hq.create_pawns
    hq
  end

end
