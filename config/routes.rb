Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :users
    get 'merches', to: 'merches#index'
    get 'category_list', to: 'merches#category_list'
    get 'categories/:category', to: 'merches#category'
    get 'sellers', to: 'sellers#index'
    get 'sellers/:id', to: 'sellers#show'
    get 'buyers/:id', to: 'buyers#show'
  end
end
