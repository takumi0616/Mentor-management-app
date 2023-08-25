class Api::V1::MentorshipsController < ApplicationController
  def index
    mentorship = Mentorship.all
    render json: mentorship
  end

  # 未割り当てのmentee_idを取得
  def unassigned_mentees
    unassigned_mentees = Mentorship.where(mentor_id: nil)
    render json: unassigned_mentees
  end

  # 割り当てのmentor_idを取得
  def assigned_mentors
    assigned_mentors = Mentorship.where.not(mentee_id: nil)
    render json: assigned_mentors
  end

  # mentorshipの新規作成
  # mentee_idとstatusは指定して作成し、mentor_idは後から割り振る
  def create
    mentorship = Mentorship.new(mentorship_params.except(:mentor_id, :mentor_email))

    if mentorship.save
      render json: mentorship, status: :created
    else
      render json: mentorship.errors, status: :unprocessable_entity
    end
  end

  # 特定のmentee_idに対してmentor_idを割り振る
  # mentee_idに対応するmentorshipのレコードを探し、mentor_idを更新
  def update
    mentorship = Mentorship.find(params[:id])
    if mentorship.update(mentor_id: params[:mentor_id], status: params[:status], mentor_email: params[:mentor_email])
      render json: mentorship
    else
      render json: mentorship.errors, status: :unprocessable_entity
    end
  end

  def get_mentee_by_mentor
    mentorship = Mentorship.find_by(mentor_id: params[:id])
    if mentorship
      mentee_id = mentorship.mentee_id
      render json: { mentee_id: mentee_id }
    else
      render json: { error: "No mentorship found for the specified mentor" }, status: :not_found
    end
  end

  def get_tableId_by_menteeId
    mentorship = Mentorship.find_by(mentee_id: params[:id])
    if mentorship
      table_id = mentorship.id
      render json: { id: table_id }
    else
      render json: { error: "No mentorship found for the specified mentor" }, status: :not_found
    end
  end

  private

  def mentorship_params
    params.require(:mentorship).permit(:id, :mentor_id, :mentee_id, :status, :mentee_email, :mentor_email)
  end
end


# unassignedメソッド: このメソッドはmentor_idが未割り当て（nil）のmentee_idを取得するためのものです。データベースからmentor_idがnilのmentorshipレコードをすべて取得し、JSON形式で返します。

# createメソッド: mentor_idのパラメータを受け取らないように変更しています。新規メンターシップはmentor_idなしで作成され、その後でmentor_idを割り振るためです。

# updateメソッド: このメソッドは特定のmentee_idに対してmentor_idを割り振るためのものです。mentee_idに対応するmentorshipレコードを探し、mentor_idを更新します。

# self.create_for_menteeメソッドの削除: このメソッドは現状不要とされたため、コードから削除しています。