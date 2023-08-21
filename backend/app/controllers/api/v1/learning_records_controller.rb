class Api::V1::LearningRecordsController < ApplicationController
  def index
    user = User.find(params[:user_id])
    @learning_records = user.learning_records
    render json: @learning_records
  end

  def show
    user = User.find(params[:user_id])
    @learning_record = user.learning_records.find(params[:id])
    render json: @learning_record
  end

  def create
    user = User.find(params[:user_id])
    @learning_record = user.learning_records.new(learning_record_params)
    if @learning_record.save
      render json: @learning_record, status: :created
    else
      render json: { errors: @learning_record.errors }, status: :unprocessable_entity
    end
  end
  
  private

  def learning_record_params
    params.require(:learning_record).permit(:title, :date, :language, :content)
  end
end
