require 'rails_helper'

RSpec.describe CoinGateService do
  subject { described_class.new('test_token') }

  describe '#create_order' do
    it 'creates an order' do
      stub_request(:post, "https://api-sandbox.coingate.com/api/v2/orders")
    .with(
      body: {
        "price_amount": "1.00",
        "price_currency": "USD",
        "receive_currency": "USD",
      },
      headers: { 'Authorization'=>'Bearer test_token', 'User-Agent'=>'Ruby' }
    )
    .to_return(status: 200, body: "{}", headers: {})


      subject.create_order({
        "price_amount": "1.00",
        "price_currency": "USD",
        "receive_currency": "USD",
      })
    end
  end

  describe '#get_orders' do
    it 'gets orders' do
      stub_request(:get, "https://api-sandbox.coingate.com/api/v2/orders")
        .with(
          headers: { 'Authorization' => 'Bearer test_token' }
        )
        .to_return(status: 200, body: {
          "orders": [
            {
              "id": "1",
              "status": "new",
              "price_amount": "1.00",
              "price_currency": "USD",
              "receive_currency": "USD",
              "title": "Order #1",
              "description": "Order #1 description",
              "created_at": "2019-12-31T00:00:00+00:00",
              "payment_url": "https://sandbox.coingate.com/invoice/1",
              "token": "test_token"
            },
            {
              "id": "2",
              "status": "new",
              "price_amount": "2.00",
              "price_currency": "USD",
              "receive_currency": "USD",
              "title": "Order #2",
              "description": "Order #2 description",
              "created_at": "2019-12-31T00:00:00+00:00",
              "payment_url": "https://sandbox.coingate.com/invoice/2",
              "token": "test_token"
            }
          ]
        }.to_json, headers: {})

      subject.get_orders()
    end
  end
end
