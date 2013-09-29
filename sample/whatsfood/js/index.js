/* Home */
var searchResult = function(){
	//console.log(localStorage.getItem("cityName"));
	$(document).on('pagebeforeshow', "#citylist", function(){
		console.log(localStorage.getItem("cityName"));
		$('#city-title').text(localStorage.getItem("cityName").toUpperCase());
		$('#dining-data').html('');   
        $.getJSON("http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.ipeen.com.tw%2Fsearch%2F" + localStorage.getItem("cityName") + "%2F000%2F0-100-0-0%2F" + localStorage.getItem("keywords") + "%2F%3Fso%3Dsat%22%20and%20xpath%3D%22%2F%2F*%5B%40class%3D'result'%5D%22%20&format=json&diagnostics=true&callback=",function(data){
        	$.each(data.query.results.div.div, function(i){
        		//console.log(i);
        		//console.log(row);
        		//console.log(data.query.results.div.div[i].class);
        		if(data.query.results.div.div[i].class === 'serShop'){
        			//console.log(i);
        			//console.log(data.query.results.div.div[i]);
        			//console.log(data.query.results.div.div[i].div[1]);
        			//data -> serShop ->  serImg/setData 
        			var title = data.query.results.div.div[i].h3.a.content;
        			var img = data.query.results.div.div[i].div[0].div.
        				a.img.src;
        			var link = data.query.results.div.div[i].h3.a.href;
        			var rank = data.query.results.div.div[i].div[1].ul[1].li[0].img.alt;
        			$('#dining-data').append('<li>' + '<a href="#' + link + '">' + '<img src="' + img + '">' + '<h2>' + title + '</h2>' + '<p>' + rank + '</p>' + '</a>' + '</li>');
        			$('#dining-data').listview('refresh');
	        	}
        	});
        });      
    });
};
/* CityList Page*/
$("[nav-name]").on('click', function(){
	//console.log($(this).attr('nav-name'));
	//$('#dining-data').html('');
	localStorage.removeItem("cityName");
	localStorage.removeItem("keywords");
	//console.log(localStorage.getItem("cityName"));
	localStorage.setItem("cityName", $(this).attr('nav-name'));
	localStorage.setItem("keywords", '');
	$('#city-title').text(localStorage.getItem("cityName").toUpperCase());
	console.log(localStorage.getItem("cityName"));
});



$(document).on("pageinit", "#citylist", function(event) {
	// $("#search-submit").on('click', function(){
	localStorage.removeItem("keywords");
	localStorage.removeItem("cityName");
	localStorage.setItem("keywords", $('#keywords').
		val());
	localStorage.setItem("cityName", $('#search-city').
		val());
	//console.log($('#search-city').val());
// });
  	searchResult();
});


/* Gelocation */

// var getLocation = function(){

	

// };
$(document).on('pageinit', '#geo-map', function(e, data){    
   // This is the minimum zoom level that we'll allow
   	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position) {
			localStorage.removeItem("latitude");
			localStorage.removeItem("longitude");
			localStorage.setItem("latitude", position.coords.latitude);
			localStorage.setItem("longitude", position.coords.longitude);
		});
	};

	var minZoomLevel = 17;
	var myLatlng = new google.maps.LatLng(localStorage.getItem("latitude"), localStorage.getItem("longitude"));
	var map = new google.maps.Map(document.getElementById('map-canvas'), {
	  zoom: minZoomLevel,			  						
	  center: myLatlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP

	});

    var marker = new google.maps.Marker({
       position: myLatlng,
       map: map,
       title:"I'm Here"
    });
});
