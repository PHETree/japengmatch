 (function () {
	 
	 // This is the beginning of the left-side-one-word-drop round (Falling 2)  
	 // and will use a timer to monitor when the Japanese word reaches the bottom. The Start 
	 // button invokes Fall3start.html which calls the main js file, q7s2spjs.js.
	 
	 
	 var $ = function (id) {return document.getElementById(id); }
	 var $$ = function (id) {return document.querySelector(id); }
     		
	 executeGame();
		 
   
function executeGame() { 
     
	//  The Drop down menu button ***************************
	
       dropMenufnct.addEventListener("click", dropDwnBtn, false);
	
	/* When the user clicks on the button, 
	toggle between hiding and showing the dropdown content */
	function dropDwnBtn() {
 	  document.getElementById("myDropdown").classList.toggle("show");
	 
	}

    // Close the dropdown if the user clicks outside of it
	window.onclick = function(event) {
	  if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
		  var openDropdown = dropdowns[i];
		  if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		  }
		}
	  }
   }
   	// Drop down menu button FINISHES ***********************
		 
    // The Start button
	var button = $$("#startButt");
	button.style.cursor = "pointer";
	button.style.visibility = "visible";
	
	button.addEventListener("click", buttonHandler, false);
	
	function buttonHandler() {
	    var anchor = document.createElement('a');
        anchor.href = "./htmls/fall3start.html";
        anchor.click();
	}
 
  }
}  
());

 