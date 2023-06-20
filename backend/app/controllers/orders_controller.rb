require 'httparty'
require 'coin_gate_service'

class OrdersController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :initialize_coingate_service

    def create
        order_params = order_params().merge(callback_url: Rails.configuration.coingate_callback_url)
        response = @coingate_service.create_order(order_params)

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
            render json: { status: 'error', message: 'Failed to create order at CoinGate' }, status: 500
        end
    end

    def get_currencies
        response = @coingate_service.get_currencies
        if response.code == 200
            render json: { status: 'success', currencies: response.parsed_response }, status: 200
        else
            render json: { status: 'error', message: 'Failed to fetch currencies from CoinGate' }, status: 500
        end
    end

    def get_orders
        response = @coingate_service.get_orders
        if response.code == 200
            orders_array = response.parsed_response['orders']
            render json: { status: 'success', orders: orders_array }, status: 200
        else
            render json: { status: 'error', message: 'Failed to fetch orders from CoinGate' }, status: 500
        end
    end

    def get_order
        response = @coingate_service.get_order(params[:id])
        if response.code == 200
            render json: { status: 'success', order: response.parsed_response }, status: 200
        else
            render json: { status: 'error', message: 'Failed to fetch order from CoinGate' }, status: 500
        end
    end

    def cancel_order
        response = @coingate_service.cancel_order(params[:id])
        if response.code == 200
            render json: { status: 'success', order: response.parsed_response }, status: 200
        else
            render json: { status: 'error', message: 'Failed to cancel order at CoinGate' }, status: 500
        end
    end

    def callback
        order_id = params[:order_id]
        order = Order.find_by(order_id: order_id)

        if order.present?
            order.update(status: params[:status])
            render json: { status: 'success', order: order }, status: 200
        else
            render json: { status: 'error', message: 'Order not found' }, status: 404
        end
    end

    private 

    def order_params
        params.require(:order).permit(
            :order_id,
            :price_amount,
            :price_currency,
            :receive_currency,
            :title,
            :description,
            :purchaser_email,
        )
    end

    def initialize_coingate_service
        @coingate_service = CoinGateService.new(ENV['COINGATE_API_KEY'])
    end

end