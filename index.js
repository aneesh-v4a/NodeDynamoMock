const AWS = require('aws-sdk');

exports.handler = (event, context) => {
    const dbClient = new AWS.DynamoDB.DocumentClient();
    try {
        const params = {}
        const data = dbClient.get(params).promise();
        if (!data) {
            throw new Error('Data not found')
        }
        return {statusCode: 200, message: "Successfully executed lambda"}
    } catch (error) {
        return {statusCode: 400, message: `DynamoDb Error :: ${error}`}
    }
}
