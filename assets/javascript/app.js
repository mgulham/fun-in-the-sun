var apiKeyOpenUv = "71f0db0f2831046be5921480eebd6bed";
var owApiKey = "5962343185c76a06e93a44c01391ca1a";
let city = ""  
var latCoord = 0
var lonCoord = 0
var dt = 0
var uvi = 0



$("#add-info-btn").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  
    city = $("#city-name-input").val().trim();

console.log(city);

let owQueryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${owApiKey}` 
  
// Creating an AJAX call for the specific villain button being clicked
        
        $.ajax({
          url: owQueryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            latCoord = response.coord.lat;
            lonCoord = response.coord.lon;
            dt = response.dt;
            console.log(latCoord);
            console.log(lonCoord)
            console.log(dt);           
            });
      
   uvAjax();
});


function uvAjax() {

 $.ajax({
      type: 'GET',
      dataType: 'json',
      beforeSend: function(request) {
        request.setRequestHeader('x-access-token', '71f0db0f2831046be5921480eebd6bed');
      },
      url: `https://api.openuv.io/api/v1/uv?lat=${latCoord}&lng=${lonCoord}&dt=${dt}`,
      success: function(response) {
        //handle successful response
        console.log(response);
      
    },
});

$.ajax({
  type: 'GET',
  dataType: 'json',
  beforeSend: function(request) {
    request.setRequestHeader('x-access-token', 'c605ae3d55cb5b25943f217559b96eae');
  },
  url: `https://api.openuv.io/api/v1/forecast?lat=${latCoord}&lng=${lonCoord}&dt=${dt}`,
  success: function(response) {
    console.log(response)
  },
  error: function(response) {
    // handle error response
  }
});
}



