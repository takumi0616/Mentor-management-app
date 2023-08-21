class CreateLearningRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :learning_records do |t|
      t.integer :user_id, null: false
      t.string :title
      t.date :date
      t.string :language
      t.text :content

      t.timestamps
    end

    add_index :learning_records, :user_id
  end
end
