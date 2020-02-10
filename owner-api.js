
/**
 * Get an object that acts as an authenticated interface for the owner-api from teslamotors.
 *
 * @constructor
 * @param {string} email the user email address (for authentication)
 * @param {string} password the user password (for authentication)
 * @return {object} an authenticated interface with a Firestore project
 */
function getTeslaApi (email, password) {
  return new TeslaApi(email, password)
}

/**
 * An object that acts as an authenticated interface for the owner-api from teslamotors.
 *
 * @constructor
 * @param {string} email the user email address (for authentication)
 * @param {string} password the user password (for authentication)
 * @return {object} an authenticated interface with a Firestore project
 */
var TeslaApi = function (email, password) {
  /**
   * The authentication token used for accessing Firestore.
   */
  const authToken = getAuthToken_(email, password)
  const baseUrl = "https://owner-api.teslamotors.com";
  var id = null;
  var vehicle = null;
  
  //set the constants in prototype
  this.authToken = authToken;
  this.baseUrl = baseUrl;
  /**
  * Send a request according to https://tesla-api.timdorr.com/api-basics/
  * @param {string} path the path to the collection
  * @return {object} an array of the documents in the collection
  */
  this.request = function () {  
    return new TeslaRequest_(baseUrl, authToken)     
  }
  
 /**
  * Returns id by displayname
  * @param {string} path the path to the collection
  * @return {object} an array of the documents in the collection
  */
  
  this.getVehicleId = function(display_name) {
    
     var req_ = new TeslaRequest_(baseUrl, authToken)
     var req = req_.get("/api/1/vehicles")
     
     if (req.response) {
       for (var i=0; i<req.response.length; i++) {
         var car = req.response[i]
         if (car.display_name == display_name) {
          return car.id_s; 
         }         
       }
     } else {
      return null 
     }
    return null
      
  }
  
  /**
  * Sets vehicle in api object
  * @param {string} id of the vehicle
  * @return {object} the car interface with specific car methods
  */
  
  this.getVehicle = function(id) {
    if (!id) {
      throw "No id provided"
    }
    
    var req_ = new TeslaRequest_(baseUrl, authToken);
    var req = req_.get("/api/1/vehicles/"+id)
    
    
    if (req.response.id == id) {
      this.id = id;
      this.vehicle = req.response;
      return new car(this);   
    }
    throw "Could not return this car";
  }
  
  
  
  
  /**
   * Get a list of all documents in a collection.
   *
   * @param {string} path the path to the collection
   * @return {object} an array of the documents in the collection
   */
  this.getDocuments = function (path) {
    return this.query(path).execute()
  }

  /**
   * Get a list of all IDs of the documents in a path
   *
   * @param {string} path the path to the collection
   * @return {object} an array of IDs of the documents in the collection
   */
  this.getDocumentIds = function (path) {
    const request = new FirestoreRequest_(baseUrl, authToken)
    return getDocumentIds_(path, request)
  }

  /**
   * Create a document with the given fields and an auto-generated ID.
   *
   * @param {string} path the path where the document will be written
   * @param {object} fields the document's fields
   * @return {object} the Document object written to Firestore
   */
  this.createDocument = function (path, fields) {
    const request = new FirestoreRequest_(baseUrl, authToken)
    return createDocument_(path, fields, request)
  }

  /**
   * Update/patch a document at the given path with new fields.
   *
   * @param {string} path the path of the document to update.
   *                      If document name not provided, a random ID will be generated.
   * @param {object} fields the document's new fields
   * @param {boolean} if true, the update will use a mask
   * @return {object} the Document object written to Firestore
   */
  this.updateDocument = function (path, fields, mask) {
    const request = new FirestoreRequest_(baseUrl, authToken)
    return updateDocument_(path, fields, request, mask)
  }

  /**
   * Run a query against the Firestore Database and
   *  return an all the documents that match the query.
   * Must call .execute() to send the request.
   *
   * @param {string} path to query
   * @return {object} the JSON response from the GET request
   */
  this.query = function (path) {
    const request = new FirestoreRequest_(baseUrl, authToken)
    return query_(path, request)
  }

  /**
   * Delete the Firestore document at the given path.
   * Note: this deletes ONLY this document, and not any subcollections.
   *
   * @param {string} path the path to the document to delete
   * @return {object} the JSON response from the DELETE request
   */
  this.deleteDocument = function (path) {
    const request = new FirestoreRequest_(baseUrl, authToken)
    return deleteDocument_(path, request)
  }
}

var car = function(api) {
  const authToken = api.authToken;
  const baseUrl = api.baseUrl;
  var id = api.id;
  var vehicle = api.vehicle;
  var req = new TeslaRequest_(baseUrl, authToken);

  this.checkWake = function() {   
   var url = "/api/1/vehicles/"+api.id+"/wake_up" 
   if (vehicle.state !== "awake") {
     
     var s = req.clone().post(url);
     
   }
  };
  
  this.command  = function()  {    
     var url = "/api/1/vehicles/"+api.id+"/command/"
     return new TeslaRequest_(baseUrl+url, authToken)
  }
  
  this.auto_conditioning_start = function() {   
    this.checkWake();
    var url = "/api/1/vehicles/"+api.id+"/command/auto_conditioning_start";
     var req_ = new TeslaRequest_(baseUrl, authToken);
    
     return req_.post(url)
  }
  
  this.auto_conditioning_stop = function()  {    
    var url = "/api/1/vehicles/"+api.id+"/command/auto_conditioning_stop"
     var req_ = new TeslaRequest_(baseUrl, authToken)
     return req_.post(url)
  }
  
  this.set_temps = function(driver_temp, passenger_temp) {  
    
    var url = "/api/1/vehicles/"+api.id+"/command/set_temps"
     var req_ = new TeslaRequest_(baseUrl, authToken)
     return req_.post(url, {driver_temp:driver_temp, passenger_temp:passenger_temp})
  }
  
  this.set_preconditioning_max = function(on_off)  {    
    var url = "/api/1/vehicles/"+api.id+"/command/set_preconditioning_max"
     var req_ = new TeslaRequest_(baseUrl, authToken)
     return req_.post(url, {on:on_off})
  }
  
}
