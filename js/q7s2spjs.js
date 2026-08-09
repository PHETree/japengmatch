 (function () {
	 
	 // This is the left-side-one-word-drop round (Falling 2)  
	 // and now using a Timer to monitor when word reaches the bottom
	 
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
	    console.log ("gamestate IS " + gameState);
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

   	var ansAttempt;
	var wordsIndx;
    var mixedArrIndxs = [];

 	var numWords;
 	var Jw;
	var jwIndxString = "";
	var timeOUT;
	 	
 	var wrkWord;
	var Interval ;
	var timeOut = 0;
	var ansAttempt = 0;
	var assetsToLoad = [], assetsLoaded = 0;
	     
    let words = [];
	var mtchWords = [];
 	var startPos1 , startPos2;
	var wrdLen1 , wrdLen2;
		
	wordsIndx = 0;
 	
	var engWords = localStorage.getItem('engWrds');
    var japWords = localStorage.getItem('japWrds');
	 
    // add ',' at end so the indexOf can find it
	engWords = engWords + ",";
    japWords = japWords + ",";
	    	 
	startPos1 = 0;
	startPos2 = 0;
		
    // extract individual words from strings by searching for ','s 
    for (let i = 0; i <= 8; i++){
	   wrdLen1 = engWords.indexOf(",", startPos1);
	   wrdLen2 = japWords.indexOf(",", startPos2);
	   wrdLen1 = wrdLen1 - startPos1;
	   wrdLen2 = wrdLen2 - startPos2;
	   words[i] = engWords.substr(startPos1, wrdLen1) + i.toString();
	   mtchWords[i] = japWords.substr(startPos2, wrdLen2);
	   startPos1 = (startPos1 + 1) + wrdLen1;
	   startPos2 = (startPos2 + 1) + wrdLen2;
	}
	 
    /* const mtchWords = [  "awasete", "awasu", "yuigon", "syoubai", "niau", "sukunakutomo", "kaburu", "noryoku", "kossetushitayubi"]; 
	words = ["in total0","to match1","will2","business3","to suit4","at least5","wear on head6","ability7","broken finger8"];
	 */  
	 
	numWords = words.length - 1;
    
	shuffle(words);
		 
    // First let's mix up the order of the english words // scramble elements in words array
	
	//   ******* SHUFFLE English words  ********
	
	function shuffle(words) {
	    let currentIndex = words.length,  randomIndex;
        	    
		  // While there remain elements to shuffle.
		     while (currentIndex != 0) {
			 // Pick a remaining element.
			   randomIndex = Math.floor(Math.random() * currentIndex);
			 // Keep track of correct sentence array with random mixed sentence using indexes
			   currentIndex--;
				
			 // And swap it with the current element.
		    	[words[currentIndex], words[randomIndex]] = [
			    words[randomIndex], words[currentIndex]];
		     }
				 	
              // ... NOW store indexes of words in the shuffled array 			
			  const len = words.length;
              for(let i = 0; i < len; i++) {
			    let wtext = words[i]; 
 			    let num = wtext.substr(wtext.length-1, 1);
 		        mixedArrIndxs[i] = num;
			   
			   console.log ("mixedArrIndxs is " + mixedArrIndxs);
			   
		        // and now replace the number at the end of the word with blanks
		        let blanks = "  ";
			    wtext = wtext.slice(0, -1) + blanks;
			    words[i] = wtext;
			    
			   console.log ("words after inserting blank  " + words);
		     }
	   	return words;
   }
   
   
   	// Define the MP3s  
	var upinFlames = $$("#fireWhiff");
	upinFlames.addEventListener("canplaythrough", loadHandler,false);
    upinFlames.load();
	assetsToLoad.push(upinFlames);
	
	var wrongAnsSnd = $$("#homer");
	wrongAnsSnd.addEventListener("canplaythrough", loadHandler,false);
    wrongAnsSnd.load();
	assetsToLoad.push(wrongAnsSnd);
	 
	
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
   	 	
	countDown();
    clickHandler();
	        
	function clickHandler()
	{
	    wrkWord = words[wordsIndx];
		var transWrds  = mtchWords;
    		 
		// Display the fallingWord on the screen
		if (ansAttempt == 0) 
		{
    		const fallnWd = $("fallingWordS2");
			fallnWd.innerHTML = wrkWord;
			fallnWd.style.color = "#000";
						
			for (let i = 0; i < transWrds.length; i++){
                 var elemnt = transWrds[i];
				 
				     Jindx = "#J" + i.toString();
					 
					 Jw = $$(Jindx);
              	   	 Jw.innerHTML = elemnt;
					 Jw.style.color = "white";
			 		 Jw.style.backgroundColor = "grey";
			         Jw.style.fontSize = "1.0em";
				     
                     // jwIndxString contains the indexes of already clicked on words					 
					 if (jwIndxString.indexOf(i) != -1) {
                 	       Jw.style.visibility = "hidden";
						   
					 }
					 else {
						   Jw.style.visibility = "visible";
					 }
			}
		}
			
	}  // end of clickHandler.
	    		            
	               J0.addEventListener("click", setWord0, false);
	               J1.addEventListener("click", setWord1, false);
	  			   J2.addEventListener("click", setWord2, false);
                   J3.addEventListener("click", setWord3, false);
	               J4.addEventListener("click", setWord4, false);
	  			   J5.addEventListener("click", setWord5, false);  
	               J6.addEventListener("click", setWord6, false);
	  			   J7.addEventListener("click", setWord7, false); 
	               J8.addEventListener("click", setWord8, false);
	  			   J9.addEventListener("click", setWord9, false);
				   
	   function setWord0() { 
	       PlayQ(0);
	   }     function setWord1() {
		        PlayQ(1);
	         }   function setWord2() {
 		            PlayQ(2);
	             } function setWord3() { 
	                  PlayQ(3);
	               } function setWord4() {
		                PlayQ(4);
	                 } function setWord5() {
 		                  PlayQ(5);
	                   } function setWord6() { 
	                        PlayQ(6);
	                     }    function setWord7() {
		                         PlayQ(7);
	                           }   function setWord8() {
 		                               PlayQ(8);
	                               } function setWord9() { 
	                                     PlayQ(9);
	                                   }   
	     
	   function PlayQ(jwIndx) {
	 	   
 		   let index = words.indexOf(wrkWord); 
         
		   let numInMixedArr = mixedArrIndxs[index];
		   
	       if (numInMixedArr == jwIndx) {
			   // success! Get the next word to memorize
			   	jwIndxString  = jwIndxString + jwIndx.toString();
 				wordsIndx++;
								 	
				if (wordsIndx == numWords+1) { 
				// You win and End the Quiz. All words have dropped.
				   WinandEndQ();
				}
				else {
				   clickHandler();
			    }
			}
			if (wordsIndx == 1) {
			   /* $$(".doit").style.visibility = "visible";		       */
		       /* timeOUT = setTimeout(() => { message(); } ,10500); */
		   }
	  }
	  
	   function WinandEndQ() {
           document.body.style.background =  "cyan";    
		   $$("#youwinmsg").style.visibility = "visible";
		   youWinCleanUp();       
	   }
	   
	   function youWinCleanUp() {
		   $$("#marshmallow").style.visibility = "hidden";
		   $("J0").style.visibility = "hidden";
  		   $("J1").style.visibility = "hidden";
		   $("J2").style.visibility = "hidden";
		   $("J3").style.visibility = "hidden";
		   $("J4").style.visibility = "hidden";
		   $("J5").style.visibility = "hidden";
		   $("J6").style.visibility = "hidden";
		   $("J7").style.visibility = "hidden";
		   $("J8").style.visibility = "hidden";
		   $("J9").style.visibility = "hidden";
		   $("fallingWordS2").style.visibility = "hidden";
    	   fireWhiff.pause();
           clearInterval(timerInterval);
  	   }
	   	   
	   function loadHandler()
       { 
		   assetsLoaded++;
		   //Remove the load handlers
			
		   if (assetsLoaded === assetsToLoad.length -1  )
			   {		 
				//Remove the load event listeners
				upinFlames.removeEventListener("canplaythrough", loadHandler, false);
				upinFlames.removeEventListener("canplaythrough", loadHandler, false);
			   }
	   }

  }  // executeGame
	
	
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	function countDown() {
 
	const FULL_DASH_ARRAY = 283;
	const WARNING_THRESHOLD = 10;
	const ALERT_THRESHOLD = 5;

	const COLOR_CODES = {
	  info: {
		color: "green"
	  },
	  warning: {
		color: "orange",
		threshold: WARNING_THRESHOLD
	  },
	  alert: {
		color: "red",
		threshold: ALERT_THRESHOLD
	  }
	};

	const TIME_LIMIT = 50;
	let timePassed = 0;
	timeLeft = TIME_LIMIT;
	/* var timerInterval = null; */
	let remainingPathColor = COLOR_CODES.info.color;

	document.getElementById("cntdTimer").innerHTML = `
	<div class="base-timer">
	  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<g class="base-timer__circle">
		  <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
		  <path
			id="base-timer-path-remaining"
			stroke-dasharray="283"
			class="base-timer__path-remaining ${remainingPathColor}"
			d="
			  M 50, 50
			  m -45, 0
			  a 45,45 0 1,0 90,0
			  a 45,45 0 1,0 -90,0
			"
		  ></path>
		</g>
	  </svg>
	  <span id="base-timer-label" class="base-timer__label">${formatTime(
		timeLeft
	  )}</span>
	</div>
	`;

	startTimer();

	function onTimesUp() {
	     window.location.href = "./htmls/Falling2.html";
    }

	function startTimer() {
	  timerInterval = setInterval(() => {
		timePassed = timePassed += 1;
		timeLeft = TIME_LIMIT - timePassed;
		document.getElementById("base-timer-label").innerHTML = formatTime(
		  timeLeft
		);
		setCircleDasharray();
		/* setRemainingPathColor(timeLeft); */

		if (timeLeft === 0) {
		  document.getElementById("fallingWordS2").style.visibility = "hidden";
	      fireWhiff.play();
	      timeOUT = setTimeout(() => { onTimesUp(); } ,1700);  
		}
	  }, 1000);
	}

	function formatTime(time) {
	  const minutes = Math.floor(time / 60);
	  let seconds = time % 60;

	  if (seconds < 10) {
		seconds = `0${seconds}`;
	  }

	  return `${minutes}:${seconds}`;
	}

	function setRemainingPathColor(timeLeft) {
	  const { alert, warning, info } = COLOR_CODES;
	  if (timeLeft <= alert.threshold) {
		document
		  .getElementById("base-timer-path-remaining")
		  .classList.remove(warning.color);
		document
		  .getElementById("base-timer-path-remaining")
		  .classList.add(alert.color);
	  } else if (timeLeft <= warning.threshold) {
		document
		  .getElementById("base-timer-path-remaining")
		  .classList.remove(info.color);
		document
		  .getElementById("base-timer-path-remaining")
		  .classList.add(warning.color);
	  }
	}

	function calculateTimeFraction() {
	  const rawTimeFraction = timeLeft / TIME_LIMIT;
	  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
	}

	function setCircleDasharray() {
	  const circleDasharray = `${(
		calculateTimeFraction() * FULL_DASH_ARRAY
	  ).toFixed(0)} 283`;
	  document
		.getElementById("base-timer-path-remaining")
		.setAttribute("stroke-dasharray", circleDasharray);
	}
}    // CountDown END
 
    function endThis() {
		   console.log ("END THIS HIT");
	}

  }  
());

 