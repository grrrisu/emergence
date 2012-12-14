# load library
%w{matrix field_properties}.each do |file|
  require File.join(File.dirname(__FILE__), '..', 'ludo', file)
end
%w{headquarter pawn view world}.each do |file|
  require File.join(File.dirname(__FILE__), '..', 'server', file)
end

RSpec.configure do |config|
  config.mock_with :rspec

  config.fail_fast = true

  config.filter_run :focus => true
  config.run_all_when_everything_filtered = true
end
