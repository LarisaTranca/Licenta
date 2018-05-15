var url = 'https://weather-predict.azurewebsites.net/';

var api = {
    getUser(id){
    return fetch(url + 'users/user?id='+ id)
        .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  postResource(params){
    return postAuth(params);
  },
  createAccount(params){
    return postCreate(params);
  },
  updateUser(params){
    return updateUserInfo(params);
  },
  deleteUser(params){
    return deleteUser(params);
  },
  auth(params){
    return authentification(params);
  },
  sendmail(params){
    return sendMail(params);
  }
};

async function postAuth(params){
  try{
  let response = await fetch('https://0c81bb1d.ngrok.io/auth', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson.message;
  }
  catch(error){
    console.error(error);
  }
}

async function postCreate(params){
  try{
  let response = await fetch(url + 'users', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson.message;
  }
  catch(error){
    console.error(error);
  }
}

async function updateUserInfo(params){
    try{
  let response = await fetch(url + 'users', {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson.message;
  }
  catch(error){
    console.error(error);
  }
}

async function deleteUser(params){
    try{
  let response = await fetch(url + 'users', {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson.message;
  }
  catch(error){
    console.error(error);
  }
}

async function authentification(params){
  return fetch(url + 'users/auth?email='+ params.email + '&password=' + params.password)
        .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
}

async function sendMail(params){
  var link = params.forgot ? url + 'users/send?to='+ params.to + '&forgot=' + params.forgot : url + 'users/send?to='+ params.to;
  return fetch(link)
        .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
}

module.exports = api;
