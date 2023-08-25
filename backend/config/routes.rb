Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :users, only: [:index] do
        resources :learning_records, only: [:index, :show, :create]
      end
      resources :mentorships, only: [:create, :update, :index] do
        collection do
          get :unassigned_mentees
          get :assigned_mentors
        end
        member do
          get :get_mentee_by_mentor
          get :get_tableId_by_menteeId
        end
      end

      get '/users/:id/get_mentee_email_by_mentee_id', to: 'users#get_mentee_email_by_mentee_id'
      get '/users/:id/get_mentor_email_by_mentor_id', to: 'users#get_mentor_email_by_mentor_id'

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
