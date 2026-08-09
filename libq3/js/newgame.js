 (function () {
	 
	 // Input data for a NEW GAME 
	
	 var $ = function (id) {return document.getElementById(id); }
	 var $$ = function (id) {return document.querySelector(id); }
     var PLAYING = 1;
	 var ENDGAME = 2;
	 
	 var timerInterval = null;
	 var timeLeft;
	 
	 var gameState = PLAYING;
	
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
   }    // Drop down menu finished **********************
   
   
    // Declare variables
	const nwrdsLst = [];
	const nJwrdsLst = [];
	const jSents = [];
     
	// the finished button 
    var button = $("finishButt");
	button.innerHTML = "********";
    button.style.pointerEvents = "none";   // this completely DUMMIES the button; disabled
	
	let newWrd0 = $("nWrd0");
	newWrd0.focus();
	
	let newSent8 = $("sent8");
	newSent8.addEventListener("blur", enableFinishBtn , false);  
	 	    
    function enableFinishBtn()
	{
		button.style.pointerEvents = "auto";   // enable the button 
		button.innerHTML = "Finished";
    	button.style.cursor = "pointer";   
    	button.disabled = false;
 		button.addEventListener("click", clickHandler, false); 
    }
	 
	function clickHandler()
	{  	     
		processNewWrds();
        localStorage.setItem('engWrds', nwrdsLst);
        localStorage.setItem('japWrds', nJwrdsLst);
        localStorage.setItem('jsents',  jSents);
		
		button.innerHTML = "-\_(ツ)_/~-\_(ツ)_/~";
		button.style.pointerEvents = "none";
 	}
	 
	function processNewWrds() {
		 var inc;
		 var nxtWrd;
		 var userInput;
		 
		 for (inc = 0; inc <= 8; inc++) { 
			userInput = "nWrd" + inc.toString();
			userVal = $(userInput).value; 
			userVal = userVal.trim();
 			userVal = userVal.toLowerCase();
			nwrdsLst[inc] = userVal;
		   console.log (nwrdsLst);

			userInput = "njpWrd" + inc.toString();
			userVal = $(userInput).value; 
			userVal = userVal.trim();
			userVal = userVal.replaceAll(" ","");
			userVal = userVal.toLowerCase();
			nJwrdsLst[inc] = userVal;
		   console.log (nJwrdsLst);
		   
		    userInput = "sent" + inc.toString();
			userVal = $(userInput).value; 
			userVal = userVal.trim();
 			jSents[inc] = userVal;
		   console.log (jSents);
	     }
    }
  }
} 
());

 
 
  