const expect = require('chai').expect;
const request = require('request');

const baseUrl = "http://localhost:5000/api/tag";

describe("=== API TAG ===", () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Tag.remove({}, (err) => {
    //         done();
    //     });
    // });

    // ROUTE: GET /get-all
    describe('ROUTE: /get-all', () => {
        it('Taglist should be a array, tag.isActive === true', (done) => {
            request.get(`${baseUrl}/get-all`, (err, res, body) => {
                const tagList = JSON.parse(body);

                expect(tagList).to.be.a('array');

                tagList.map((tag, index) => {
                    // tag have property isActive and isActive === true
                    expect(tag).have.property('isActive').equal(true);
                });

                done();
            });
        });
    });

    // ROUTE: POST /create
    describe('ROUTE: /create', () => {
        it('Title.trim() !== null', (done) => {
            const payload = { title: '                ' };

            request.post({ url: `${baseUrl}/create`, payload }, (err, res, body) => {                
                expect(res.statusCode).to.equal(400);        
                
                done();
            });
        });

        it('Title !== undefined', (done) => {
            const payload = {};
            request.post({ url: `${baseUrl}/create`, payload }, (err, res, body) => {
                expect(res.statusCode).to.equal(400);         
                
                done();
            });
        });

        // it('Title or Slug already exist', (done) => {
        //     const payload = { title: '' };

        //     request.
        // });

                    // const payload = { title: '  iPhone 11  ' };
            // const url = `${baseUrl}/api/tag/create`;

            // request.post({ url, payload }, (err, res, body) => {
            //     const bodyObj = JSON.parse(body);

            //     expect(bodyObj.title).to.equal(payload.title);
            //     expect(bodyObj.slug).to.equal('iPhone-11');
            //     expect(bodyObj.isActive).to.equal(true);

            //     expect(res.statusCode).to.equal(200);

            //     done();
            // });      
    });
});

