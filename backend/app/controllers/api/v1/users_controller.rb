class Api::V1::UsersController < ApplicationController
    def index
      users = User.select(:id, :email, :role)
      render json: users
    end
end