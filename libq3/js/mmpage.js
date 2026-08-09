 (function () {
	
	 var $ = function (id) {return document.getElementById(id); }
	 var $$ = function (id) {return document.querySelector(id); }
     var PLAYING = 1;
	 var ENDGAME = 2;
	 var gameState = PLAYING;
	 
	 console.log ("MMpage is entered");
	    
	
	   		window.onload = function OnLoad() 
		{
			    execute();				
		}
		     
			
		function execute() {
	 
     		  switch(gameState)
				  {
				    case PLAYING:
					  executeGame();
					  break;
					  
					case ENDGAME:
					  endThis();
					  break;	  
				  }
		}
   
function executeGame() { 
 	 
	//  The Drop down menu button ***************************
	
       dropMenufnct.addEventListener("click", dropDwnBtn, false);
	
	/*  When the user clicks on the button, 
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
  }  
 }
());

 