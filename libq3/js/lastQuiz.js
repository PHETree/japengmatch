 (function () {
	 
	// The last quiz. Fill in the blanks with the correct words. 
    // There is a timer if 1st attempt fails
		
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
	let words = [], mtchWords = [], sentArr = [];
	var startPos1, startPos2, startPos3,startPos4, wrdLen1, wrdLen2, sentLen, esentLen;
 	var wordsIndx;
    var mixedArrIndxs = [];
	var Esentences = [];
	 
	var assetsToLoad = [], assetsLoaded = 0;
	
	var wordsIndx;
	var mixedArrIndxs = [];

	var numWords;
	var Jw;
	var jwIndxString = "";
 		
	var wrkWord;
	var Interval;
	var timeOut = 0;
    var TIME_LIMIT = 600;
	 
	wordsIndx = 0;
	
	///////////////////////////////////////*************************************/////////////////////////////
	
	var engWords = localStorage.getItem('engWrds');
    var japWords = localStorage.getItem('japWrds');
	var japSents = localStorage.getItem('jsents');
	var engSents = localStorage.getItem('esentences');
	
 	 
    // add ',' at end so the indexOf can find it
	engWords = engWords + ",";
    japWords = japWords + ",";
	japSents = japSents + ",";
	engSents = engSents + ",";
	    	 
	startPos1 = 0;
	startPos2 = 0;
	startPos3 = 0;
	startPos4 = 0;
		
    // extract individual words from strings by searching for ','s 
    for (let i = 0; i <= 8; i++){
	   wrdLen1 = engWords.indexOf(",", startPos1);
	   wrdLen2 = japWords.indexOf(",", startPos2);
	   sentLen = japSents.indexOf(",", startPos3);
	   esentLen = engSents.indexOf(",", startPos4);
	   wrdLen1 = wrdLen1 - startPos1;
	   wrdLen2 = wrdLen2 - startPos2;
	   sentLen = sentLen - startPos3;
	   esentLen = esentLen - startPos4;
	   words[i] = engWords.substr(startPos1, wrdLen1) + i.toString();
	   mtchWords[i] = japWords.substr(startPos2, wrdLen2);
	   sentArr[i] = japSents.substr(startPos3, sentLen);
	   Esentences[i] = engSents.substr(startPos4, esentLen);
	   startPos1 = (startPos1 + 1) + wrdLen1;
	   startPos2 = (startPos2 + 1) + wrdLen2;
	   startPos3 = (startPos3 + 1) + sentLen;
	   startPos4 = (startPos4 + 1) + esentLen;
	}
		
    const wordsLst = [...mtchWords];
 	
 	const words1 = $("wordbank1");
	words1.innerHTML = wordsLst[4] + " " + wordsLst[7] + " " + wordsLst[6];
	const words2 = $("wordbank2");
	words2.innerHTML = wordsLst[3] + " " + wordsLst[8] + " " + wordsLst[2];
	const words3 = $("wordbank3");
	words3.innerHTML = wordsLst[5] + " " + wordsLst[1] + " " + wordsLst[0];
	
	const sent0 = $("jsent0");
	sent0.innerHTML = sentArr[0];
	const sent1 = $("jsent1");
	sent1.innerHTML = sentArr[1];
	const sent2 = $("jsent2");
	sent2.innerHTML = sentArr[2];
	const sent3 = $("jsent3");
	sent3.innerHTML = sentArr[3];
	const sent4 = $("jsent4");
	sent4.innerHTML = sentArr[4];
	const sent5 = $("jsent5");
	sent5.innerHTML = sentArr[5];
	const sent6 = $("jsent6");
	sent6.innerHTML = sentArr[6];
	const sent7 = $("jsent7");
	sent7.innerHTML = sentArr[7];
	const sent8 = $("jsent8");
	sent8.innerHTML = sentArr[8];
	
	    var eSentOut = $("esent0");
	eSentOut.innerHTML = Esentences[0];
	  	eSentOut = $("esent1");
	eSentOut.innerHTML = Esentences[1];
	  	eSentOut = $("esent2");
    eSentOut.innerHTML = Esentences[2];
	 	eSentOut = $("esent3");
	eSentOut.innerHTML = Esentences[3];
	 	eSentOut = $("esent4");
	eSentOut.innerHTML = Esentences[4];
	  	eSentOut = $("esent5");
	eSentOut.innerHTML = Esentences[5];
	  	eSentOut = $("esent6");
	eSentOut.innerHTML = Esentences[6];
	  	eSentOut = $("esent7");
	eSentOut.innerHTML = Esentences[7];
	  	eSentOut = $("esent8");
	eSentOut.innerHTML = Esentences[8];
 	  
	var scrambledWs = [];
	
	scrambledWs = [...words];
	numWords = words.length - 1;
	 	 
    // First let's mix up the order of the english words // scramble elements in words array
	
	//   ******* SHUFFLE English words  ********
	
	function shuffle(words) {
	    let currentIndex = words.length,  randomIndex;
        	    
		  // While there remain elements to shuffle.
		     while (currentIndex != 0) {
			 // Pick a remaining element.
			   randomIndex = Math.floor(Math.random() * currentIndex);
			 // Keep track of correct sentence array with random mixed sentences using indexes
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
		    }
	   	return words;
   }
   
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
     
    var wrdCntErr = 0;
      
    // Define MP3s  
	var damn = $$("#damnit");
	damn.addEventListener("canplaythrough", loadHandler,false);
    damn.load();
	assetsToLoad.push(damn);
	var jaws = $$("#jaws");
	jaws.addEventListener("canplaythrough", loadHandler,false);
    jaws.load();
	assetsToLoad.push(jaws);
	var buzz = $$("#buzzer");
	buzz.addEventListener("canplaythrough", loadHandler,false);
    buzz.load();
	assetsToLoad.push(buzz);
	var wrongAnsSnd = $$("#buzzer");
	wrongAnsSnd.addEventListener("canplaythrough", loadHandler,false);
	wrongAnsSnd.load();
	assetsToLoad.push(wrongAnsSnd);
		 
	// the check-final-answers button 
    var button = $("chkAnsBtn");
	button.style.cursor = "pointer";   
    button.disabled = true;
	
	// the un-Blur button
	var unBlurBtn = $("clearText");
	unBlurBtn.style.cursor = "pointer";   
  	
	let sent0Wrd = $("sent0Ans");
	sent0Wrd.focus();
	
	let sent8Wrd = $("sent8Ans");
	sent8Wrd.addEventListener("blur", dispCheckBtn, false);  
	   
    function dispCheckBtn()
	{
		// display the 'Happy?' button
    	button.disabled = false;
 		button.addEventListener("click", clickHandler, false); 
		unBlurBtn.addEventListener("click", fixEnglText, false);
    }
	
	function  fixEnglText() 
	{
		const fixEngText = $("englishSs");
		fixEngText.style.opacity = "1.0";
		fixEngText.style.textShadow = "none";
 		fixEngText.style.color = "blue";
 	}
		
	var gameCntr = 0; 
	
	function clickHandler()
	{
  	    gameCntr++;
		answersChk();
 	}
	
	function answersChk() {
	     let inc = 0;
		 let wlistWrd;
		 let userInput;
		 let userVal;
		 let usrIndx;
		 let errFlg = 0;
		 for (inc = 0; inc < wordsLst.length; inc++) { 
		    wlistWrd = wordsLst[inc];
			wlistWrd = wlistWrd.replaceAll(" ", "");
			// #sent is in lastQuiz.html and holds user input answers
			userInput = "#sent" + inc.toString() + "Ans";
            userVal = $$(userInput).value; 
			userVal = userVal.trim();
			userVal = userVal.replaceAll(" ","");
			userVal = userVal.toLowerCase();
			console.log ("the user's input " + userVal);
			console.log ("wlistWrd is " + wlistWrd + "  inc is " + inc);
			if (userVal != wlistWrd) 
			{
				wrdCntErr++;
				errFlg = 1;
			}
		 }
		 if (errFlg) {
 			 // blank out all user's answers, start Quiz again and begin the clock
			 console.log("there were words in err " + wrdCntErr);
			 $$("#ErrMsg").style.visibility = "visible";
			 $$("#wordCntErr").style.visibility = "visible";
			 $$("#wordCntErr").innerHTML = wrdCntErr;
			 window.scrollTo(0, 0);
			 damn.play();
			 restartQuiz();
    	 }
		 else
		 {
			// WE WIN. Go to AWS Guess mystery student picture
     	       window.location.href = "../htmls/moveSquare.html";
         }
   	}
	
	function restartQuiz() {
		 for (inc = 0; inc < wordsLst.length; inc++) { 
		    blankBoxes(inc);
		 }
	     let sent0Wrd = $$("#sent0Ans");
	     sent0Wrd.focus();
		 timeOUT = setTimeout(() => { resetCDtimer(); }, 2600);
	}
	 
	 function blankBoxes(i) {
		 setTimeout(function() {
			// blank out user's answers in each input box
			userInput = "#sent" + i.toString() + "Ans";
            $$(userInput).value = ""; 
	     }, 200 * i);
      }
	
      function resetCDtimer() {
		     wrdCntErr = 0;
		     document.getElementById("cntdTimer").style.visibility = "visible";
			 $$("#ErrMsg").style.visibility = "hidden";
			 $$("#wordCntErr").style.visibility = "hidden";
			 $$("#wordCntErr").innerHTML = wrdCntErr;		
			 button.disabled = true;
			 clearInterval(timerInterval);
			 TIME_LIMIT = TIME_LIMIT - 30;
     		 countDown();
	  }
}  // End of execute
	
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

		const TIME_LIMIT = 400;
		let timePassed = 0;
		timeLeft = TIME_LIMIT;
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

		function startTimer() {
			timerInterval = setInterval(() => {
			timePassed = timePassed += 1;
			timeLeft = TIME_LIMIT - timePassed;
			if (timeLeft < 20) {
				jaws.play();
			}
			if (timeLeft == 0) {
			   jaws.pause();
			   jaws.currentTime = 0;
    		   document.getElementById("cntdTimer").style.visibility = "hidden";
			   clearInterval(timerInterval);
			   document.location.reload();
		    }
		
		  document.getElementById("base-timer-label").innerHTML = formatTime(
			  timeLeft
			);
			setCircleDasharray();
			setRemainingPathColor(timeLeft);
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

	
	function loseit() {
	    // the timer has reached 0 so do something unthinkable
		
	}
	
	function loadHandler()
    { 
	   assetsLoaded++;
	   //Remove the load handlers
		
	   if (assetsLoaded === assetsToLoad.length -1  )
		   {		 
			//Remove the load event listeners
			damn.removeEventListener("canplaythrough", loadHandler, false);
			damn.removeEventListener("canplaythrough", loadHandler, false);
		 	jaws.removeEventListener("canplaythrough", loadHandler, false);
 		 	buzz.removeEventListener("canplaythrough", loadHandler, false);
 		   }
    }
 }  
());

 
