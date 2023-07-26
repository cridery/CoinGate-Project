class AddCoingateIdToOrder < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :coingate_order_id, :string
    add_index :orders, :coingate_order_id
  end
end