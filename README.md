# OpenMediaPortal

A generic API for assessing a file server. A collection of backend and frontend applications to implement and consume that API.

In principal, a simple RESTful server and responsive web app for accessing a file server.


## API

This generic API can be implemented and consumed by many different different front and back ends. This API is documented here:

`TODO`

---

#### Server

1. A [Nodejs Express](http://expressjs.com/) server implement this API, supported by a [MongoDB](https://www.mongodb.org/) database. This code can be found at [omp-express-mongo-api](https://github.com/OpenMediaPortal/omp-express-mongo-api).


#### Web App

1. A [Riot](http://riotjs.com/) front consumes this API, with a focus on a responsive interface. This code can be found at [omp-riot-ui](https://github.com/OpenMediaPortal/omp-riot-ui).
1. A [React](https://facebook.github.io/react/) front consumes this API. This code can be found at [omp-react-ui](https://github.com/OpenMediaPortal/omp-react-ui).

---

#### Web Server

A generic [nginx](http://nginx.org/en/) server is used to serve the static content found in the frontend repositories. Nginx assumes the document root of the website is the `build` folder of the front end repository.

## Installation and Running

[Docker](http://www.docker.com/) is used to containerize the various front and back end implementations. An API is exposed on port `8001` and a web UI is exposed on port `8000`.

   * `git clone https://github.com/OpenMediaPortal/OpenMediaPortal.git`
   * `cd OpenMediaPortal`
   * `./configure`
   * `docker-compose build`
   * `docker-compose up -d`
   * `http://localhost:8000/`
   * `docker-compose stop`
   * `docker-compose rm`


## Configuring

This project uses the `configure` script to create an appropriate `docker-compose.yml` file. This depends on valid `Dockerfile`s existing in each backend and frontend repository. The frontend code is severed by a standard Nginx Dockerfile.

Additionally, `omp-config.yml` contains the main configuration options. This is read by not only the back and front ends, but the `configure` script when it builds `docker-compose.yml`.

The default backend and frontend code is given by:
   * `BACKEND=omp-express-mongo-api`
   * `FRONTEND=omp-riot-ui`

An alternative frontend can be selected by using:
   * `FRONTEND=omp-react-ui`

As more front and back end code becomes available, simply set these variables to the exact project/path name.

Please refer to the various implementations of the front and back end for specific details.

## Hacking

Please conform to each implementation's code standards. Additionally, `git` commit messages should follow the very good example laid out here:

   * [Commit Message Format](http://chris.beams.io/posts/git-commit/)

## Testing

| Project | Status |
|---------|-------:|
|`omp-express-mongo-api`|[![omp-express-mongo-api](https://travis-ci.org/OpenMediaPortal/omp-express-mongo-api.svg?branch=master)](https://travis-ci.org/OpenMediaPortal/omp-express-mongo-api) |
|`omp-riot-ui`|[![omp-riot-ui](https://travis-ci.org/OpenMediaPortal/omp-riot-ui.svg?branch=master)](https://travis-ci.org/OpenMediaPortal/omp-riot-ui)|
|`omp-react-ui`|[![omp-react-ui](https://travis-ci.org/OpenMediaPortal/omp-react-ui.svg?branch=master)](https://travis-ci.org/OpenMediaPortal/omp-react-ui)|

Each API server is responsible for implementing unit tests to verify API endpoints.

UI testing is done on a case by case basis.

## Git
A few words on git:

There are several git repositories that interact in interesting ways. Because git submodules and git subtrees did not fit the development workflow for this project, nested git repositories are used.

The OpenMediaPortal repository contains a `.gitignore` which specifies `*`. Everything is ignored. Then, the select few files that are actually needed are force added.

Nested git repositories, like `omp-riot-ui` contain their own git history, branches, etc. Under no circumstance should backend or frontend code be added to this repository.

If there is a better way to organize this code, please let us know!
