// alert('hello world')

// var config = {
//     apiKey: "AIzaSyDhBBrXvKACgPNZr66ia334fqZQVAqWthg",
//     authDomain: "group-project-1515725741271.firebaseapp.com",
//     databaseURL: "https://group-project-1515725741271.firebaseio.com",
//     projectId: "group-project-1515725741271",
//     storageBucket: "group-project-1515725741271.appspot.com",
//     messagingSenderId: "73096630745"
//   };
//   firebase.initializeApp(config);

// var airports = [
//   { value: 'Los Angelos International', data: 'LAX'},
//   { value: 'Orange County International', data: 'SNA'},
//   { value: 'O_Hare International Airport', data: 'ORD'},
//
// ];



// var swaggerClient = new SwaggerClient(specUrl);
var apiKey = '2JLTZ1Hrikb8Fj3JzIApqvYUP7RfOdom';

var departure = "";
var destination = "";
let departure_date ="";
let return_date ="";
// uses the input of the user to pass into the api parameter for departure
$("#departureInput").change(function(){
  departure = $(this).val();
  console.log("this is user input: " + departure)
}); // closes change function

// uses the input of the user to pass into the api parameter for destination
$("#destinationInput").change(function(){
  destination = $(this).val();
  console.log("this is user input: " + destination)
}); // closes change function

$("#departureDate").change(function(){
  departure_date = $(this).val();
  console.log(departure_date);
});

$("#returnDate").change(function(){
  return_date = $(this).val();
  console.log(departure_date);
});

$("#cost").change(function(){
  cost = $(this).val();
  console.log(cost);
});

const getFlights = () => {
  console.log('click');
  $.ajax({
    url: `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${apiKey}&origin=${departure}&destination=${destination}&departure_date=${departure_date}&return_date=2018&arrive_by=${departure_date}T05%3A25&return_by=${return_date}T05%3A25&nonstop=false&max_price=${cost}&currency=USD&travel_class=ECONOMY&number_of_results=5`,

    method: 'GET',
  }).done(function response(response){
    console.log(response);
    let prices = response.results[0].fare.total_price;
    let departing = response.results[0].itineraries[0].inbound.flights[0].departs_at;
    let returning = response.results[0].itineraries[0].outbound.flights[0].departs_at;

    console.log(prices);
// Loop through Key-Value pairs
    for (i = 0; i <response.results.length; i++) {
      // Access and store total_price
      prices = response.results[i].fare.total_price;
      departing = response.results[i].itineraries[i].inbound.flights[i].departs_at;
      returning = response.results[i].itineraries[i].outbound.flights[i].departs_at;

      console.log(`prices: ${prices}`);
      console.log(`departing: ${departing}`);
      console.log(`returning: ${returning}`);

      // Add elements to table
       $("#trip-table > tbody").append(`<tr><td>${destination}</td><td>${departure}</td><td>${departing}</td><td>${returning}</td><td>${prices}</td></tr>`
    )}
});
  } // closes getDeparture
