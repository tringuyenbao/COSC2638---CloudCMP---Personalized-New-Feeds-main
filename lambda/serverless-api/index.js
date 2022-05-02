const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-southeast-1' 
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbUserTableName = 'user-info-table';
const dynamodbInterestTableName = 'interest-table';
const healthPath = '/health';
const userPath = '/user';
const usersPath = '/users';
const interestPath = '/interest';
const interestsPath = '/interests';


exports.handler = async function(event){
    console.log('Request event: ',event);
    let response;
    switch(true){
        //user
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = buildResponse(200);
            break;
        case event.httpMethod === 'GET' && event.path === userPath:
            response = await getUser(event.queryStringParameters.userId);
            break;
        case event.httpMethod === 'POST' && event.path === userPath:
            response = await saveUser(JSON.parse(event.body));
            break;
        case event.httpMethod === 'PATCH' && event.path === userPath:
            const requestBody = JSON.parse(event.body);
            response = await modifyUser(requestBody.userId,requestBody.updateKey,requestBody.updateValue);
            break;    
        case event.httpMethod === 'DELETE' && event.path === userPath:
            response = await deleteUser(JSON.parse(event.body).userId);
            break;
            
        //users    
        case event.httpMethod === 'GET' && event.path === usersPath:
            response = await getUsers();
            break;            
            
         //interest
        case event.httpMethod === 'GET' && event.path === interestPath:
          response = await getInterest(event.queryStringParameters.interestId);
          break;
        case event.httpMethod === 'POST' && event.path === interestPath:
          response = await saveInterest(JSON.parse(event.body));
          break;
        case event.httpMethod === 'PATCH' && event.path === interestPath:
           const requestBodyyy = JSON.parse(event.body);
          response = await modifyInterest(requestBodyyy.interestId, requestBodyyy.updateKey, requestBodyyy.updateValue);
          break;
        case event.httpMethod === 'DELETE' && event.path === interestPath:
          response = await deleteInterest(JSON.parse(event.body).interestId);
          break;
          
         //interests
        case event.httpMethod === 'GET' && event.path === interestsPath:
          response = await getInterests();
          break;
        default:
            response = buildResponse.apply(404,'404 Not Found');       
        }
        return response;
}


async function getUser(userId){
    const params = {
        TableName: dynamodbUserTableName,
        Key:{
            'userId': userId
        }
    }
    return await dynamodb.get(params).promise().then((response) => { 
        return buildResponse(200, response.Item);
    },(error) =>{
        console.error('Do our custome error handling here.',error);
    });  
}

async function getUsers() {
  const params = {
    TableName: dynamodbUserTableName
  }
  const allUsers = await scanDynamoRecords(params, []);
  const body = {
    users: allUsers
  }
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
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

async function saveUser(requestBody) {
  const params = {
    TableName: dynamodbUserTableName,
    Item: requestBody
  }
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

async function modifyUser(userId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbUserTableName,
    Key: {
      'userId': userId
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await dynamodb.update(params).promise().then((response) => {
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

async function deleteUser(userId) {
  const params = {
    TableName: dynamodbUserTableName,
    Key: {
      'userId': userId
    },
    ReturnValues: 'ALL_OLD'
  }
  return await dynamodb.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}


//interset function
async function getInterest(interestId) {
  const params = {
    TableName: dynamodbInterestTableName,
    Key: {
      'interestId': interestId
    }
  }
  return await dynamodb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  });
}

async function getInterests() {
  const params = {
    TableName: dynamodbInterestTableName
  }
  const allInterests = await scanDynamoRecords(params, []);
  const body = {
    interests: allInterests
  }
  return buildResponse(200, body);
}

async function saveInterest(requestBody) {
  const params = {
    TableName: dynamodbInterestTableName,
    Item: requestBody
  }
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

async function modifyInterest(interestId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbInterestTableName,
    Key: {
      'interestId': interestId
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await dynamodb.update(params).promise().then((response) => {
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

async function deleteInterest(interestId) {
  const params = {
    TableName: dynamodbInterestTableName,
    Key: {
      'interestId': interestId
    },
    ReturnValues: 'ALL_OLD'
  }
  return await dynamodb.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}