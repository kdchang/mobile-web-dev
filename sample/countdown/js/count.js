var count = function(){
	var target_date = new Date("June 22, 2014").getTime();
	var days, hours, minutes, seconds;
	var countdown = document.getElementById('countdown');
	console.log(target_date);

	setInterval(function () {
	    var current_date = new Date().getTime();
	    var seconds_left = (target_date - current_date) / 1000;
	 
	    days = parseInt(seconds_left / 86400);
	    seconds_left = seconds_left % 86400;
	     
	    hours = parseInt(seconds_left / 3600);
	    seconds_left = seconds_left % 3600;
	     
	    minutes = parseInt(seconds_left / 60);
	    seconds = parseInt(seconds_left % 60);
	     
	    // format countdown string + set tag value
	    countdown.innerHTML = days + "天, " + hours + "小時, "
	    + minutes + "分, " + seconds + "秒";  
	 
	}, 1000);
	countdown.className = 'countdown';
};

count();
