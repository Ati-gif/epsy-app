class CreateMerches < ActiveRecord::Migration[6.1]
  def change
    create_table :merches do |t|
      t.float :price
      t.text :description
      t.string :category
      t.belongs_to :seller, null: false, foreign_key: true

      t.timestamps
    end
  end
end
