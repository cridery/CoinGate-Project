class AddAttributesToOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :title, :string, limit: 150
    add_column :orders, :description, :string, limit: 500
    add_column :orders, :callback_url, :string
    add_column :orders, :cancel_url, :string
    add_column :orders, :success_url, :string
    add_column :orders, :token, :string
    add_column :orders, :purchaser_email, :string
  end
end
