 (function () {
	 
	 // This is the second Training round, Falling 2
	
	 var $ = function (id) {return document.getElementById(id); }
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
	let words = [];
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
	     
	wordsIndx = 0;
	
	const mtchWordsXX = [  "合わせて", "合わす", "ゆいごん", "しょうばい", "にあう", "少なくとも", "かぶる", "のうりょく", "こっせつしたゆび"]; 
	
    const mtchWords = [  "awasete", "awasu", "yuigon", "syoubai", "niau", "sukunakutomo", "kaburu", "noryoku", "kossetushitayubi"]; 
    words = ["in total0","to match1","will2","business3","to suit4","at least5","wear on head6","ability7","broken finger8"];
	   	 
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
	wrongAnsSnd.addEventListener("canplaythrough", loadHandler,false);
    wrongAnsSnd.load();
	assetsToLoad.push(wrongAnsSnd);
	var jaws = $$("#jaws");
	jaws.addEventListener("canplaythrough", loadHandler,false);
    jaws.load();
	assetsToLoad.push(jaws);
	
 
    button.addEventListener("click", buttonHandler, false);
	
	function buttonHandler() {
		timeOUT = setTimeout(() => { uFail(); } ,30000);
	 	var startbtn = $$("#startButt");
		startbtn.style.visibility = "hidden";
 	
	    clickHandler();
	}
	
	 	
	function clickHandler()
	{
	    wrkWord = words[wordsIndx];
		var transWrds  = mtchWords;
    		 
		// Display the startingWord on the screen
		if (ansAttempt == 0) 
		{
    		const gso = $("startingWord");
 			gso.innerHTML = wrkWord;
			gso.style.color = "#000";
			 
			for (let i = 0; i < transWrds.length; i++){
                 var elemnt = transWrds[i];
				     Jindx = "#J" + i.toString();
					 Jw = $$(Jindx);
              	   	 Jw.innerHTML = elemnt;
			 		 Jw.style.backgroundColor = "gray";
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
		}
			
	}  // clickHandler.
	    		            
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
				// End the Quiz
				   EndQ();
				}
				else {
				   clickHandler();
			    }
			}
	  }
	   
	    function EndQ() {
	 	   document.body.style.background =  "#191c3f";   // Snoop blue
		   $$("#youwinmsg").style.visibility = "visible";
		   youWinCleanUp();
 	   }
	   
	    function youWinCleanUp() {
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
		   jaws.pause();
		   winLoseSwitch = 1;　
		}
		   
	    function uFail() {
		  if (!winLoseSwitch) {
			 jaws.pause();			  
		     wrongAnsSnd.play();  
		 
		   J0.style.backgroundColor = "orange";
		   J1.style.backgroundColor = "orange";
		   J2.style.backgroundColor = "orange";
		   J3.style.backgroundColor = "orange";
		   J4.style.backgroundColor = "orange";
		   J5.style.backgroundColor = "orange";
		   J6.style.backgroundColor = "orange";
		   J7.style.backgroundColor = "orange";
		   J8.style.backgroundColor = "orange";
		   J9.style.backgroundColor = "orange";
		  
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
		   $("J0").disabled = true;
  		   $("J1").disabled = true;
		   $("J2").disabled = true;
		   $("J3").disabled = true;
		   $("J4").disabled = true;
		   $("J5").disabled = true;
		   $("J6").disabled = true;
		   $("J7").disabled = true;
		   $("J8").disabled = true;
		   $("J9").disabled = true;
		   
		   $("J0").style.cursor = "not-allowed";
  		   $("J1").style.cursor = "not-allowed";
		   $("J2").style.cursor = "not-allowed";
		   $("J3").style.cursor = "not-allowed";
		   $("J4").style.cursor = "not-allowed";
		   $("J5").style.cursor = "not-allowed";
		   $("J6").style.cursor = "not-allowed";
		   $("J7").style.cursor = "not-allowed";
		   $("J8").style.cursor = "not-allowed";
		   $("J9").style.cursor = "not-allowed";
	}
	
	 function loadHandler()
    { 
       assetsLoaded++;
       //Remove the load handlers
   		
       if (assetsLoaded === assetsToLoad.length )
	   {		 
		//Remove the load event listeners
		wrongAnsSnd.removeEventListener("canplaythrough", loadHandler, false);
 		jaws.removeEventListener("canplaythrough", loadHandler, false);
 	   }
	}
  }  
());

 