//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const request = require('request');

chai.should();

const baseUrl = "http://localhost:5000/api/tag";

describe("=== API TAG ===", () => {
    beforeEach((done) => { //Before each test we empty the database
        done();
    });

    // ROUTE: POST /create
    describe('ROUTE: /create', () => {
        it('Title.trim() !== null', (done) => {
            const payload = { title: '                ' };

            request.post({ url: `${baseUrl}/create`, payload }, (err, res, body) => {                                
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('Title !== undefined', (done) => {
            const payload = {};
            request.post({ url: `${baseUrl}/create`, payload }, (err, res, body) => {                
                res.statusCode.should.have.equal(400);

                done();
            });
        });  
    });

    // ROUTE: GET /get-all
    describe('ROUTE: /get-all', () => {
        it('Taglist should be a array, tag.isActive === true', (done) => {
            request.get(`${baseUrl}/get-all`, (err, res, body) => {
                const tagList = JSON.parse(body);

                tagList.should.be.a('array');
                tagList.map(tag => tag.should.have.property('isActive').equal(true));

                done();
            });
        });
    });
});

