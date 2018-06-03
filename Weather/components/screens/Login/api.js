import {AsyncStorage} from 'react-native';
var url = 'https://8d194182.ngrok.io/';

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
  },
  get(key){

        return AsyncStorage.getItem(key).then((value) => {
            return JSON.parse(value);
        });

    },
  getPosts(){
    return posts();
  },
  postStory(params){
    return postS(params);
  },
  updateStory(params){
    return putStory(params);
  },
  deletePost(params){
    return deletePostById(params);
  },
  locations(params){
    return getLocations(params);
  },
  locationAdd(params){
    return addNewLocation(params);
  },
  getTimezone(lat,long, googleMapsClient){
    return getLocal(lat,long, googleMapsClient);
  },
  getWeather(lat, long){
    return weather(lat, long);
  },
  getSettings(id){
    return settings(id);
  },
  postSettings(data){
    return settingsPost(data);
  },
  putSettings(data){
    return settingsPut(data);
  },
  fakeUser(data){
    return addFakeUser(data);
  }
};
async function postAuth(params){
  try{
  let response = await fetch(url +'auth', {
      method: 'POST',
      mode: 'no-cors',
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
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson;
  }
  catch(error){
    console.error(error);
  }
}

async function updateUserInfo(params){
    try{
  let response = await fetch(url + 'users', {
      method: 'PUT',
      mode: 'CORS',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson;
  }
  catch(error){
    console.error(error);
  }
}

async function deleteUser(params){
    try{
  let response = await fetch(url + 'users', {
      method: 'DELETE',
      mode: 'no-cors',
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
async function getInfo(){
  return AsyncStorage.getItem('userInfo').then((data)=>{
    return data ? JSON.parse(data): '';
  })
  .then((res)=>{
  });
}
async function posts(){
   return fetch(url + 'posts/')
        .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
}
async function postS(params){
    try{
  let response = await fetch(url + 'posts', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson;
  }
  catch(error){
    console.error(error);
  }
}
async function putStory(params){
    try{
  let response = await fetch(url + 'posts/post', {
      method: 'PUT',
      mode: 'CORS',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson;
  }
  catch(error){
    console.error(error);
  }
}
async function deletePostById(params){
    try{
  let response = await fetch(url + 'posts/post', {
      method: 'DELETE',
      mode: 'CORS',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson;
  }
  catch(error){
    console.error(error);
  }
}
async function getLocations(params){
    return fetch(url + 'locations?user_id='+params.user_id)
        .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
}
async function addNewLocation(params){
    try{
  let response = await fetch(url + 'locations', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson;
  }
  catch(error){
    console.error(error);
  }
}
async function getLocal(lat,long, googleMapsClient){
  try{
    let result = await resolveTime(lat,long, googleMapsClient);

    return result;
  }catch(error){
    console.error(error);
  }
}
function resolveTime(lat,long, googleMapsClient){
  return getLocalTime(lat,long, googleMapsClient).then(response=>response);
}
function getLocalTime(lat,long, googleMapsClient){
    return new Promise(function(resolve, reject) {
     var targetDate = new Date() // Current date/time of user computer
    var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60 ;
    var obj = [];
    obj.push(lat);
    obj.push(long);
    var data = {
      location: obj,
      timestamp: timestamp,
      language: 'en'
    };
    var time;
    googleMapsClient.timezone(data, function(err, response) {
      if (!err) {
        var offsets = response.json.dstOffset * 1000 + response.json.rawOffset * 1000 // get DST and time zone offsets in milliseconds
        var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
        time =localdate.toLocaleString();
        resolve(time);
      }
    });
  });
  }
async function weather(lat, long){
    return fetch('https://api.darksky.net/forecast/d3b5de978ee7d30a381b5ff58833753c/' + lat + ',' + long)
        .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.hourly;
      })
      .catch((error) => {
        console.error(error);
      });
}
async function settings(id){
    return fetch(url+'settings?user_id='+id)
        .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.settings[0];
      })
      .catch((error) => {
        console.error(error);
      });
}
async function settingsPost(params){
    try{
  let response = await fetch(url + 'settings', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson;
  }
  catch(error){
    console.error(error);
  }
}
async function settingsPut(params){
  try{
  let response = await fetch(url + 'settings', {
      method: 'PUT',
      mode: 'CORS',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson;
  }
  catch(error){
    console.error(error);
  }
}
async function addFakeUser(params){
    try{
  let response = await fetch(url + 'users/fake-user', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  });
  let responseJson = await response.json();
  return responseJson;
  }
  catch(error){
    console.error(error);
  }
}
module.exports = api;
