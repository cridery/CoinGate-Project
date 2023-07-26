class CoinGateService
  HEADERS = { 'Authorization' => "Bearer #{ENV['COINGATE_API_KEY']}" }
  
  def initialize(order, options = {})
    @order = order
    @options = options
  end

  def create_order
    response = HTTParty.post('https://api-sandbox.coingate.com/api/v2/orders', body: constructed_body(@order), headers: HEADERS)
    @order.update(coingate_order_id: response.parsed_response["id"]) if response.success?
  end

  def get_order
    return HTTParty.get("https://api-sandbox.coingate.com/api/v2/orders/#{@order.coingate_order_id}", headers: HEADERS)
  end

  def self.get_currencies
   return HTTParty.get("https://api-sandbox.coingate.com/api/v2/currencies")
  end

  def self.get_orders
    return HTTParty.get('https://api-sandbox.coingate.com/api/v2/orders', headers: HEADERS)
  end

  def cancel_order(id)
    self.class.delete("/orders/#{id}", options)
  end

  
  private

  def constructed_body(order)
    {
      order_id: "KRLDMBRV-#{order.id}",
      price_amount: order.price_amount,
      price_currency: order.price_currency,
      receive_currency: order.receive_currency,
      title: order.title,
      description: order.description,
      purchaser_email: order.purchaser_email
    }.compact_blank
  end
end