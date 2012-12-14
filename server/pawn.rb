class Pawn

  attr_accessor :x, :y, :view_radius

  def initialize x, y
    @view_radius = 1
    @x, @y       = x, y
  end

end
