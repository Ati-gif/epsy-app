class Seller < ApplicationRecord
  has_many :buyers
  has_many :items
end
