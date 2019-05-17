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
    var tagTesting = {};

    before(done => {
        app.on("mongoStarted", () => {
            mongoose.connection.db.dropDatabase();

            const payload = { title: 'Apple watch' };

            request.post({ url: `${baseUrl}/create`, form: payload }, (err, res, body) => {
                tagTesting = JSON.parse(body);
                console.log("Init testing data: ", tagTesting);

                done();
            });
        });
    });

    // ROUTE: GET /get-all
    describe('\n*** ROUTE: /get-all', () => {
        it('Taglist should be a array, tag.isActive === true', (done) => {
            request.get(`${baseUrl}/get-all`, (err, res, body) => {
                res.statusCode.should.have.equal(200);

                const tagList = JSON.parse(body);

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

        it('Create must be success', (done) => {
            const payload = { title: '  Create new tag ' };

            request.post({ url: `${baseUrl}/create`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(200);

                const tagCreated = JSON.parse(body);
                tagCreated.isActive.should.have.equal(true);
                tagCreated.title.should.have.equal(payload.title.trim());

                done();
            });
        })
    });

    // ROUTE: POST /update
    describe('\n*** ROUTE: /update', () => {
        it('Title.trim() !== null', (done) => {
            const payload = { title: '           ' };

            request.post({ url: `${baseUrl}/update`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('Title !== undefined', (done) => {
            const payload = {};
            request.post({ url: `${baseUrl}/update`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('Id must be existed', (done) => {
            const payload = { id: '5cde3ef62a87a174e6a80b26' };

            request.post({ url: `${baseUrl}/update`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('Id must be existed', (done) => {
            const payload = { id: '5cde3ef62a87a174e6a80b26' };

            request.post({ url: `${baseUrl}/update`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('New title must be unique', (done) => {
            const payload = { id: tagTesting._id, title: '  Apple watch  ' };

            request.post({ url: `${baseUrl}/update`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('New slug must be unique', (done) => {
            const payload = { id: tagTesting._id, title: '  apple Watch  ' };

            request.post({ url: `${baseUrl}/update`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('Update must be success', (done) => {
            const payload = { id: tagTesting._id, title: '  update apple Watch ' };

            request.post({ url: `${baseUrl}/create`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(200);

                const tagUpdated = JSON.parse(body);
                
                tagUpdated.isActive.should.have.equal(true);
                tagUpdated.title.should.have.equal(payload.title.trim());

                done();
            });
        })
    });

    // ROUTE: POST /delete
    describe('\n*** ROUTE: /delete', () => {
        it('Id !== undefined', done => {
            const payload = {};

            request.post({ url: `${baseUrl}/delete`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(400);

                done();
            });
        });

        it('Id must be existed', done => {
            const payload = { id: '5cde3ef62a87a174e6a80b26' };

            request.post({ url: `${baseUrl}/delete`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(404);

                done();
            });
        });

        it('Delete must be success', done => {
            const payload = { id: tagTesting._id };

            request.post({ url: `${baseUrl}/delete`, form: payload }, (err, res, body) => {
                res.statusCode.should.have.equal(200);

                const tagDeleted = JSON.parse(body);

                tagDeleted.title.should.have.equal(tagTesting.title);
                tagDeleted.isActive.should.have.equal(false);

                done();
            });
        });
    });
});

