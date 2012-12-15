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

    it "with size of 7" do
      @view.size.should == [7,7]
    end

    it "at position 2,2" do
      @view.x.should == 2
      @view.y.should == 2
    end

    it "has set visability" do
      @view[0,0].should == 0  # outside of any view
      @view[3,3].should == 2  # hq & pawn
      @view[4,4].should == 1  # only hq
    end

  end

end
