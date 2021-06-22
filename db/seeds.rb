# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

categories = [
  'Accessories',
  'Apparel',
  'Home',
  'Living',
  'Wedding',
  'Entertainment',
  'Collectibles',
  'Crafts',
  'Toys'
]

10.times do
  a = Seller.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
  )

  10.times do
    num_categories = rand(1..categories.length - 1);
    Buyer.create(
      name: Faker::Name.name,
      max_price: rand(62..1500),
      desired_categories: categories.sample(num_categories),
      seller_id: a.id
    )
  end
  
  10.times do
    category_sample = categories.sample(1).join('')
    price = rand(62..1500)
    m = Merch.create(
      price: price,
      description: Faker::House.furniture ,
      category: category_sample,
      seller_id: a.id
  )
  end
end

puts "seeded #{Seller.all.length} sellers"
puts "seeded #{Buyer.all.length} buyers"
puts "seeded #{Merch.all.length} merchandises"
