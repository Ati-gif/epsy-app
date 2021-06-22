Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    get 'merchandises', to: 'merchandises#index'
    get 'categories', to: 'merchandises#categories_index'
    get 'categories/:category', to: 'merchandises#category'
    get 'merchandises/:category/:seller_id', to: 'merchandises#merchandises_find'

    resources :sellers 
  end
end
