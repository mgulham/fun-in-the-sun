var apiKeyOpenUv = "71f0db0f2831046be5921480eebd6bed";
var owApiKey = "5962343185c76a06e93a44c01391ca1a";
          

          //API Key would not link to java on my deploy link for some reason
var owQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5962343185c76a06e93a44c01391ca1a"
          


        // Creating an AJAX call for the specific villain button being clicked
        $(document).ready(function() {
        $.ajax({
          url: owQueryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            let latCoord = response.coord.lat;
            let lonCoord = response.coord.lon;
            console.log(latCoord);
            console.log(lonCoord);           
            });
        });

