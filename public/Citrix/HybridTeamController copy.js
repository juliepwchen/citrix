var app = angular.module('autoTimeLoggingApp');
app.controller("HybridTeamController", ['$scope', '$rootScope', '$http', '$timeout', '$interval',
                                        function(sc, rs, hp, tmo, inv) {
	
	sc.timeSpent =0;
	sc.getMeetingHoursTimer = function() {
	    
	    hp.get("http://jbossews-hybridteam.rhcloud.com/gotomeeting.json")
        .success(function (response) {
        	sc.meetings = response;
            console.log(sc.meetings[0].meetingId);
            
            timeSpent = 10;
            console.log("timeSpent = " + timeSpent);
    	    console.log("timeEstimated = " + timeEstimated);
            var perct = Math.round(timeSpent/timeEstimated * 100);
    	    console.log("Percentage = " + perct);
    	    
    	    if (perct >= 90 && perct < 100) {  $("#gtmeetingbar").css('background', '#FFCC00');	}
    	    else if (perct >= 100) {  $("#gtmeetingbar").css('background', '#FF0000');	}
    	    else if (perct < 90) {  $("#gtmeetingbar").css('background', '#00CC00');	}
    	    	 	    	    
    	    $("#gtmeetingbar").css('width', perct+'%');
          
        });	
		
	};
	sc.start = function() {
		sc.gtmeetingTimerCall = inv(sc.getMeetingHoursTimer, 180000);
	};
	
	$('.spinner .btn:first-of-type').on('click', function() {
	    var spinner = $(this).parent().parent().find('input');	    
	    var timeEstimated = parseInt(spinner.val(), 10);
	    if (timeEstimated >= 30) {  
	    	timeEstimated =30;
	    	spinner.val(30);
	    	$('.spinner .btn:first-of-type').prop('disabled', true);
	    } else if (timeEstimated < 30 && timeEstimated >= 0) {
	    	$('.spinner .btn:first-of-type').prop('disabled', false);
	    	$('.spinner .btn:last-of-type').prop('disabled', false);
		    spinner.val(parseInt(spinner.val(), 10) + 1);
	    }
	    
	    var timeSpent =0;
	    
	    hp.get("http://jbossews-hybridteam.rhcloud.com/gotomeeting.json")
        .success(function (response) {
        	sc.meetings = response;
            console.log(sc.meetings[0].meetingId);
            
            timeSpent = 10;
            console.log("timeSpent = " + timeSpent);
    	    console.log("timeEstimated = " + timeEstimated);
            var perct = Math.round(timeSpent/timeEstimated * 100);
    	    console.log("Percentage = " + perct);
    	    
    	    if (perct >= 90 && perct < 100) {  $("#gtmeetingbar").css('background', '#FFCC00');	}
    	    else if (perct >= 100) {  $("#gtmeetingbar").css('background', '#FF0000');	}
    	    else if (perct < 90) {  $("#gtmeetingbar").css('background', '#00CC00');	}
    	    	 	    	    
    	    $("#gtmeetingbar").css('width', perct+'%');
          
        });
	});

	$('.spinner .btn:last-of-type').on('click', function() {
	    var spinner = $(this).parent().parent().find('input');
	    var timeEstimated = parseInt(spinner.val(), 10);
	    if (timeEstimated <= 0) {  
	    	timeEstimated =0;
	    	spinner.val(0);
	    	$('.spinner .btn:last-of-type').prop('disabled', true);
	    } else if (timeEstimated <= 30 && timeEstimated > 0) {	
	    	$('.spinner .btn:first-of-type').prop('disabled', false);
	    	$('.spinner .btn:last-of-type').prop('disabled', false);
	    	spinner.val(parseInt(spinner.val(), 10) - 1);
	    }

	    var timeSpent =0;
	    
	    hp.get("http://jbossews-hybridteam.rhcloud.com/gotomeeting.json")
        .success(function (response) {
        	sc.meetings = response;
            console.log(sc.meetings[0].meetingId);
            
            timeSpent = 10;
            console.log("timeSpent = " + timeSpent);
    	    console.log("timeEstimated = " + timeEstimated);
            var perct = Math.round(timeSpent/timeEstimated * 100);
    	    console.log("Percentage = " + perct);
    	    
    	    if (perct >= 90 && perct < 100) {  $("#gtmeetingbar").css('background', '#FFCC00');	}
    	    else if (perct >= 100) {  $("#gtmeetingbar").css('background', '#FF0000');	}
    	    else if (perct < 90) {  $("#gtmeetingbar").css('background', '#00CC00');	}
    	    	 	    	    
    	    $("#gtmeetingbar").css('width', perct+'%');
          
        });
	    
	});
	
}]);
