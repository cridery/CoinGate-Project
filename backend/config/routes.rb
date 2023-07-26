Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :orders do 
    get :currencies, on: :collection
  end

  post '/orders/:id/binance/cancel', to: 'orders#cancel_order'
end
