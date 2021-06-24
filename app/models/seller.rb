class Seller < ApplicationRecord
  has_many :buyers
  has_many :merches
  def self.unsold_merches
    select('sellers.id, name, email, sold, COUNT(*) as frequency')
    .joins('INNER JOIN properties m ON m.agent_id = sellers.id')
    .where('sold <> TRUE')
    .group('sellers.id, name, email, sold')
    .order ('COUNT(*) DESC')
  end
end
