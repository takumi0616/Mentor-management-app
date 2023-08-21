# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
  email: 'admin@example.com',
  password: 'password',
  role: 'mentor', 
  admin: true
)

User.create!(
  email: 'mentor@example.com',
  password: 'password',
  role: 'mentor', 
  admin: false
)

mentee_user1 = User.create!(
  email: 'mentee1@example.com',
  password: 'password',
  role: 'mentee', 
  admin: false
)

Mentorship.create!(
  mentee_id: mentee_user1.id
)


mentee_user2 = User.create!(
  email: 'mentee2@example.com',
  password: 'password',
  role: 'mentee', 
  admin: false
)

# mentorship テーブルに対応するレコードを作成
Mentorship.create!(
  mentee_id: mentee_user2.id
)

LearningRecord.create!(
  user_id: 3,
  title: 'first',
  date: '2023-08-22',
  language: 'Next.js',
  content: 'テスト用0'
)

LearningRecord.create!(
  user_id: 4,
  title: 'second',
  date: '2023-08-22',
  language: 'React.js',
  content: 'テスト用1'
)

LearningRecord.create!(
  user_id: 3,
  title: 'third',
  date: '2023-08-22',
  language: 'Ruby on Rails',
  content: 'テスト用2'
)