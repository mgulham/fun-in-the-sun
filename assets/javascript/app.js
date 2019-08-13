var apiKeyOpenUv = "8ede6d45cbf5c30f0c6aec9058b3b042";
// 71f0db0f2831046be5921480eebd6bed
var owApiKey = "5962343185c76a06e93a44c01391ca1a";
let city = ""  
let skinType = ""
var latCoord = 0
var lonCoord = 0
var dt = 0
var uvi = 0
var zipCode = 0
var currentTime = moment().toISOString()


console.log(currentTime);

$("#add-info-btn").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  
    zipCode = $("#zip-name-input").val().trim();
    skinType = $("#exampleFormControlSelect1").val();

console.log(city);

let owQueryURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${owApiKey}` 
  
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
            console.log(skinType)  
            console.log(city)        
            });
      
   uvAjax();
  //  hourlyUv();
});

let uvQueryUrl = `https://api.openuv.io/api/v1/uv?lat=${latCoord}&lng=${lonCoord}&dt=${currentTime}`
  
function uvAjax() {

 $.ajax({
      type: 'GET',
      dataType: 'json',
      beforeSend: function(request) {
        request.setRequestHeader('x-access-token', '8ede6d45cbf5c30f0c6aec9058b3b042');
      },
      url: uvQueryUrl,
      success: function(response) {
        //handle successful response
        console.log(response);
        console.log(skinType);
        console.log(city);
        console.log(uvQueryUrl);

      
    },
}); 

}
