class Api::V1::MentorshipsController < ApplicationController
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
    mentorship = Mentorship.new(mentorship_params.except(:mentor_id))

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
    if mentorship.update(mentor_id: params[:mentor_id])
      render json: mentorship
    else
      render json: mentorship.errors, status: :unprocessable_entity
    end
  end

  private

  def mentorship_params
    params.require(:mentorship).permit(:mentor_id, :mentee_id, :status)
  end
end


# unassignedメソッド: このメソッドはmentor_idが未割り当て（nil）のmentee_idを取得するためのものです。データベースからmentor_idがnilのmentorshipレコードをすべて取得し、JSON形式で返します。

# createメソッド: mentor_idのパラメータを受け取らないように変更しています。新規メンターシップはmentor_idなしで作成され、その後でmentor_idを割り振るためです。

# updateメソッド: このメソッドは特定のmentee_idに対してmentor_idを割り振るためのものです。mentee_idに対応するmentorshipレコードを探し、mentor_idを更新します。

# self.create_for_menteeメソッドの削除: このメソッドは現状不要とされたため、コードから削除しています。