 (function () {
	
	 // This is the first Training called Falling1 in the menu 
	
	 var T = function (id) {return document.getElementById(id); }
	 var $$ = function (id) {return document.querySelector(id); }
     var PLAYING = 1;
	 var ENDGAME = 2;
     var assetsToLoad = [], assetsLoaded = 0;   
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
	var winLoseSwitch = 0;
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
	
   /*  mtchWords = [  "awasete", "awasu", "yuigon", "syoubai", "niau", "sukunakutomo", "kaburu", "noryoku", "kossetushitayubi"]; 
	words = ["in total0","to match1","will2","business3","to suit4","at least5","wear on head6","ability7","broken finger8"];
	 */ 
	numWords = words.length - 1;
    
	shuffle(words);
		 
  	
	//   ******* SHUFFLE English words for displaying  ********
	
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
			    
		        // and now replace the number at the end of the word with blanks
		        let blanks = "  ";
			    wtext = wtext.slice(0, -1) + blanks;
			    words[i] = wtext;
		      }
	   	return words;
   }
 	 
	// The Start button
	var button = $$("#startButt");
	button.style.cursor = "pointer";
	button.style.visibility = "visible";
		
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
    
	// Define the MP3s  
	var wrongAnsSnd = $$("#buzzer");
	wrongAnsSnd.load();
	wrongAnsSnd.addEventListener("canplaythrough", loadHandler,false);
    assetsToLoad.push(wrongAnsSnd);
	var jaws = $$("#jaws");
	jaws.addEventListener("canplaythrough", loadHandler,false);
    jaws.load();
	assetsToLoad.push(jaws);
	
		 
    button.addEventListener("click", buttonHandler, false);
	
	function buttonHandler() {
		timeOUT = setTimeout(() => { uFail(); } ,70000);

	 	var startbtn = $$("#startButt");
		startbtn.style.visibility = "hidden";
 	
	    clickHandler();
	}
	 	
	function clickHandler()
	{
	    wrkWord = words[wordsIndx];
		var transWrds  = mtchWords;
     
	 // Display the startingWord - the Japanese word - on the screen
		 	const gso = T("startingWord");
 			gso.innerHTML = wrkWord;
			gso.style.color = "#000";
			
			for (let i = 0; i < transWrds.length; i++){
                 var Jpos;
                 var elemnt = transWrds[i];
				 
				 Jindx = "#J" + i.toString();
					 Jw = $$(Jindx);
              	   	 Jw.innerHTML = elemnt;
			 		 Jw.style.backgroundColor = "navy";
			         Jw.style.fontSize = "1.0em";
					 
				     // jwIndxString contains the indexes of already clicked on words					 
					 if (jwIndxString.indexOf(i) != -1) {
                 	       Jw.style.visibility = "hidden";
						   if (jwIndxString.length > 5) {
							   jaws.play();
						   }
					 }
					 else {
						   Jw.style.visibility = "visible";
					 }
			}
		 
	}  //  end clickHandler.
	    		            
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
				   // You WIN! End the Quiz
				   EndQ();
				}
				else {
				   clickHandler();
			    }
			}
	  }
	   
	   function EndQ() {
		   document.body.style.background =  "#fdc5f1";     // light pink
		   $$("#youwinmsg").style.visibility = "visible";
		   youWinCleanUp();
 	   }
	   
	   function youWinCleanUp() {
		   T("J0").style.visibility = "hidden"; 
  		   T("J1").style.visibility = "hidden";
		   T("J2").style.visibility = "hidden";
		   T("J3").style.visibility = "hidden";
		   T("J4").style.visibility = "hidden";
		   T("J5").style.visibility = "hidden";
		   T("J6").style.visibility = "hidden";
		   T("J7").style.visibility = "hidden";
		   T("J8").style.visibility = "hidden";
		   T("J9").style.visibility = "hidden";　
		   jaws.pause();
		   winLoseSwitch = 1;　　
 	}
	 
	   function uFail() {
		   if (!winLoseSwitch) { 
		     jaws.pause();
			 wrongAnsSnd.play();  
		   
		   console.log("a message from " + timeOUT);
		   J0.style.backgroundColor = "red";
		   J1.style.backgroundColor = "red";
		   J2.style.backgroundColor = "red";
		   J3.style.backgroundColor = "red";
		   J4.style.backgroundColor = "red";
		   J5.style.backgroundColor = "red";
		   J6.style.backgroundColor = "red";
		   J7.style.backgroundColor = "red";
		   J8.style.backgroundColor = "red";
		   J9.style.backgroundColor = "red";

   	       J0.style.animation = "dropfast 3s";
		   J1.style.animation = "dropfast 3s";
		   J2.style.animation = "dropfast 3s";
		   J3.style.animation = "dropfast 3s";
		   J4.style.animation = "dropfast 3s";
		   J5.style.animation = "dropfast 3s";
		   J6.style.animation = "dropfast 3s";
		   J7.style.animation = "dropfast 3s";
		   J8.style.animation = "dropfast 3s";
		   J9.style.animation = "dropfast 3s";
		 		 
		   gameState = ENDGAME;
		   execute();
		   }
	   }
    }  // executeGame
	
	function loadAgain() {
   		   document.location.reload();
    }
   
    function endThis() {
		   T("J0").disabled = true;
  		   T("J1").disabled = true;
		   T("J2").disabled = true;
		   T("J3").disabled = true;
		   T("J4").disabled = true;
		   T("J5").disabled = true;
		   T("J6").disabled = true;
		   T("J7").disabled = true;
		   T("J8").disabled = true;
		   T("J9").disabled = true;
		   T("J0").style.cursor = "not-allowed";
  		   T("J1").style.cursor = "not-allowed";
		   T("J2").style.cursor = "not-allowed";
		   T("J3").style.cursor = "not-allowed";
		   T("J4").style.cursor = "not-allowed";
		   T("J5").style.cursor = "not-allowed";
		   T("J6").style.cursor = "not-allowed";
		   T("J7").style.cursor = "not-allowed";
		   T("J8").style.cursor = "not-allowed";
		   T("J9").style.cursor = "not-allowed";
	}
  
  
  function loadHandler()
    { 
       assetsLoaded++;
       //Remove the load handlers
   		
       if (assetsLoaded === assetsToLoad.length -1  )
	   {		 
		//Remove the load event listeners
		/* wrongAnsSnd.removeEventListener("canplaythrough", loadHandler, false); */
 		jaws.removeEventListener("canplaythrough", loadHandler, false);
  	   }
	}
  }  
());

 