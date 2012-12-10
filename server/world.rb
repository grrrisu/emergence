class World
  include Enumerable

  def initialize columns, rows = nil
    rows = columns unless rows
    @matrix = Array.new(rows) {Array.new(columns)}
  end

  def create
    set_each_field do |field|
      fib(rand(7))
    end
  end

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
      row.each_with_index {|field, y| @matrix[x][y] = yield x, y}
    end
  end

  # 0 1 2 3 5 8 13
  def fib(n)
    return 0 if n == 0
    return 1 if n == 1
    return 2 if n == 2
    return fib(n-1) + fib(n-2)
  end

  def each_field
    @matrix.each do |row|
      row.each {|field| yield }
    end
  end

  alias each each_field

end
