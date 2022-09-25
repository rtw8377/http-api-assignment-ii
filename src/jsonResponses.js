const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// get request for user in json
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

// POST request
const addUser = (request, response, body) => {
  // default message
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  // checks to see if both the body and age are filled in
  // returns with 400 error code if both are empty
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code
  let responseCode = 204;

  // if the user does not exist set code 201 and create an empty user
  if (!users[body.name]) {
    responseCode = 201;
    users[body.name] = {};
  }

  // add fields for the users name and age
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  // if the response includes the 201 status code, use this message response
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// runs if the page could not be found
const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for could not be located.',
    id: 'not found',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  addUser,
  notReal,
};
