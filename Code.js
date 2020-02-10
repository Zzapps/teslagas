/* GAS library to connect to tesla API */


function test() {
  var api = new TeslaApi("user" ,"pass")

  var s = api.request()
  var p = s.get("/api/1/vehicles")
  
  
}
