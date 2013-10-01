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
        			var img = data.query.results.div.div[i].div[0].div.a.img.src;
        			var link = data.query.results.div.div[i].h3.a.href.split('-')[0];
        			link = link + "-" + data.query.results.div.div[i].h3.a.content;
        			//console.log(link);
        			var rank = data.query.results.div.div[i].div[1].ul[1].li[0].img.alt;
        			$('#dining-data').append('<li>' + '<a class="info-list"' + 'data-link="' + link + '"' + 'href="#dining-info-page">' + '<img src="' + img + '">' + '<h2>' + title + '</h2>' + '<p>' + rank + '</p>' + '</a>' + '</li>');
        			$('#dining-data').listview('refresh');
	        	}
        	});
        });     
    });
};

var getDetail = function(){
    $(document).on('pagebeforeshow', '#dining-info-page', function(){
        $('#dining-content').html('');
        $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select * from html where url='http://www.ipeen.com.tw" + localStorage.getItem('data-link') + "'" + "&format=json&diagnostics=true&callback=?", function(data) {
            console.log(data.query.results.body.div.div[6].table);
            //alert(data.query.results.body.div.div[6].table.tr[6].td.p);           
	        var shop = data.query.results.body.div.div[6].table.tr[0].td.p;
	        var tel = data.query.results.body.div.div[6].table.tr[2].td.p;
	        if(typeof(data.query.results.body.div.div[6].table.tr[3].td.p.content) === 'object')
	        	var address = data.query.results.body.div.div[6].table.tr[3].td.p.content;
	        else if(data.query.results.body.div.div[6].table.tr[3].td.p.content === 'undefined')
                var address = '無資料';
            else
            	var address = data.query.results.body.div.div[6].table.tr[3].td.p;
            if(typeof(data.query.results.body.div.div[6].table.tr[6].td.p) !== 'undefined')
                 var time = data.query.results.body.div.div[6].table.tr[6].td.p;
            else
                 var time = "無資料";
            //var time = data.query.results.body.div.div[6].table.tr[6].td.p;
               // if(typeof(data.query.results.body.div.div[6].table.tr[8]) !== 'undefined')
               //      var media = data.query.results.body.div.div[6].table.tr[8].td.a.content;
               // else
               //      var media = "無資料";
               // if(typeof(data.query.results.body.div.div[6].table.tr[9]) !== 'undefined')
               //      var recommendation = data.query.results.body.div.div[6].table.tr[9].td.p;
               // else
               //      var recommendation = '無資料';
            $('#dining-content').html('<dvi>' + '<h3>' + shop + '<br></h3><div class="fb-like" data-href="http://kdchang.cc/mobile-web-dev/sample/whatsfood/#dining-info-page" data-width="300" data-show-faces="true" data-send="true"></div></div>' + '<h4>營業時間：</h4>' + '<p>' + time + '</p>' + '<h4>商家地址：</h4>' + '<p>' + address + '</p>' + '<a href="tel:' + tel + '"><button class="success" type="submit">電話訂位</button></a>' + '</div>');
        });
    });
};

/* Gelocation */
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
	window.map = new google.maps.Map(document.getElementById('map-canvas'), {
	  zoom: minZoomLevel,			  						
	  center: myLatlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP

	});

    var marker = new google.maps.Marker({
       position: myLatlng,
       map: map,
       title:"I'm Here"
    });

    setTimeout(function() {
        google.maps.event.trigger(map,'resize');
    }, 500);
    
});

/* CityList Page*/
$(document).on('click', '[nav-name]', function(){
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

$(document).on('click', '#search-submit', function(){
	//console.log($(this).attr('nav-name'));
	localStorage.removeItem("keywords");
	localStorage.removeItem("cityName");
	localStorage.setItem("keywords", $('#keywords').val());
	localStorage.setItem("cityName", $('#search-city').val());
	$('#city-title').text(localStorage.getItem("cityName").toUpperCase());
	console.log(localStorage.getItem("cityName"));
});

$(document).on("pageinit", "#citylist", function(event) {
  	searchResult();
});

$(document).on('click', '[data-link]', function(){
	localStorage.removeItem('data-link');
	localStorage.setItem('data-link', $(this).attr('data-link'));
	console.log(localStorage.getItem('data-link'));
}); 

/* Dining Info */
$(document).on("pageinit", "#dining-info-page", function(event) {
  	getDetail();
}); 

