Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    get 'merches', to: 'merches#index'
    get 'categories', to: 'merches#categories_index'
    get 'categories/:category', to: 'merches#category'
    get 'merches/:category/:seller_id', to: 'merches#merches_find'

    resources :sellers 
  end
end
