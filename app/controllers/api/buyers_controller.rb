class Api::BuyersController < ApplicationController
  def show 
    buyer = Buyer.find(params[:id])
    
    render json: Buyer.get_merches(params[:id], buyer.categories)
  end
end
