class Api::SellersController < ApplicationController
  def index
    render json: Seller.unsold_merches
  end

  def show
    render json: Seller.find(params[:id]).buyers
  end
end