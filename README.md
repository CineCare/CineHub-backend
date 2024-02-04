<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a><img src="https://avatars.githubusercontent.com/u/145290921?s=200&v=4" width="100">
</p>

<p align="center">NestJS backend for cineHub</p>
    

## Description

<!--[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.-->

<p>The backend API for cineHub</p>


## Installation
- Have node and npm installed
- Have a mySQL server installed and running, with a database nammed "cinehub"
- Create a .env file, editing this example :
```txt
DATABASE_URL="mysql://db_user:db_password@db_host:db_port/cinehub"
DATABASE_PROVIDER="mysql"
```

db_user & db_password : the user and password you created during or after mysql server intallation
db_host & db_port : host and port of the mySQL server ( default: localhost:3306 )

- run in terminal :


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
$ npm run start:prod
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

## API Documentation
Can be found at /api