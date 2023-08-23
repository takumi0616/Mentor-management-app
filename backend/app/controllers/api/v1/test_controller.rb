class Api::V1::TestController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    render json: { message: "Connect"}
  end
end
