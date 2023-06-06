class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.decimal :price_amount, precision: 10, scale: 2, null: false
      t.string :price_currency, limit: 3, null: false
      t.string :receive_currency, limit: 3, null: false

      t.timestamps
    end
  end
end
