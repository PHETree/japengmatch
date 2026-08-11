 (function () {
	 
	 // This round is called "Write". Player has to input the English word that matches the displayed Japanese.
	 // A Timer has been added. Add: Sept. 20 - When successful with this module, a prompt appears to let
	 // you go to the Fill-In paragraph game
	
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
		var assetsToLoad = [], assetsLoaded = 0;
		
		// Define the MP3s  
		var wrongAnsSnd = $$("#buzzer");
		wrongAnsSnd.addEventListener("canplaythrough", loadHandler,false);
		wrongAnsSnd.load();
		assetsToLoad.push(wrongAnsSnd);
			
    function executeGame() { 
 	 	var wordsIndx;
		var mixedArrIndxs = [];

  		var numWords;
		var Jw;
		var jwIndxString = "";
		var timeOUT;
			
		var wrkWord;
		var Interval;
		var timeOut = 0;
				
		wordsIndx = 0;    // "クマノミ"
		
		
		////************************************************************
		
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
 		   words[i] = engWords.substr(startPos1, wrdLen1);
		   mtchWords[i] = japWords.substr(startPos2, wrdLen2);
 		   startPos1 = (startPos1 + 1) + wrdLen1;
		   startPos2 = (startPos2 + 1) + wrdLen2;
 		}
	
        const wordsLst = [...mtchWords];
 	
		console.log ("wordsLst is " + wordsLst);
		
		const words1 = $("wordbank1");
		words1.innerHTML = wordsLst[4] + " " + wordsLst[7] + " " + wordsLst[6];
		const words2 = $("wordbank2");
		words2.innerHTML = wordsLst[3] + " " + wordsLst[8] + " " + wordsLst[2];
		const words3 = $("wordbank3");
		words3.innerHTML = wordsLst[5] + " " + wordsLst[1] + " " + wordsLst[0];
	
		/****///////////////////////////////////////////////////////////
		
	 	var scrambledWs = [];
		
		scrambledWs = [...words];
 		numWords = words.length - 1;
		
		shuffle(scrambledWs);
		 
	     //   ******* SHUFFLE English words  ********
	
	    function shuffle(mixupArr) {
			let currentIndex = mixupArr.length,  randomIndex;
					
			  // While there remain elements to shuffle.
				 while (currentIndex != 0) {
				 // Pick a remaining element.
				   randomIndex = Math.floor(Math.random() * currentIndex);
				 // Keep track of correct sentence array with random mixed sentence using indexes
				   currentIndex--;
					
				 // And swap it with the current element.
					[mixupArr[currentIndex], mixupArr[randomIndex]] = [
					mixupArr[randomIndex], mixupArr[currentIndex]];
				 }
						
				  // ... NOW store indexes of words in the shuffled array 			
				  const len = mixupArr.length;
				  for(let i = 0; i < len; i++) {
					let wtext = mixupArr[i]; 
					let num = wtext.substr(wtext.length-1, 1);
					mixedArrIndxs[i] = num;
				  }
		return mixupArr;
	   }
	  
	     
    //  ****************************************************
	//  ****                                        ********
    //  ****           The Drop down menu           ********
	//  ****                                        ********
    //  ****************************************************
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
	//     Drop down menu button FINISHED    ***********************
	
	wrkWord = scrambledWs[wordsIndx];
    Jw = $("japWord");
	Jw.innerHTML = wrkWord;
	let loadInwrd = $$("#inword");
	loadInwrd.focus();
		     
    var button = $$("#btnId");
    button.addEventListener("click", clickHandler, false);
	button.style.cursor = "pointer";
	var gameCntr = 0; 
	 	
	function clickHandler()
	{
		console.log("inside clickHandler");
 	    gameCntr++;
        if (gameCntr == 1) { 
           // start Timer
           countDown();
		}
		var wordIn;
		var input = $$("#inword");
				
	  	wordIn = input.value;
		wordIn = wordIn.trim();
		wordIn = wordIn.toLowerCase();
		
		// gi makes it Case-insensitive 
        /* const isAlpha = str => /^[a-z]*$/gi.test(str); */

		input.value = "";
        input.focus();	
		
		if (mtchWords.includes(wordIn))  
		{ 	
	     	testMatch(wrkWord, wordIn);  // program to check Jword against inputted English word	
 		}
		else 
		{
			alert("NG  =  No good. sorry 😯   ƪ(˘⌣˘)ʃ");
		}
			
	}  //  end of clickHandler.
       
	 	
     //   Main program
	function testMatch(wW, inpW){
       console.log ("wW is Japanese and inpW are " + wW + "    " + inpW);
	    let indexJ = words.indexOf(wW);
		let indexE = mtchWords.indexOf(inpW);
		
		if (indexJ == indexE) 
		{
			console.log("Yay and next words are??"); 
			wordsIndx++;
			if (wordsIndx == numWords+1) { 
				// End the Quiz. You were successful. Yay winner
				   endQ();
			}
		    wrkWord = scrambledWs[wordsIndx];
            Jw = $("japWord");
			if (wrkWord == undefined) {  
			    wrkWord = "";
				Jw.value = "";
				let menu = $$(".dropbtn");
				menu.style.backgroundColor = "#2980B9";
				menu.focus();
		    }
            Jw.innerHTML = wrkWord
		}			
	    else {
			alert("NG  =  No good. sorry 😯   ƪ(˘⌣˘)ʃ");
		     }
	}
  }  //  end of executeGame  
   
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

	const TIME_LIMIT = 200;
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

	function startTimer() {
	    timerInterval = setInterval(() => {
		timePassed = timePassed += 1;
		timeLeft = TIME_LIMIT - timePassed;
		  if (timeLeft == 0) {
    		  clearInterval(timerInterval);
		      loseit()
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

     // this function called when timer reaches 0 seconds
	 function loseit() {
	     document.getElementById("base-timer-label").style.visibility = "hidden";
		 wrongAnsSnd.play();
		 timeOUT = setTimeout(() => { document.location.reload(); } ,2000);
	 }
	 

    function endQ() {
	  // When you win this game display 'Go To Last Quiz' button
	  $$("#inword").disabled = true;
	  $$("#btnId").disabled = true;
      clearInterval(timerInterval); 
      var buttonLQz = $$("#lastQButn");
	  var arrowLQz = $$("#finalQzarrow");
      arrowLQz.style.visibility = "visible";
	  buttonLQz.style.visibility = "visible";
	  buttonLQz.addEventListener("click", clickLastQz, false);

 	}
	
	function clickLastQz() {
	/* 	 // Define the Simpsons MP3  
		var simpson = $$("#simpsons");
		simpson.addEventListener("canplaythrough", loadHandler,false);
		simpson.load();
		assetsToLoad.push(simpson);
		
		simpson.play();
		
		GoToLastQuiz(); */
	   
	    window.location.href = "../htmls/lastQuiz.html";     
	}
	
	function loadHandler()
     { 
		   assetsLoaded++;
		   //Remove the load handlers
			
		   if (assetsLoaded === assetsToLoad.length -1  )
		   {		 
				//Remove the load event listeners
				wrongAnsSnd.removeEventListener("canplaythrough", loadHandler, false);
				wrongAnsSnd.removeEventListener("canplaythrough", loadHandler, false);
				simpson.removeEventListener("canplaythrough", loadHandler, false);
			    simpson.removeEventListener("canplaythrough", loadHandler, false);
		   }
	 }
}
());

  
