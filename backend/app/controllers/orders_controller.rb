require 'httparty'

class OrdersController < ApplicationController

    def create
        response = HTTParty.post(
            'https://api-sandbox.coingate.com/api/v2/orders',
            body: {
                order_id: params[:order_id],
                price_amount: params[:price_amount],
                price_currency: params[:price_currency],
                receive_currency: params[:receive_currency],
                title: params[:title],
                description: params[:description],
                callback_url: params[:callback_url],
                cancel_url: params[:cancel_url],
                success_url: params[:success_url],
                token: params[:token],
                purchaser_email: params[:purchaser_email],
            },
            headers: {
                'Authorization' => "Bearer #{ENV['COINGATE_API_KEY']}"
            }
        )

        if response.code == 200
            order_data = response.parsed_response
            order = Order.new(
                order_id: order_data['id'],
                price_amount: order_data['price_amount'],
                price_currency: order_data['price_currency'],
                receive_currency: order_data['receive_currency'],
                title: order_data['title'],
                description: order_data['description'],
                status: order_data['status'],
            )

            if order.save 
                render json: { status: 'success', order: order }, status: 200
            else 
                render json: { status: 'error', message: order.errors.full_messages }, status: 422
            end
        else 
            render json: {status: 'error', message: 'Failed to create order at CoinGate'}, status: 500
        end 
    end

    def get_currencies
        response = HTTParty.get(
            'https://api.coingate.com/api/v2/currencies'
        )

        if response.code == 200
            render json: { status: 'success', currencies: response.parsed_response }, status: 200
        else 
            render json: { status: 'error', message: 'Failed to fetch currencies from CoinGate' }, status: 500
        end 
    end

    def get_orders
        orders = Order.all
        render json: { status: 'success', orders: orders }, status: 200
    rescue => e 
        render json: { status: 'error', message: e }, status: 500
    end

    def get_order
        order = Order.find(params[:id])
        render json: { status: 'success', order: order }, status: 200
    rescue ActiveRecord::RecordNotFound 
        render json: { status: 'error', message: 'Order not found' }, status: 404
    rescue => e
        render json: { status: 'error', message: e }, status: 500
    end

    def cancel_order
        order_id = params[:id]
        order = Order.find(params[:id])
        response = HTTParty.post(
            "https://api-sandbox.coingate.com/api/v2/orders/#{order.order_id}/binance/cancel",
            headers: {
                'Authorization' => "Bearer #{ENV['COINGATE_API_KEY']}"
            }
        )

        if response.code == 200
            order.update(status: 'cancelled')
            render json: { status: 'success', order: order }, status: 200
        else
            render json: { status: 'error', message: 'Failed to cancel order at CoinGate' }, status: response.code
        end
    rescue ActiveRecord::RecordNotFound
        render json: { status: 'error', message: 'Order not found' }, status: 404
    rescue => e
        render json: { status: 'error', message: e }, status: 500
    end

end