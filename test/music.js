/**
* Testing for music api
* @author ojourmel
*
*/
var request = require('supertest');

// Connect to an alread running instance of the app
// This includes are running docker-compose instance
request = request("http://localhost:3000");


describe('music api', function () {

    it('should respond to /music get', function (done) {
        request
            .get('/music')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    /**
     * @TODO add other RESTful endpoint tests
     */
});

