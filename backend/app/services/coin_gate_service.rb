require 'httparty'

class CoinGateService
    include HTTParty
    base_uri 'https://api-sandbox.coingate.com/api/v2'

    def initialize(token)
        @token = token
    end

    def create_order(params)
        self.class.post(
            '/orders',
            body: params,
            headers: authorization_header
        )
    end

    def get_currencies
        self.class.get(
            '/currencies',
            headers: authorization_header
        )
    end

    def get_orders
        self.class.get(
            '/orders',
            headers: authorization_header
        )
    end

    def get_order(id)
        self.class.get(
            "/orders/#{id}",
            headers: authorization_header
        )
    end

    def cancel_order(id)
        self.class.delete(
            "/orders/#{id}",
            headers: authorization_header
        )
    end

    private 
        def authorization_header
            { 'Authorization' => "Bearer #{@token}" }
        end
end