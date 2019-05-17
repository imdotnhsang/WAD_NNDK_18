// start server
require('../bin/www');

// Unit test
const chai = require('chai');
const app = require('../app');
const request = require('request');

const config = require('config');
const baseUrl = `http://localhost:${config.PORT}/api/tag`;

const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');

chai.should();

describe("\n\n=============== API TAG ===============\n", () => {
    before(done => {
        app.on("mongoStarted", () => {
            mongoose.connection.db.dropDatabase();

            const payload = { title: 'Apple watch' };

            request.post({ url: `${baseUrl}/create`, form: payload }, (err, res, body) => {                
                // console.log("\n==== Data testing ====");
                // console.log(JSON.parse(body));
                // console.log("======================\n\n");

                console.log("Init testing data: ", JSON.parse(body));
                
                done();
            });
        });
    });

    // ROUTE: GET /get-all
    describe('\n*** ROUTE: /get-all', () => {
        it('Taglist should be a array, tag.isActive === true', (done) => {
            request.get(`${baseUrl}/get-all`, (err, res, body) => {
                res.statusCode.should.have.equal(200);

                const { tagList } = JSON.parse(body);

                tagList.should.be.a('array');
                tagList.map(tag => tag.should.have.property('isActive').equal(true));

                done();
            });
        });
    });

    // ROUTE: POST /create
    describe('\n*** ROUTE: /create', () => {
        it('Title.trim() !== null', (done) => {
            const payload = { title: '                ' };

            request.post({ url: `${baseUrl}/create`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('Title !== undefined', (done) => {
            const payload = {};
            request.post({ url: `${baseUrl}/create`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('Title must be unique', (done) => {
            const payload = { title: '  Apple watch  ' };

            request.post({ url: `${baseUrl}/create`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('Slug must be unique', (done) => {
            const payload = { title: '  apple Watch  ' };

            request.post({ url: `${baseUrl}/create`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });
    });
});

