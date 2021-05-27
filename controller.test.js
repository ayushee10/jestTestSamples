const { iteratee } = require('lodash');
const request = require('supertest');
//const config = require('./utils/config');
const app = require('./app');
const { updateUser } = require('./controller');
const service = require('./service');

describe('controller', () => {
    let  endpoint;

    describe('/POST', () => {
        let testData, createUserMock;

        beforeEach(() => {
             createUserMock = service.prototype.createUser = jest.fn();
             testData = {
                "id": 1,
                "name": "Test User",
                "age": 10,
                "address": "bangalore",
                "salary": 50.0
            };
            endpoint =  '/createUser'
        })

        test('should return 201', async() => {
             createUserMock.mockReturnValue()
            const response = await request(app)
                            .post(endpoint)
                            .send(testData);
            expect(response.status).toEqual(201);  
            expect(response.body).toHaveProperty('msg', 'data posted successfully');      
                
        });

        test('should return 500', async() => {
            createUserMock.mockImplementation(() => { throw new Error('internal server error') })
            const response = await request(app)
                            .post(endpoint)
                            .send(testData);
            expect(response.status).toEqual(500);  
            expect(response.body).toEqual(expect.objectContaining({
               err: expect.any(Object)
              }));
        })
    });

    describe('/GET', () => {
        let getUserMock
        beforeEach(() => {
            getUserMock = service.prototype.getUser = jest.fn();
            endpoint = '/getUser'
        })
         describe('/GET with id provided', () => {

             test('should return 200 with user', async() => {
                 let userData = {
                    "id": 1,
                    "name": "Test User",
                    "age": 30,
                    "address": "Bangalore                                         ",
                    "salary": 50
            }
                getUserMock.mockReturnValue(userData);
                const response = await request(app)
                                .get(endpoint)
                                .query({
                                    id: 1
                                })
                expect(response.status).toEqual(200)
                expect(response.body).toHaveProperty('response', userData)
             })

             test('should return 500', async() => {
                getUserMock.mockImplementation(() => { throw new Error('internal server error') });
                const response = await request(app)
                                .get(endpoint)
                                .query({
                                    id: 1
                                })
                expect(response.status).toEqual(500)
             })
         })

         describe('/GET with no id provided', () => {
            test('should return 200 with all the users', async() => {
                let userData = [{
                    "id": 1,
                    "name": "Test User",
                    "age": 30,
                    "address": "Bangalore                                         ",
                    "salary": 50
            }, {
                    "id": 2,
                    "name": "Test User2",
                    "age": 32,
                    "address": "Bangalore                                         ",
                    "salary": 52
            }];
            getUserMock.mockReturnValue(userData)
            const response = await request(app)
                                .get(endpoint)
            expect(response.status).toEqual(200)
            expect(response.body.response).toEqual(userData)
            })
         })
    })

    describe('/PATCH', () => {
        let testData, updateUserMock;
        beforeEach(() => {
            updateUserMock = service.prototype.updateUser = jest.fn();
            testData = {
                "id" : 1,
                "address": "address change"
            }
            endpoint = "/updateUser"
        });

        test('should return 200 after updating the user', async() => {
            updateUserMock.mockReturnValue();
            const response = await request(app)
                            .patch(endpoint)
                            .send(testData)
            expect(response.status).toEqual(200)
            expect(updateUserMock).toHaveBeenCalled()
            expect(response.body).toHaveProperty('msg', 'data updated successfully')
        })

        test('it should return 500', async() => {
            updateUserMock.mockImplementation(() => { throw new Error('internal server error') })
            const response = await request(app)
                            .patch(endpoint)
                            .send(testData)
            expect(response.status).toEqual(500)
            expect(updateUserMock).toHaveBeenCalledWith(testData)
            
        })
    })
})