var baseURL = "https://owner-api.teslamotors.com"

function teslaRequest(url, method, payload) {
  var options = { "method": method,
                 "contentType": "application/json",
                 "headers": {
                   "User-Agent": "TeslaGAS",
                   "Authorization": "Bearer "+PS.getProperty("access_token"),
                 },
                 "muteHttpExceptions": false
                 
                }
  
  payload ? options.payload = JSON.stringify(payload) : "";
  var final_url = baseURL + url;
  var result = UrlFetchApp.fetch(final_url, options).getContentText()
  
  var p = JSON.parse(result)
  
  if (p.response) return p.response;
  return p;
}
