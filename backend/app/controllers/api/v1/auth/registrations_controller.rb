# アカウント作成用コントローラー
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
    private
  
    def sign_up_params
      params.require(:registration).permit(:email, :password, :password_confirmation, :role)
    end
end
  