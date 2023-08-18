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
  role: 'mentor', # あなたのシステムでメンターを示す値に変更してください
  admin: true,
  # 他の必要なフィールドもここで設定する
)
User.create!(
  email: 'mentor@example.com',
  password: 'password',
  role: 'mentor', # あなたのシステムでメンターを示す値に変更してください
  admin: false
)
User.create!(
  email: 'mentee@example.com',
  password: 'password',
  role: 'mentee', # あなたのシステムでメンティーを示す値に変更してください
  admin: false
)

