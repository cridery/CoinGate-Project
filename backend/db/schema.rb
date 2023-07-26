# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_25_102554) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "orders", force: :cascade do |t|
    t.decimal "price_amount", precision: 10, scale: 2, null: false
    t.string "price_currency", limit: 3, null: false
    t.string "receive_currency", limit: 3, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "order_id"
    t.string "title", limit: 150
    t.string "description", limit: 500
    t.string "callback_url"
    t.string "cancel_url"
    t.string "success_url"
    t.string "token"
    t.string "purchaser_email"
    t.string "status"
    t.string "coingate_order_id"
    t.index ["coingate_order_id"], name: "index_orders_on_coingate_order_id"
  end

end
