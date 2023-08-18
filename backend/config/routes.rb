Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :users, only: [:index]
      resources :mentorships, only: [:create, :update] do # createとupdateのルートを追加
        collection do
          get :unassigned_mentees
          get :assigned_mentors
        end
      end

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        sessions: 'api/v1/custom_users'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end


# resources :mentorships, only: [:create, :update]: mentorships リソースに対して create と update アクションのルートを追加します。これにより、新しいメンターシップを作成するエンドポイントと、特定のmentee_idにmentor_idを割り振るエンドポイントが提供されます。

# get 'unassigned': unassigned アクションのルートを追加します。これにより、mentor_idが未割り当てのmentee_idを取得するエンドポイントが提供されます。