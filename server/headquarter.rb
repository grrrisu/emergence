require_relative 'pawn'

class Headquarter < Pawn

  attr_accessor :pawns, :view

  def initialize x, y
    super x, y
    self.view_radius = 2
    @pawns = []
  end

  def max_view_radius
    pawn_radius = pawns.max_by{|p| p.view_radius }.view_radius
    view_radius + pawn_radius
    # self.view = View.new(world, x - r, y - r, r * 2 + 1)
  end

  def create_view(world, view_sector_size)
    self.view = AdminView.new(world, 0, 0, world.width, world.height)
    view.set(self)
    pawns.each {|p| view.set(p) }
    view
  end

  def create_pawns
    @pawns << Pawn.new(x+1, y)
    @pawns << Pawn.new(x-1, y)
  end

end
