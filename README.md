# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
- 3.0.6
* System dependencies
- MySQL 8.0

* Configuration
- '.env'

* Database creation
docker-compose run api rails db:create
docker-compose run api rails db:migrate
docker compose run --rm api bundle exec rails db:seed

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
