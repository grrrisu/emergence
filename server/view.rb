require_relative '../ludo/matrix'

# the view acts as a filter on the partial of the world
# everything not
class View < Ludo::Matrix

  # field properties
  # count: how many pawns have this field in their view range

  attr_accessor :world, :x, :y, :user_id

  def initialize world, x, y, width
    super width
    @world = world
    # left top position of the view on the world
    @x, @y = x, y
  end

  def visible?(x,y)
    self[x,y].to_i > 0
  end

  def filter
    @w ||= Ludo::Matrix.new(width)
    @w.set_each_field_with_index do |x, y|
      visible?(x,y) ? @world[@x + x, @y + y] : nil
    end
    @w
  end

  def set pawn
    rx, ry = pawn.x - x, pawn.y - y
    (-pawn.view_radius..pawn.view_radius).each do |j|
      (-pawn.view_radius..pawn.view_radius).each do |i|
        if View.within_radius(i, j, pawn.view_radius)
          current = self[rx + i, ry + j].to_i
          self[rx + i, ry + j] = current + 1
        end
      end
    end
  end

  def self.within_radius dx, dy, radius, border = 1
    return false if dx > radius || dy > radius
    (dx**2 + dy**2) <= (radius**2 + border)
  end

end