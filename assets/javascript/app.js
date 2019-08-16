var apiKeyOpenUv = "71f0db0f2831046be5921480eebd6bed";
var owApiKey = "5962343185c76a06e93a44c01391ca1a";
var otheropenuvAPI ="c605ae3d55cb5b25943f217559b96eae"
let city = ""  
var latCoord = 0;
var lonCoord = 0;
var zipCode = 0;
let uvIndex = 0;
var uvIndexTime = "";
var uvMax = 0;
var uvMaxTime = "";
var currentTime = moment().toISOString();
var currentTimeStd = moment(currentTime).format("hh:mm");
let skinType= "";
let skinType1 = 0;
var skinType2 = 0;
var skinType3 = 0;
var skinType4 = 0;
var skinType5 = 0;
var skinType6 = 0;


console.log("CURRENT TIME: " + currentTime);
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


$("#add-info-btn").on("click", function(event) {
  event.preventDefault();
  // $(".information-form").html("");
  // This line grabs the input from the textbox
  
    skinType = $("#skin-type-input").val();
    zipCode = $("#zipCode-input").val();

  console.log(skinType);

  let owQueryURL = `http://api.openweathermap.org/data/2.5/weather?q=${zipCode},US&APPID=${owApiKey}` 
  // let owQueryURL2 = `https://tile.openweathermap.org/map/{temp_new}/{z}/{x}/{y}.png?appid=${owApiKey}`
  // Creating an AJAX call for the specific villain button being clicked
        
        $.ajax({
          url: owQueryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            latCoord = response.coord.lat;
            lonCoord = response.coord.lon;
            console.log(latCoord);
            console.log(lonCoord);  
            });
            setTimeout(uvAjax, 1000);
});

function uvAjax() {
  //  setTimeout(function() {alert("Called after delay.")},20000);
   $.ajax({
    type: 'GET',
    dataType: 'json',
    beforeSend: function(request) {
      request.setRequestHeader('x-access-token', '8e63655660822c137657b44e1d349605');
    },
    url: `https://api.openuv.io/api/v1/uv?lat=${latCoord}&lng=${lonCoord}&dt=${currentTime}`,
    success: function(response) {
      //handle successful response
      uvIndex = response.result.uv;
      uvIndexTime = response.result.uv_time;
      uvMax = response.result.uv_max;
      uvMaxTime = response.result.uv_max_time;
      skinType1 = response.result.safe_exposure_time.st1;
      skinType2 = response.result.safe_exposure_time.st2;
      skinType3 = response.result.safe_exposure_time.st3;
      skinType4 = response.result.safe_exposure_time.st4;
      skinType5 = response.result.safe_exposure_time.st5;
      skinType6 = response.result.safe_exposure_time.st6;
      console.log(response);
      console.log(response.result.uv);
      console.log(response.result.uv_max);
      console.log(response.result.safe_exposure_time.st1); 
   }
  });
  setTimeout(updateUVData, 1000);
  }

