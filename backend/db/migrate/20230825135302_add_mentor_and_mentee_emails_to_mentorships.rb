class AddMentorAndMenteeEmailsToMentorships < ActiveRecord::Migration[6.1]
  def change
    add_column :mentorships, :mentor_email, :string
    add_column :mentorships, :mentee_email, :string
  end
end
