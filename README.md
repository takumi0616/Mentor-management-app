# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
- 3.0.6

* Rails version
- 6.1.7

* Next version
- 13.4.16

* React version
- 18.2.0

* TypeScript version
- 5.1.6

* System dependencies
- MySQL 8.0

* Configuration
- '.env'

* Database creation
docker-compose run api rails db:create
# できなかったら連打する
docker-compose run api rails db:migrate
docker compose run --rm api bundle exec rails db:seed

* Database recreation
docker-compose down -v
docker-compose run --rm api rails db:create
docker-compose run --rm api rails db:migrate
docker compose run --rm api bundle exec rails db:seed

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* Start map
git clone git@github.com:takumi0616/Mentor-management-app.git
//.env create
docker compose build
docker-compose run api rails db:create
docker-compose run api rails db:migrate
docker compose run --rm api bundle exec rails db:seed
docker compose up
//finish docker compose down

* seed data reset
docker compose run --rm api bundle exec rails db:reset db:seed
