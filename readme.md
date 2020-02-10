# TeslaGAS
Created by Riel Notermans, Zzapps





TeslaGAS is a library that helps writing scripts that communicate with your Tesla

## Installation

Add the library to your script project

```1yBq3EEmlgUJWGk6Ygo9pDWSL7XvvxJyQti629OtrIeje6mSZJAMvDNuq```
Name it 'TeslaApi'
## Usage

```javaScript
function getCar() {
 //create api 
 var api = TeslaApi.getTeslaApi("username", "password");

 //find your vehicle ID by name
 var id = api.getVehicleId("vehicle_name");

 //connect to your car
 var car = api.getVehicle(id); 
}

```


## Current methods

```JavaScript
//set preconditioning on max (defrost mode) 
car.set_preconditioning_max(Boolean); 

//turn on or off airco
car.auto_conditioning_start()   
car.auto_conditioning_stop() 
 
//set temperatures
car.set_temps(driver_temp, passenger_temp) 

```


## Contributing
Pull requests are welcome. All API methods can use the same structure (see source), I wanted the API to be as user friendly as possible.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)