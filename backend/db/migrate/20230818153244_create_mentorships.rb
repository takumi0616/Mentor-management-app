class CreateMentorships < ActiveRecord::Migration[6.1]
  def change
    create_table :mentorships do |t|
      t.integer :mentor_id
      t.integer :mentee_id
      t.string :status

      t.timestamps
    end

    add_index :mentorships, :mentor_id
    add_index :mentorships, :mentee_id
  end
end
