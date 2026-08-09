
 (function () {
	
 // The absolute final annoying problem in this game. Answer the "Who am I?" input box
 // and win absolutely nothing! 

     var $ = function (id) {return document.getElementById(id); }
	 var $$ = function (id) {return document.querySelector(id); }
     
     var assetsToLoad = [], assetsLoaded = 0;   
	 
	 var hDoh = $$("#Doh");
	 hDoh.addEventListener("canplaythrough", loadHandler,false);
	 hDoh.load();
	 assetsToLoad.push(hDoh);
		 
	 // the "check user's answer for the picture" button 
    var button = $$("#whoamiBTN");
	button.style.cursor = "pointer"; 
	$$(".stuFace1").style.visibility = "visible";
	$$(".stuFace2").style.visibility = "hidden";
   
    // delay showing the "Who am I ?" input box 
    let timeOUT; 
    timeOUT = setTimeout(() => { dispInpBox(); } ,4000);
	
	function dispInpBox() {
       	$$("#whoAmI").style.visibility = "visible";
	    let userInp = $$("#guessName");
        userInp.focus();
		userInp.addEventListener("blur", dispCheckBtn, false);
        $$("#cyanCover").style.visibility = "hidden";		
    }
     
	var userValId; 
    var picFlag = 0;
	var Yuzu, Anz=1;
	var firstTime = 1;
	
    function dispCheckBtn()	{
		// display the 'Check Answer' button
		let userIn = $$("#guessName");
		if (userIn.value != "") {
  	    	button.addEventListener("click", verifyInp, false); 
		    }
		else { 
		    userIn.focus(); }
	}
 	 
	 function verifyInp() {
		 let userInput;
		 let userVal; 
		 let usrIndx;
		 let errFlg = 0;
				 
         userInput = "#guessName";
		 userValId = $$(userInput);
         userVal = $$(userInput).value; 
		 userVal = userVal.trim();
		 userVal = userVal.toLowerCase();
		 console.log ("the user's input  " + userVal);
		 
		 if ((userVal == "anzu") || (userVal == "yuzuki"))
		 { 
           /* if ((firstTime && userVal == "anzu") || (firstTime && userVal == "yuzuki"))  */
           /* if ((userVal == "anzu") || ( userVal == "yuzuki")) 
		   { */
			   console.log ("next line is firstTime = 0");
               /* firstTime = 0; */
               if ((userVal == "anzu" && Anz) || (userVal == "yuzuki" && Yuzu))
			   {
				   youWin();
			   }
		
		else
			   {
				   youLose();
			   }
		   /* } */
		  /*  else  if ((userVal == "anzu" && Anz)  || (userVal == "yuzuki" && Yuzu))
			   {
				   console.log ("Waaaaaaaa Waaaaaaaaaaaa Waaaaaaaaaaaaaa waaaa");
				   youWin();
			   } */
		  
	    }
	    else 
		{
		   youLose();
		}
	 }
	 
	  function youWin() {
			   
		   /* if ((userVal == "anzu" && Anz)  || (userVal == "yuzuki" && Yuzu)) */
			/* { */
		         console.log ("you win");
			     $$(".overPanda").style.visibility = "hidden";
			     userValId.disabled = true;
			     /* button.style.visibility = "hidden"; */
			
			/***********************************************************************
			/   Move hooded panda back into the screen after getting the correct answer 
			/***********************************************************************/
			  var stylePanda = document.createElement('style');
			  stylePanda.innerHTML = `
			  .youWinPanda {
                  animation: moveSquare2 3s;
                  z-index: 1;
                  animation-fill-mode: both;
				  left: -500px;
				  visibility: visible;
                }
                @keyframes moveSquare2 {
                    from {top: 70px;}
                    to {left:  -50px;}
                 }				 
	          `;
			  document.head.appendChild(stylePanda);
			  let timeOUT = 0;
	          timeOUT = setTimeout(() => { spongeBtn(); } ,2500);
	 }
	 
	 function youLose() {
		  console.log ("you lose");
              if (!picFlag) { picFlag = 1; }
			  else { picFlag = 0 };
			  if (picFlag) { 
			     $$(".stuFace1").style.visibility = "hidden"; 
			     $$(".stuFace2").style.visibility = "visible";
				 Yuzu = 1; Anz = 0;
				 }
			  else { 
			     $$(".stuFace1").style.visibility = "visible";
			     $$(".stuFace2").style.visibility = "hidden";
				 Yuzu = 0; Anz = 1;
				 }
			hDoh.play();
            userValId.value = "";
			userValId.focus(); 
	 }
		 
     function spongeBtn() {
		$$("#spongeBtn").style.visibility = "visible";
     }
		 
     function loadHandler()
     { 
		   assetsLoaded++;
		   //Remove the load handlers
			
		   if (assetsLoaded === assetsToLoad.length -1  )
			   {		 
				//Remove the load event listeners
				hDoh.removeEventListener("canplaythrough", loadHandler, false);
				hDoh.removeEventListener("canplaythrough", loadHandler, false);
			   }
	   }

 }  
());

 