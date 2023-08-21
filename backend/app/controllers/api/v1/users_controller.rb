class Api::V1::UsersController < ApplicationController
    def index
      users = User.select(:id, :email, :role)
      render json: users
    end

    def get_mentee_email_by_mentee_id
      user = User.find_by(id: params[:id])
      if user
        mentee_email = user.email
        render json: { mentee_email: mentee_email }
      else
        render json: { error: "No user found with the specified ID" }, status: :not_found
      end
    end
end