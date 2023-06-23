class CoinGateService
  include HTTParty
  base_uri 'https://api-sandbox.coingate.com/api/v2'

  def initialize
    @options = { headers: { 'Authorization' => "Bearer #{ENV['COINGATE_API_KEY']}" } }
  end

  def create_order(params)
    self.class.post('/orders', options_with_body(params))
  end

  def get_currencies
    self.class.get('/currencies', options)
  end

  def get_orders
    self.class.get('/orders', options)
  end

  def get_order(id)
    self.class.get("/orders/#{id}", options)
  end

  def cancel_order(id)
    self.class.delete("/orders/#{id}", options)
  end

  def build_order(order_data)
    Order.new(
      payment_processor_order_id: order_data['id'],
      price_amount: order_data['price_amount'],
      price_currency: order_data['price_currency'],
      title: order_data['title'],
      description: order_data['description'],
      status: order_data['status']
    )
  end

  private

  attr_reader :options

  def options_with_body(params)
    @options.merge({ body: params })
  end
end
