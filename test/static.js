/**
* Testing for static files
* @author ojourmel
*
* @see https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
*/
var request = require('supertest');

// Connect to an alread running instance of the app
// This includes are running docker-compose instance
request = request("http://localhost:3000");


describe('static endpoints', function () {

    it('should respond to /player', function (done) {
        request
            .get('/player')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('should respond to /player/music', function (done) {
        request
            .get('/player/music')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('should respond to /player/photos', function (done) {
        request
            .get('/player/photos')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('should respond to /player/tv', function (done) {
        request
            .get('/player/tv')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('should respond to /player/movies', function (done) {
        request
            .get('/player/movies')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });

    it('should 404 everything else', function (done) {
        request
            .get('/routes')
            .expect(404, done);
    });
});
