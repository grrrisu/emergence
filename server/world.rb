require_relative '../ludo/matrix'

class World < Ludo::Matrix

  def create
    set_each_field do |field|
      {vegetation: fib(rand(4))}
    end
    self
  end

  # 0 1 2 3 5 8 13
  def fib(n)
    return 0 if n == 0
    return 1 if n == 1
    return 2 if n == 2
    return fib(n-1) + fib(n-2)
  end

end