function updateUVData () {
  // d3.select("#vitamin-importance").transition().style("color", "red");
  var uvMaxTimeNormal = moment(uvMaxTime);
  console.log(uvMaxTimeNormal);
  var local = moment.utc(uvMaxTime).local();
  console.log(local);
  var dateComponent = uvMaxTimeNormal.utc().format('hh:mm:ss');
  var timeComponent = uvMaxTimeNormal.utc().format('HH:mm:ss');
  var stillUtc = moment.utc(dateComponent).toDate();
  var localUVMaxTime = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
  $("#uv-time").html("<p>" + currentTimeStd +  " AM on " + dateComponent + " at " + zipCode + "<p>");
  $("#uv-max-time").html("<p>" + localUVMaxTime + " at " + zipCode + "<p>");
  $("#uvmax-alert-display").html("<h1>" + uvMax + "<h1>");
  // vitamin D logic for skin I
  if (0 <= uvIndex && uvIndex < 3 && skinType === "I" ) {
    $("#alert-display").empty();
    $("#vitamin-d-source").empty();
    $("#vitamin-importance").empty();
    $("#vitamin-importance").html("<p id='vitamin-importance'> UV radiation plays a crucial role in initiaing the synthesis of vitamin D. Since darker skin blocks more sunlight, it takes longer for people with a higher numbered skin type to obtain the sufficient vitamin D soley from the sun. Source: (https://en.wikipedia.org/wiki/Vitamin_D#Biosynthesis)</p>")
    $("#alert-display").html("<img id='vitamin-info-image' src='https://image.slidesharecdn.com/vitd-140522120336-phpapp02/95/vit-d-5-638.jpg?cb=1400760634' width='450px'/>");
    $("#vitamin-d-source").html("<figcaption id='vitamin-d-source'> https://www.slideshare.net/nileshchandra2/vit-d-35009463 </figcaption>");
    $("#vitamin-time").html("<h1>" + 15 + "-" + 20 + " mins <h1>");
  };
  if (3 <= uvIndex && uvIndex < 6 && skinType === "I" ) {
    $("#alert-display").empty();
    $("#alert-display").html("<img id='vitamin-info-image' src='https://image.slidesharecdn.com/vitd-140522120336-phpapp02/95/vit-d-5-638.jpg?cb=1400760634' width='450px'/>");
    $("#vitamin-time").html("<h1>" + 10 + "-" + 15 + " mins <h1>");
  };
  if (6 <= uvIndex && uvIndex < 8 && skinType === "I" ) {
    $("#alert-display").empty();
    $("#alert-display").html("<img id='vitamin-info-image' src='https://image.slidesharecdn.com/vitd-140522120336-phpapp02/95/vit-d-5-638.jpg?cb=1400760634' width='450px'/>");
    $("#vitamin-time").html("<h1>" + 5 + "-" + 10 + " mins <h1>");
  };
  if (8 <= uvIndex && uvIndex < 11 && skinType === "I" ) {
    $("#alert-display").empty();
    $("#alert-display").html("<img id='vitamin-info-image' src='https://image.slidesharecdn.com/vitd-140522120336-phpapp02/95/vit-d-5-638.jpg?cb=1400760634' width='450px'/>");
    $("#vitamin-time").html("<h1>" + 2 + "-" + 8 + " mins <h1>");
  };
  if (11 <= uvIndex && uvIndex < 15 && skinType === "I" ) {
    $("#alert-display").empty();
    $("#alert-display").html("<img id='vitamin-info-image' src='https://image.slidesharecdn.com/vitd-140522120336-phpapp02/95/vit-d-5-638.jpg?cb=1400760634' width='450px'/>");
    $("#vitamin-time").html("<h1>" + 1 + "-" + 5 + " mins <h1>");
  };
  // skin type I table logic
  
  if (0 <= uvIndex && uvIndex <3 && skinType === "I" ) {
    var newRow1 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType1} mins`),
    );
  $("#skin-table > tbody").append(newRow1);
  }
  if (3 <= uvIndex && uvIndex <6 && skinType === "I" ) {
    var newRow2 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType1} mins`),
    );
  $("#skin-table > tbody").append(newRow2);
  }
  if (6 <= uvIndex && uvIndex <8 && skinType === "I" ) {
    var newRow3 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType1} mins`),
    );
  $("#skin-table > tbody").append(newRow3);
  }
  if (8 <= uvIndex && uvIndex <11 && skinType === "I" ) {
    var newRow4 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType1} mins`),
    );
  $("#skin-table > tbody").append(newRow4);
  }
  if (11 <= uvIndex && uvIndex <15 && skinType === "I" ) {
    var newRow5 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType1} mins`),
    );
  $("#skin-table > tbody").append(newRow5);
  }
  // skin type 2 table logic

  if (0 <= uvIndex && uvIndex <3 && skinType === "II" ) {
    var newRow1 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType2} mins`),
    );
  $("#skin-table > tbody").append(newRow1);
  }
  if (3 <= uvIndex && uvIndex <6 && skinType === "II" ) {
    var newRow2 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType2} mins`),
    );
  $("#skin-table > tbody").append(newRow2);
  }
  if (6 <= uvIndex && uvIndex <8 && skinType === "II" ) {
    var newRow3 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType2} mins`),
    );
  $("#skin-table > tbody").append(newRow3);
  }
  if (8 <= uvIndex && uvIndex <11 && skinType === "II" ) {
    var newRow4 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType2} mins`),
    );
  $("#skin-table > tbody").append(newRow4);
  }
  if (11 <= uvIndex && uvIndex <15 && skinType === "II" ) {
    var newRow5 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType2} mins`),
    );
  $("#skin-table > tbody").append(newRow5);
  }

    // skin type 3 table logic

    if (0 <= uvIndex && uvIndex <3 && skinType === "III" ) {
      var newRow1 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType3} mins`),
      );
    $("#skin-table > tbody").append(newRow1);
    }
    if (3 <= uvIndex && uvIndex <6 && skinType === "III" ) {
      var newRow2 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType3} mins`),
      );
    $("#skin-table > tbody").append(newRow2);
    }
    if (6 <= uvIndex && uvIndex <8 && skinType === "III" ) {
      var newRow3 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType3} mins`),
      );
    $("#skin-table > tbody").append(newRow3);
    }
    if (8 <= uvIndex && uvIndex <11 && skinType === "III" ) {
      var newRow4 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType3} mins`),
      );
    $("#skin-table > tbody").append(newRow4);
    }
    if (11 <= uvIndex && uvIndex <15 && skinType === "III" ) {
      var newRow5 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType3} mins`),
      );
    $("#skin-table > tbody").append(newRow5);
    }
      // skin type 4 table logic

  if (0 <= uvIndex && uvIndex <3 && skinType === "IV" ) {
    var newRow1 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType4} mins`),
    );
  $("#skin-table > tbody").append(newRow1);
  }
  if (3 <= uvIndex && uvIndex <6 && skinType === "IV" ) {
    var newRow2 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType4} mins`),
    );
  $("#skin-table > tbody").append(newRow2);
  }
  if (6 <= uvIndex && uvIndex <8 && skinType === "IV" ) {
    var newRow3 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType4} mins`),
    );
  $("#skin-table > tbody").append(newRow3);
  }
  if (8 <= uvIndex && uvIndex <11 && skinType === "IV" ) {
    var newRow4 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType4} mins`),
    );
  $("#skin-table > tbody").append(newRow4);
  }
  if (11 <= uvIndex && uvIndex <15 && skinType === "IV" ) {
    var newRow5 = $("<tr>").append(
      $("<td>").text(`${currentTimeStd} AM`),
      $("<td>").text(skinType),
      $("<td>").text(uvIndex),
      $("<td>").text(`${skinType4} mins`),
    );
  $("#skin-table > tbody").append(newRow5);
  }
    // skin type 5 table logic

    if (0 <= uvIndex && uvIndex <3 && skinType === "V" ) {
      var newRow1 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType5} mins`),
      );
    $("#skin-table > tbody").append(newRow1);
    }
    if (3 <= uvIndex && uvIndex <6 && skinType === "V" ) {
      var newRow2 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType5} mins`),
      );
    $("#skin-table > tbody").append(newRow2);
    }
    if (6 <= uvIndex && uvIndex <8 && skinType === "V" ) {
      var newRow3 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType5} mins`),
      );
    $("#skin-table > tbody").append(newRow3);
    }
    if (8 <= uvIndex && uvIndex <11 && skinType === "V" ) {
      var newRow4 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType5} mins`),
      );
    $("#skin-table > tbody").append(newRow4);
    }
    if (11 <= uvIndex && uvIndex <15 && skinType === "V" ) {
      var newRow5 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType5} mins`),
      );
    $("#skin-table > tbody").append(newRow5);
    }
    // skin type 6 table logic

    if (0 <= uvIndex && uvIndex <3 && skinType === "VI" ) {
      var newRow1 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType6} mins`),
      );
    $("#skin-table > tbody").append(newRow1);
    }
    if (3 <= uvIndex && uvIndex <6 && skinType === "VI" ) {
      var newRow2 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType6} mins`),
      );
    $("#skin-table > tbody").append(newRow2);
    }
    if (6 <= uvIndex && uvIndex <8 && skinType === "VI" ) {
      var newRow3 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType6} mins`),
      );
    $("#skin-table > tbody").append(newRow3);
    }
    if (8 <= uvIndex && uvIndex <11 && skinType === "VI" ) {
      var newRow4 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType6} mins`),
      );
    $("#skin-table > tbody").append(newRow4);
    }
    if (11 <= uvIndex && uvIndex <15 && skinType === "VI" ) {
      var newRow5 = $("<tr>").append(
        $("<td>").text(`${currentTimeStd} AM`),
        $("<td>").text(skinType),
        $("<td>").text(uvIndex),
        $("<td>").text(`${skinType6} mins`),
      );
    $("#skin-table > tbody").append(newRow5);
    } 
}