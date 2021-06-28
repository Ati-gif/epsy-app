class Api::MerchesController < ApplicationController
  before_action :set_page

  def index
    render json: Merch.available
  end

  
  def categories_index
    render json: Merch.categories_index
  end

  def category
    category = params[:category]
    render json: Merch.categories_index(category)
  end

  def merches_find
    category = params[:category]
    seller_id = params[:seller_id]
    render json: Merch.merches_find(category, seller_id)
    end
    
    def merch_cost
      render json: Merch.cost_by_category
    end

  private
  def set_page
    @page = params[:page] || 1
  end

end
