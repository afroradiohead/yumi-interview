# yumi-interview

## Description

Yumi Interview App

## Demo
https://yumi-interview.herokuapp.com

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Thought Process

#### Why Nestjs?
1. Nestjs gives the simple approach of MVC
2. Backed by a community
3. Uses Typescript, making it easier to work with many developers
4. Is actively being supported
5. Has everything a developer could ask for for building backend apis, including a testing suite

#### How did you approach building the endpoint

**1\.** Started off with creating a mysql query that gives me enough information to extract that values
in the json results
```
    SELECT o.id AS orderId, o.delivery_date, oa.quantity, m.id, m.name, m.description, m.image_url FROM orders AS o
    LEFT JOIN order_attributes AS oa ON o.id = oa.order_id
    LEFT JOIN meals AS m ON oa.meal_id = m.id
    WHERE user_id = 1
    ORDER BY o.id, m.id
```
**2\.** Then it was as simple as grabbing the results and translating it to the expected json
**3\.** Soon after, added in filtering for dates, pagination, and ordering

#### What was difficult about the project?
I'm familiar with using nestjs with mongoose as my orm, so this was the first time
using typeorm. Paid off as it's the perfect tool for the job

#### What would I do in a production environment
1. Add swagger for documenting every api endpoint
2. Add functional tests for every api endpoints

Be sure to visit the demo app https://yumi-interview.herokuapp.com