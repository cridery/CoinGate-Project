Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/orders', to: 'orders#create'
  get '/orders/currencies', to: 'orders#get_currencies'
  get '/orders', to: 'orders#get_orders'
  get '/orders/:id', to: 'orders#get_order'
  post '/orders/:id/binance/cancel', to: 'orders#cancel_order'
end
