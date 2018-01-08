var app = angular.module('autoTimeLoggingApp');
app.controller("HybridTeamController", ['$scope', '$rootScope', '$http', '$timeout', '$interval',
                                        function(sc, rs, hp, tmo, inv) {
	
	sc.timeSpentGTMeeting =0;
	sc.timeSpentGTWebinar =0;
	sc.spinnerGTM = $('#inputGTM');
	sc.spinnerGTW = $('#inputGTW');
	sc.timeEstimatedGTM = parseInt(sc.spinnerGTM.val(), 10);
	sc.timeEstimatedGTW = parseInt(sc.spinnerGTW.val(), 10);
	
	$('#datetimepicker6').datetimepicker();
    $('#datetimepicker7').datetimepicker();
    $("#datetimepicker6").on("dp.change", function (e) {
        $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker7").on("dp.change", function (e) {
        $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
    });
    
    sc.modalCancel = function() {
    	
    }
    sc.modalSave = function() {
    	
    }
	
    sc.getDurations = function() {
	    
	    hp.get("http://jbossews-hybridteam.rhcloud.com/getdurations.json")
        .success(function (response) {
        	sc.durations = response;
            console.log(sc.durations.webinarHours);
            sc.timeSpentGTWebinar = sc.durations.webinarHours;
            sc.timeSpentGTMeeting = sc.durations.meetingHours;
            
            console.log("Meeting timeSpent = " + sc.timeSpentGTMeeting);
    	    console.log("Meeting timeEstimated = " + sc.timeEstimatedGTM);
            var perctGTM = Math.round(sc.timeSpentGTMeeting/sc.timeEstimatedGTM * 100);
    	    console.log("Percentage = " + perctGTM);
    	    
    	    if (perctGTM >= 90 && perctGTM < 100) {  $("#gtmeetingbar").css('background', '#FFCC00');	}
    	    else if (perctGTM >= 100) {  $("#gtmeetingbar").css('background', '#FF0000');	}
    	    else if (perctGTM < 90) {  $("#gtmeetingbar").css('background', '#00CC00');	}
    	    	 	    	    
    	    $("#gtmeetingbar").css('width', perctGTM+'%');
    	    
    	    console.log("Webinar timeSpent = " + sc.timeSpentGTWebinar);
    	    console.log("Webinar timeEstimated = " + sc.timeEstimatedGTW);
            var perctGTW = Math.round(sc.timeSpentGTWebinar/sc.timeEstimatedGTW * 100);
    	    console.log("Percentage = " + perctGTW);
    	    
    	    if (perctGTW >= 90 && perctGTW < 100) {  $("#gtwebinarbar").css('background', '#FFCC00');	}
    	    else if (perctGTW >= 100) {  $("#gtwebinarbar").css('background', '#FF0000');	}
    	    else if (perctGTW < 90) {  $("#gtwebinarbar").css('background', '#00CC00');	}
    	    	 	    	    
    	    $("#gtwebinarbar").css('width', perctGTW+'%');
    	    
        });	
		
	};
	sc.start = function() {
		sc.getDurations();
		sc.gtwebinarTimerCall = inv(sc.getDurations, 120000); 
	};
	sc.stop = function() {  
	       inv.cancel(sc.gtwebinarTimerCall); 
	};
	
	$("#upbuttonGTM").on('click', function() {
		sc.timeEstimatedGTM = parseInt(sc.spinnerGTM.val(), 10);
	    if (sc.timeEstimatedGTM >= 60) {  
	    	sc.timeEstimatedGTM =60;
	    	sc.spinnerGTM.val(60);
	    	$('#upbuttonGTM').prop('disabled', true);
	    } else if (sc.timeEstimatedGTM < 60 && sc.timeEstimatedGTM >= 0) {
	    	$('#upbuttonGTM').prop('disabled', false);
	    	$('#downbuttonGTM').prop('disabled', false);
	    	sc.spinnerGTM.val(parseInt(sc.spinnerGTM.val(), 10) + 1);
	    }
	    
	    sc.timeEstimatedGTM = parseInt(sc.spinnerGTM.val(), 10);
	    console.log("Meeting timeSpent = " + sc.timeSpentGTMeeting);
	    console.log("Meeting timeEstimated = " + sc.timeEstimatedGTM);
        var perctGTM = Math.round(sc.timeSpentGTMeeting/sc.timeEstimatedGTM * 100);
	    console.log("Percentage = " + perctGTM);
	    
	    if (perctGTM >= 90 && perctGTM < 100) {  $("#gtmeetingbar").css('background', '#FFCC00');	}
	    else if (perctGTM >= 100) {  $("#gtmeetingbar").css('background', '#FF0000');	}
	    else if (perctGTM < 90) {  $("#gtmeetingbar").css('background', '#00CC00');	}
	    	 	    	    
	    $("#gtmeetingbar").css('width', perctGTM+'%');
	    
	});

	$('#downbuttonGTM').on('click', function() {
		sc.timeEstimatedGTM = parseInt(sc.spinnerGTM.val(), 10);
	    if (sc.timeEstimatedGTM <= 0) {  
	    	sc.timeEstimatedGTM =0;
	    	sc.spinnerGTM.val(0);
	    	$('#downbuttonGTM').prop('disabled', true);
	    } else if (sc.timeEstimatedGTM <= 60 && sc.timeEstimatedGTM > 0) {	
	    	$('#upbuttonGTM').prop('disabled', false);
	    	$('#downbuttonGTM').prop('disabled', false);
	    	sc.spinnerGTM.val(parseInt(sc.spinnerGTM.val(), 10) - 1);
	    }
	    
	    sc.timeEstimatedGTM = parseInt(sc.spinnerGTM.val(), 10);
	    console.log("Meeting timeSpent = " + sc.timeSpentGTMeeting);
	    console.log("Meeting timeEstimated = " + sc.timeEstimatedGTM);
        var perctGTM = Math.round(sc.timeSpentGTMeeting/sc.timeEstimatedGTM * 100);
	    console.log("Percentage = " + perctGTM);
	    
	    if (perctGTM >= 90 && perctGTM < 100) {  $("#gtmeetingbar").css('background', '#FFCC00');	}
	    else if (perctGTM >= 100) {  $("#gtmeetingbar").css('background', '#FF0000');	}
	    else if (perctGTM < 90) {  $("#gtmeetingbar").css('background', '#00CC00');	}
	    	 	    	    
	    $("#gtmeetingbar").css('width', perctGTM+'%');
	});
	
    $("#upbuttonGTW").on('click', function() {
    	sc.timeEstimatedGTW = parseInt(sc.spinnerGTW.val(), 10);
	    if (sc.timeEstimatedGTW >= 60) {  
	    	sc.timeEstimatedGTW =60;
	    	sc.spinnerGTW.val(60);
	    	$('#upbuttonGTW').prop('disabled', true);
	    } else if (sc.timeEstimatedGTW < 60 && sc.timeEstimatedGTW >= 0) {
	    	$('#upbuttonGTW').prop('disabled', false);
	    	$('#downbuttonGTW').prop('disabled', false);
	    	sc.spinnerGTW.val(parseInt(sc.spinnerGTW.val(), 10) + 1);
	    }
	    
	    sc.timeEstimatedGTW = parseInt(sc.spinnerGTW.val(), 10);
	    console.log("Webinar timeSpent = " + sc.timeSpentGTWebinar);
	    console.log("Webinar timeEstimated = " + sc.timeEstimatedGTW);
        var perctGTW = Math.round(sc.timeSpentGTWebinar/sc.timeEstimatedGTW * 100);
	    console.log("Percentage = " + perctGTW);
	    
	    if (perctGTW >= 90 && perctGTW < 100) {  $("#gtwebinarbar").css('background', '#FFCC00');	}
	    else if (perctGTW >= 100) {  $("#gtwebinarbar").css('background', '#FF0000');	}
	    else if (perctGTW < 90) {  $("#gtwebinarbar").css('background', '#00CC00');	}
	    	 	    	    
	    $("#gtwebinarbar").css('width', perctGTW+'%');
	});

	$('#downbuttonGTW').on('click', function() {
		sc.timeEstimatedGTW = parseInt(sc.spinnerGTW.val(), 10);
	    if (sc.timeEstimatedGTW <= 0) {  
	    	sc.timeEstimatedGTW =0;
	    	sc.spinnerGTW.val(0);
	    	$('#downbuttonGTW').prop('disabled', true);
	    } else if (sc.timeEstimatedGTW <= 60 && sc.timeEstimatedGTW > 0) {	
	    	$('#upbuttonGTM').prop('disabled', false);
	    	$('#downbuttonGTW').prop('disabled', false);
	    	sc.spinnerGTW.val(parseInt(sc.spinnerGTW.val(), 10) - 1);
	    }
	    
	    sc.timeEstimatedGTW = parseInt(sc.spinnerGTW.val(), 10);
	    console.log("Webinar timeSpent = " + sc.timeSpentGTWebinar);
	    console.log("Webinar timeEstimated = " + sc.timeEstimatedGTW);
        var perctGTW = Math.round(sc.timeSpentGTWebinar/sc.timeEstimatedGTW * 100);
	    console.log("Percentage = " + perctGTW);
	    
	    if (perctGTW >= 90 && perctGTW < 100) {  $("#gtwebinarbar").css('background', '#FFCC00');	}
	    else if (perctGTW >= 100) {  $("#gtwebinarbar").css('background', '#FF0000');	}
	    else if (perctGTW < 90) {  $("#gtwebinarbar").css('background', '#00CC00');	}
	    	 	    	    
	    $("#gtwebinarbar").css('width', perctGTW+'%');
	});
	
}]);
