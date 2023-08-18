class Api::V1::CustomUsersController < DeviseTokenAuth::SessionsController
    before_action :authenticate_user!, only: [:user_info]
  
    private
    def user_info
      render json: { admin: current_user.admin, role: current_user.role }
    end
end
  