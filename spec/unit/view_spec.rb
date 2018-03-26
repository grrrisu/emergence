require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe View do

  before(:each) do
    world = World.new(8, 8, 'w')
    @view = View.new(world, 0, 0, 5)
  end

  it 'should detect wihtin radius' do
    View.within_radius(1,1,2).should be true
    View.within_radius(2,2,2).should be false
    View.within_radius(1,2,2).should be true
    View.within_radius(1,2,2,0).should be false
  end

  describe 'with pawn' do

    before(:each) do
      pawn = Pawn.new(1,1)
      @view.unfog(pawn)
    end

    it "should set pawns visibility" do
      expected = [[1, 1, 1, 0, 0], [1, 1, 1, 0, 0], [1, 1, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
      @view.fields.should eq(expected)
    end

    it "should filter pawns visibility to world" do
      expected = [['w', 'w', 'w', nil, nil], ['w', 'w', 'w', nil, nil], ['w', 'w', 'w', nil, nil], [nil, nil, nil, nil, nil], [nil, nil, nil, nil, nil]]
      @view.filter.to_json.should eq(expected.to_json)
    end

  end

end
