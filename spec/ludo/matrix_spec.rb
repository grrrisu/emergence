require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Ludo::Matrix do
  before(:each) do
    @matrix = Ludo::Matrix.new 4
  end

  it "should get the dimensions of the matrix" do
    @matrix.size.should == [4,4]
  end

  it "should iterate over the matrix" do
    @matrix.set_each_field do
      1
    end
    @matrix.each_field do |field|
      field.should == 1
    end
  end

  it "should iterate over the matrix with index" do
    all = Array.new(4) { [0,1,2,3] }
    @matrix.each_field_with_index do |field, x, y|
      all[x].delete y
    end
    all.each {|row| row.should be_empty }
  end

  it "should set all fields with index" do
    @matrix.set_each_field_with_index do |x, y|
      [x, y]
    end
    4.times do |x|
      4.times {|y| @matrix[x,y].should == [x,y]}
    end
  end

  it "should set an object to a specific field" do
    @matrix.set_field(1,1,5)
    @matrix.get_field(1,1).should == 5
  end

  it "should set an object to a specific field using []" do
    @matrix[1,2] = 5
    @matrix[1,2].should == 5
  end

  it "should be enumerable" do
    collected = @matrix.collect {|f| f = 1}
    collected.each {|c| c.should == 1 }
  end

  it "should convert to json" do
    @matrix.set_each_field_with_index do |x, y|
      {:x => x, :y => y}
    end
    @matrix.flatten.should have(16).items
  end

  it "should convert to json" do
    @matrix.set_each_field_with_index do |x, y|
      {:x => x, :y => y}
    end
    @matrix.to_json.should be_instance_of(String)
    @matrix.to_json.should include("{\"x\":0,\"y\":0},{\"x\":0,\"y\":1}")
  end

  it "should set a slice" do
    pending
  end

  it "should set a slice with index" do
    pending
  end

end
