require 'rails_helper'
require 'json'

RSpec.describe OrdersController, type: :controller do
  describe '#create' do
    it 'creates an order' do
      allow_any_instance_of(CoinGateService).to receive(:create_order).and_return(
        instance_double(HTTParty::Response, code: 200, parsed_response: {
          'id' => '1',
          'price_amount' => '123.23',
          'price_currency' => 'USD',
          'receive_currency' => 'USD',
          'title' => 'Order #1',
          'description' => 'Order #1 description',
          'status' => 'new'
        })
      )

      post :create, params: {
        order: {
          price_amount: '123.23',
          price_currency: 'USD',
          receive_currency: 'USD',
          title: 'Order #1',
          description: 'Order #1 description'
        }
      }

      expect(response.status).to eq(200)
      expect(Order.count).to eq(1)
      expect(Order.first.price_amount.to_f).to eq(123.23)
      expect(Order.first.price_currency).to eq('USD')
      expect(Order.first.receive_currency).to eq('USD')
      expect(Order.first.title).to eq('Order #1')
      expect(Order.first.description).to eq('Order #1 description')
    end
  end

  describe '#get_currencies' do
    it 'gets currencies' do
      allow_any_instance_of(CoinGateService).to receive(:get_currencies).and_return(
        instance_double(HTTParty::Response, code: 200, parsed_response: ['USD'])
      )

      get :get_currencies

      expect(response.status).to eq(200)
      expect(response.body).to eq({ currencies: ['USD'] }.to_json)
    end
  end

    describe '#get_orders' do
        before do
        allow_any_instance_of(CoinGateService).to receive(:get_orders).and_return(
            instance_double(HTTParty::Response, code: 200, parsed_response: { 'orders' => [] })
        )
        end

        it 'gets orders' do
        get :get_orders

        expect(response.status).to eq(200)
        expect(response.parsed_body).to eq({ 'orders' => [] })
        end
    end

    describe '#get_order' do
        before do
        allow_any_instance_of(CoinGateService).to receive(:get_order).and_return(
            instance_double(HTTParty::Response, code: 200, parsed_response: { 'order' => { 'order' => { 'order' => { 'order' => { 'order' => { 'order' => {} } } } } } })
        )
        end

        it 'gets an order' do
        get :get_order, params: { id: 1 }

        expect(response.status).to eq(200)
       end
    end
end
