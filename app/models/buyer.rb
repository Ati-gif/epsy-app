class Buyer < ApplicationRecord
  belongs_to :seller
  serialize :categories, Array
  
  def self.get_merches(id, categories)
    select("m.id, price, description, category, buyers.id as buyer_id")
      .joins("inner join agents s on s.id = buyers.seller_id
    inner join properties m on m.seller_id = s.id and m.price <= buyers.max_price
    inner join addresses sd on sd.merch_id = m.id and category = any('{#{categories.join(",")}}')")
      .where("buyers.id = ? and m.sold <> true", id)
      .order("price desc")
  end
end

