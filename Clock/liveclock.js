    var myfont_face = "Arial"; //Schriftfarbe
	var myfont_size = "24"; //Schriftgrösse
	var myfont_color = "#ffffcc"; //Schriftfarbe
	var myback_color = "#000066"; //Hintergrundfarbe
	var mywidth = 150; //breite der Box
	var my12_hour = 0; //24 Stunden => 0; 12 Stunden mit AM/PM => 1

	var dn = "";
    
	document.write('<div id="LiveClock" style="width:'+mywidth+'px; background-color:'+myback_color+'"></div>');

	function show_clock() {

		var Digital = new Date(); //Aktuelle Zeit des Browsers
		var hours = Digital.getHours(); //Nimmt sich die Stunden heraus
		var minutes = Digital.getMinutes(); //Nimmt sich die Minuten heraus
		var seconds = Digital.getSeconds(); //Nimmt sich die Sekunden heraus

		if (my12_hour) {
			dn = "AM";
			if (hours > 12) { 
			    dn = "PM"; 
			    hours = hours - 12; 
			}
			if (hours == 0) { 
			    hours = 12; 
			}
		} else {
			dn = "";
		}
		if (minutes <= 9) { 
		    minutes = "0"+minutes;
		}
		if (seconds <= 9) { 
		    seconds = "0"+seconds; 
		}

		myclock = '';
		myclock += '<p style="color:'+myfont_color+'; font-family:'+myfont_face+'; font-size:'+myfont_size+'pt;">';
		myclock += hours+':'+minutes+':'+seconds+' '+dn;
		myclock += '</p>';
		
		var el = document.getElementById("LiveClock");
		el.innerHTML = myclock;
		
		
		setTimeout("show_clock()",1000); 
    }

if(document.addEventListener){
      document.addEventListener('DOMContentLoaded', show_clock, false);
} else {
      window.attachEvent('onload', show_clock, false);
}

