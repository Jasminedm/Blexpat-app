// API WEB LINKS
// https://apidocs.geoapify.com/docs/places/#url-examples
// https://developers.amadeus.com/self-service/category/destination-content/api-doc/points-of-interest/api-reference
// https://developers.google.com/maps/documentation/javascript/places#find_place_requests
// https://developers.google.com/maps/documentation/javascript/geocoding#Geocoding
// LINK TO THIS PROJECT IN GOOGLE API ACCT https://console.cloud.google.com/google/maps-apis/credentials?project=blexpat

const coordinates = { lat: 42.361145, lng: -71.057083 };
    const mapOptions = {
      center: coordinates,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
  
    // creating our map
    const map = new google.maps.Map(
      document.getElementById("googleMap"),
      mapOptions
    );

document.querySelector(".get").addEventListener("click", () => {
    console.log("getting map...");
    // set map options, we're gunna start the map in boston
  
    
    const geoCoder =  new google.maps.Geocoder();
  console.log(geoCoder, "t")
    // getting directions
    var directionsService = new google.maps.DirectionsService();
  
    //create a DirectionsRenderer object which we will use to display the directions
    var directionsDisplay = new google.maps.DirectionsRenderer();
  
    //attach the DirectionsRenderer to the map
    directionsDisplay.setMap(map);
  
    getRoute(directionsDisplay, directionsService, coordinates);
  });

  async function getAttractions(){
    
    // creating our map
    
    const geoCoder =  new google.maps.Geocoder();
  console.log(geoCoder, "t")
 const addr = document.querySelector(".place").value
    const newCoordinates = await geoCoder.geocode({address: addr})
    console.log(newCoordinates)
    const lat = newCoordinates.results[0].geometry.location.lat()
    const lng = newCoordinates.results[0].geometry.location.lng()
    map.setCenter({lat: lat, lng: lng})
    console.log(newCoordinates.results[0].geometry.location.lat(), newCoordinates.results[0].geometry.location.lng())

    var location = newCoordinates.results[0].geometry.location;
    var requestx = {
     location: location,
      radius: '500',
      query: (input4.value || 'restaurant')
    };
  
    service = new google.maps.places.PlacesService(map);
    service.textSearch(requestx, callback);
  }
  
  async function getRoute(directionsDisplay, directionsService, coordinates) {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
  

  
  
    // make a request in the format google api needs
    console.log(from)
    const request = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    };
  
    // send the request to google api's route method
    directionsService.route(request, (result, status) => {
        console.log(status) 
      if (status == google.maps.DirectionsStatus.OK) {
        // if everythings good, then get the distance and time it'll take to get there
        console.log(result, "result");
        const distanceInMiles = result.routes[0].legs[0].distance.text;
        const steps = result.routes[0].legs[0].steps;
        const ul = document.querySelector("#steps");
        for (let i = 0; i < steps.length; i++) {
          let instruction = document.createElement("li");
          instruction.innerHTML = steps[i].instructions;
          ul.appendChild(instruction);
        }
  
        const output = document.querySelector("#output");
        output.innerText = `It'll take you ${distanceInMiles} to get from ${from} to ${to}.`;
  
        //display route
        directionsDisplay.setDirections(result);
      } else {
        //delete route from map
  
        directionsDisplay.setDirections({ routes: [] });
  
        //recenter map in Boston
        map.setCenter(coordinates);
  
        //show error message
        output.innerText = "Could not retrieve driving distance.";
      }
    });
    console.log(request, "what we send to the api");
  }
  
  // autocomplete all inputs
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      let getImg = document.querySelector(".pictures")
      getImg.innerHTML = ""
      //grab pictures quereyselector
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        //make new pic element, set src to results[i].photos[0].getUrl()
        //append img element to pic div
        let listItem = document.createElement('li')
        let paragraph = document.createElement('p')
        paragraph.innerText = results[i].name
        let placePicture = document.createElement('img')
        if(results[i].photos){
          placePicture.src = results[i].photos[0].getUrl()
        }else {
          placePicture.src = 'https://i.pinimg.com/736x/62/b9/85/62b9851f99c3fd160709b4680a908f00--night-nurse-mystery-box.jpg'
        }
        
        
        listItem.appendChild(placePicture)
        listItem.appendChild(paragraph)
        getImg.appendChild(listItem)
        // createMarker(results[i]);
        // console.log(place)
      }
      console.log(results)
      console.log(results[2].photos[0].getUrl())
    }
  }

  const input1 = document.getElementById("from");
  const autocomplete1 = new google.maps.places.Autocomplete(input1);
  
  const input2 = document.getElementById("to");
  const autocomplete2 = new google.maps.places.Autocomplete(input2)

  const input3 = document.getElementById("place");
  const autocomplete3 = new google.maps.places.Autocomplete(input3)

  const input4 = document.getElementById("category");