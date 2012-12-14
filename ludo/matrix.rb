require 'json'

module Ludo
  class Matrix
    include Enumerable

    def initialize columns, rows = nil
      rows = columns unless rows
      @matrix = Array.new(rows) {Array.new(columns)}
    end

    # size of matrix [x,y]
    def size
      [width, height]
    end

    def width
      @matrix.first.size
    end

    def height
      @matrix.size
    end

    def each_field
      @matrix.each do |row|
        row.each {|field| yield field}
      end
    end

    alias each each_field

    def each_field_with_index
      @matrix.each_with_index do |row, y|
        row.each_with_index {|field, x| yield field, x, y}
      end
    end

    def set_each_field
      @matrix.each_with_index do |row, y|
        row.each_with_index {|field, x| @matrix[x][y] = yield}
      end
    end

    def set_each_field_with_index
      @matrix.each_with_index do |row, y|
        row.each_with_index {|field, x| @matrix[x][y] = yield x, y}
      end
    end

    def set_slice x, y, width, height = nil
      height = width unless height
      height.times do |j|
        width.times do |i|
          set_field(x + i, y + j, yield)
        end
      end
    end

    def set_slice_with_index x, y, width, height = nil
      height = width unless height
      height.times do |j|
        width.times do |i|
          set_field(x + i, y + j, yield(x + i, y + j))
        end
      end
    end

    def get_field x, y
      @matrix[x][y]
    end
    # matrix[1,0] #=> value
    alias [] get_field

    def set_field x, y, value
      @matrix[x][y] = value
    end
    # matrix[1,0] = value
    alias []= set_field

    def flatten
      @matrix.flatten
    end

    def to_json
      flatten.to_json
    end

    # def inspect
    #   output = "\n"
    #   (height-1).downto(0) do |y|
    #       0.upto(width-1) {|x| output += '-'*10}
    #       output += "-\n"
    #       0.upto(width-1) {|x| output += "| #{field_as_string(x, y, :resource).rjust(7)} "}
    #       output += "|\n"
    #       0.upto(width-1) {|x| output += "| #{field_as_string(x, y, :population).rjust(7)} "}
    #       output += "|\n"
    #       0.upto(width-1) {|x| output += "| #{field_as_string(x, y, :agent).rjust(7)} "}
    #       output += "|\n"
    #       0.upto(width-1) {|x| output += "| #{(field_as_string(x, y, :x)+' '+field_as_string(x, y, :y)).rjust(7)} "}
    #       output += "|\n"
    #   end
    #   0.upto(width-1) {|x| output += '-'*10}
    #   output += "-\n"
    # end

    def field_as_string x, y, property
      self[x,y].try(:[],property).to_s
    end

  end
end
