# jestTestSamples
Simple examples to demonstrate jest test cases with postgres db
1. Run docker-compose up -d. This will start the postgres db at localhost:5432, no username, password.

2. Run npm start

3. The endpoints are:

localhost:3001/createUser

localhost:3001/getUser?id=3 or localhost:3001/getUser

localhost:3000/updateUser

4. To run the test cases, npm test. It will provide the code coverage as well. 
