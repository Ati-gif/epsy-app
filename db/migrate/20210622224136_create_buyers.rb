class CreateBuyers < ActiveRecord::Migration[6.1]
  def change
    create_table :buyers do |t|
      t.string :name
      t.string :email
      t.string :desired_categories
      t.float :max_price
      t.belongs_to :seller, null: false, foreign_key: true

      t.timestamps
    end
  end
end
