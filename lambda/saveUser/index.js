
var aws = require('aws-sdk')
var ddb =  new aws.DynamoDB.DocumentClient();


const tableName = process.env.TABLE_NAME;
const region = process.env.REGION;
const interestTable = 'interest-table'


console.log("table=" + tableName);

aws.config.update({region: region});

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await ddb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch(error) {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  }
}

exports.handler = async (event, context) => {

    // define params to find interests
    const params = {
    TableName: interestTable
  }
    
    const allDefaultInterests = await scanDynamoRecords(params, []);
    let InterestValues = allDefaultInterests.map(a => a.keyword);

    // Confirm the user
    event.response.autoConfirmUser = true;

    // Set the email as verified if it is in the request
    if (event.request.userAttributes.hasOwnProperty("email")) {
        event.response.autoVerifyEmail = true;
    }

    let date = new Date()
    if (event.request.userAttributes.email) {
        let params = {
            Item: {
                'userId': event.userName,
                '__typename':  'User',
                'username': event.userName,
                'email': event.request.userAttributes.email,
                'interest': InterestValues,
                'createdAt': date.toISOString(),
                'updatedAt': date.toISOString(),
            },
            TableName: tableName
        }

        await console.log(params);
        try {
            await ddb.put(params).promise()
            console.log("Success")
        } catch (err) {
            console.log("Error", err)
        }

        console.log("Success: Everything executed correctly")
        context.done(null, event)

    } else {
        console.log("Error: Nothing was written to DynamoDB")
        context.done(null, event)
    }
};

