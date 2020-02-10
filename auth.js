/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "_" }] */
/* global FirestoreRequest_, Utilities, base64EncodeSafe_ */

/**
 * See https://tesla-api.timdorr.com/api-basics/authentication
 * @private
 * @returns {string} the access token needed for making future requests
 */
function getAuthToken_ (email, password) {
  
  var access_token = PropertiesService.getScriptProperties().getProperty("access_token")
  if (!access_token) {
     var access_token = getoAuthTokens_(email, password).access_token;
  }
 
  return access_token
}

function updateClientID_() {
  //refreshing ID from pastebin:
  //https://tesla-api.timdorr.com/api-basics/authentication
  const PS = PropertiesService.getScriptProperties();

  var keys =
      UrlFetchApp.fetch("https://pastebin.com/raw/pS7Z6yyP").getContentText().split('\r\n').forEach(function(c) {    
        var part = c.split("=");
        PS.setProperty([part[0]], part[1]);
      })  
}



function getoAuthTokens_(email, password) {
  const PS = PropertiesService.getScriptProperties();
  var payload = {
    "grant_type": "password",
    "client_id": PS.getProperty("TESLA_CLIENT_ID"),
    "client_secret": PS.getProperty("TESLA_CLIENT_SECRET"),
    "email": email,
    "password": password
  }
  
  var t = new TeslaRequest_("/oauth/token?grant_type=password", null, {payload: payload}).post()
  
  if (t.access_token) {
    PS.setProperties(t);
  }
  return t;  
}

function refreshToken_() {
  const PS = PropertiesService.getScriptProperties();
  var payload = {
    "grant_type": "password",
    "client_id": PS.getProperty("TESLA_CLIENT_ID"),
    "client_secret": PS.getProperty("TESLA_CLIENT_SECRET"),
    "refresh_token": PS.getProperty("refresh_token") 
  }
  var t = new TeslaRequest_("/oauth/token?grant_type=refresh_token", null, {payload: payload}).post()
  
  if (t.access_token) {
    PS.setProperties(t);
  } 
  return t;
}
 