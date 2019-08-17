var owApiKey = "5962343185c76a06e93a44c01391ca1a";
// alternative var apiKeyOpenUv =  "71f0db0f2831046be5921480eebd6bed"
var apiKeyOpenUv = "e3f02c7dc79aa3fbc6dd60cc667aebac"
// alternative var apiKeyOpenUv = "8ede6d45cbf5c30f0c6aec9058b3b042";
let city = ""  
let skinType = ""
var latCoord = 0
var lonCoord = 0
var dt = 0
var uvi = 0
var zipCode = 0
var currentTime = moment().toISOString()
var st1 = ""
var st2 = ""
var st3 = ""
var st4 = ""
var st5 = ""
var st6 = ""
var temp = 0 
var maxTemp = 0 
var minTemp = 0

$("#add-info-btn").on("click", function(event) {
  event.preventDefault();
  

  // This line grabs the input from the textbox
  
    zipCode = $("#zip-name-input").val().trim();
    skinType = $("#exampleFormControlSelect1").val();
   
    // $(".my-form").empty()
    $(".my-form").html("<h3>Check the Console</h3>")


    // Creating an AJAX call when form submitted
    let owQueryUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${owApiKey}` 

        $.ajax({
          url: owQueryUrl,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log("Open Weather Query Url: " + owQueryUrl)
            
            latCoord = response.coord.lat;
            lonCoord = response.coord.lon;
            dt = response.dt;
            city = response.name;
            temp = response.main.temp;
            maxTemp = response.main.temp_max;
            minTemp = response.main.temp_min;
            temp = Math.round((temp - 273.15) * 9/5 + 32);
            minTemp = Math.round((minTemp - 273.15) * 9/5 + 32)     //Convert from Kelvin
            maxTemp = Math.round((maxTemp - 273.15) * 9/5 + 32)
            
            console.log("Current Time: " + currentTime);  
            console.log("Current Temperature: " + temp +  "°F")
            console.log("Low: " + minTemp +  "°F")
            console.log("High: " + maxTemp +  "°F")
            console.log("City: " + city)  
            console.log("Latitude: " + latCoord +  "°");
            console.log("Longitude: "+ lonCoord + "°")
             
            console.log("Skin Type: " + skinType)  
                  
            });
      
   setTimeout(uvAjax, 1000);
  
});

function uvAjax() {
  
let uvQueryUrl = `https://api.openuv.io/api/v1/uv?lat=${latCoord}&lng=${lonCoord}&dt=${currentTime}`
 $.ajax({
      type: 'GET',
      dataType: 'json',
      beforeSend: function(request) {
        request.setRequestHeader('x-access-token', 'e3f02c7dc79aa3fbc6dd60cc667aebac');
      },
      url: uvQueryUrl,
      success: function(response) {
        //handle successful response
        
        
        const data = response.result
        console.log(data);  
        console.log("Open UV Query Url: " + uvQueryUrl)
        
        st1 = data.safe_exposure_time.st1
        st2 = data.safe_exposure_time.st2
        st3 = data.safe_exposure_time.st3
        st5 = data.safe_exposure_time.st5
        st4 = data.safe_exposure_time.st4
        st6 = data.safe_exposure_time.st6
        
        // console.log(`Safe Exposure Time: 
        // Skin Type I: ${data.safe_exposure_time.st1} minutes
        // Skin Type II: ${data.safe_exposure_time.st2} minutes
        // Skin Type III: ${data.safe_exposure_time.st3} minutes
        // Skin Type IV: ${data.safe_exposure_time.st4} minutes
        // Skin Type V: ${data.safe_exposure_time.st5} minutes
        // Skin Type VI: ${data.safe_exposure_time.st6} minutes`)
        console.log(`Current UV Index: ${data.uv}`)
        console.log(`Current UV Time: ${data.uv_time}`)
        console.log(`Max UV: ${data.uv_max}`)
        console.log(`UV Max Time: ${data.uv_max_time}`)
        
        if (data.uv == 0){
        console.log("The UV Index is 0. It is Safe to go outside")
        return
        }        
        else if (data.uv > 0 && skinType == "I") {
          console.log(`Your Safe Exposure Time is ${st1} minutes.`) 
        }
        else if (data.uv > 0 && skinType == "II") {
          console.log(`Your Safe Exposure Time is ${st2} minutes.`)
        }
        else if (data.uv > 0 && skinType == "III") {
          console.log(`Your Safe Exposure Time is ${st3} minutes.`)
        }
        else if (data.uv > 0 && skinType == "IV") {
          console.log(`Your Safe Exposure Time is ${st4} minutes.`)
        }
        else if (data.uv > 0 && skinType == "V") {
          console.log(`Your Safe Exposure Time is ${st5} minutes.`)
        }
        else if (data.uv > 0 && skinType == "VI") {
          console.log(`Your Safe Exposure Time is ${st6} minutes.`)
        }
      }
  }); 
}
