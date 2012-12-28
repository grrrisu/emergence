require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Headquarter do

  before(:each) do
    @headquarter = Headquarter.new(5,5)
  end

  describe "create view" do

    before(:each) do
      @headquarter.pawns << Pawn.new(4,5)
      world       = World.new(11).create
      @view = @headquarter.create_view(world)
    end

    it "with size of 11" do
      @view.size.should == [11,11]
    end

    it "at position 2,2" do
      @view.x.should == 0
      @view.y.should == 0
    end

    it "has set visability" do
      @view[2,2].should == 0  # outside of any view
      @view[5,5].should == 2  # hq & pawn
      @view[6,6].should == 1  # only hq
    end

  end

end
