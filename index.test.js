const lambda = require('./index')
const AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
    const mDocumentClient = { get: jest.fn()};
    const mDynamoDB = { DocumentClient: jest.fn(() => mDocumentClient) };
    return { DynamoDB: mDynamoDB };
  });

const mDynamoDb = new AWS.DynamoDB.DocumentClient();

describe('DynamoDB test suite', () => {
    const event = {};

    beforeEach(() => {
        mDynamoDb.get.mockImplementation(() => ({promise: jest.fn().mockReturnValue('data from dynamo')}));
    });

    it('Dynamo db should return null value', async () => {
        mDynamoDb.get.mockImplementationOnce(() => ({promise: jest.fn().mockReturnValue(null)}));
         const response = await lambda.handler(event)
         expect(response.message).toBe('DynamoDb Error :: Error: Data not found')
     });

     it('Successfully executed lambda', async () => {
         const response = await lambda.handler(event)
         expect(response.message).toBe('Successfully executed lambda')
     });
});