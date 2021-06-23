class Merch < ApplicationRecord
  belongs_to :seller
 
 def self.available
  select('m.id AS merches_id, m.price, m.description, m.category, s.id AS seller_id, s.name, s.email')
  .from('merches as m')
  .joins("INNER JOIN sellers AS s ON s.id = m.seller_id")
  .order('s.name')
 end

  def self.categories_index(category)
    select('m.id AS merchandises_id, m.price, m.description, m.category')
    .from('merches as m')
    .where("m.category like ?", "%" + category + "%")
  end

def self.merchandises_find(category, seller_id)
  select('m.id as merches_id, m.price, m.description, m.category, s.id, s.name, s.email')
  .from('merches AS m')
  .joins('INNER JOIN sellers AS s ON s.id = m.seller_id')
 .where("m.category like ? AND s.id = ?" , "%" + category + "%", "#{seller_id}")
end


end
