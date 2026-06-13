//***********************************************************************************
//STAGE - 1 , Bicycle Animation
//***********************************************************************************
let outputA = document.getElementById('ShowBicycle') as HTMLFormElement;

//***********************************************************************************
//STAGE - 2 , Pacman Animation
//***********************************************************************************
let outputB = document.getElementById('ShowPacman') as HTMLFormElement;

//***********************************************************************************
//STAGE - 1 , Bicycle Animation
//***********************************************************************************
let html = "";
let htmlResult ="";
let pathToImages:string  = "./product/";
let path:string = "";
let animationIsUnderway = false;
let bicycleAnimationIsUnderway = false;
let totalImages = 34;
let globalImageIndex = 1;

//like with setInterval(), 
//we will need an animation handler variable
let bicycleAnimation: number | undefined;
let imageIndex=0;
let bicycleMoveLeft = false;
let bicycleMoveRight = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let pauseAnimation = false;

path=getBikeImages(globalImageIndex);

html="";
html += 
`<li><img id= "product-image-1" src="${path}" 
class="article-image-list-overview"
	alt="${path}"/></li>
    <div class="demo-box-col demo-box-col-02">
        <h3></h3>
        <button id="btn-start-animation-demo-01" name = "start-animation-demo-01">Spain</button>
        <button id="btn-reverse-animation-demo-01" name = "reverse-animation-demo-01">Reverse Spain</button>
        <button id="btn-stop-animation-demo-01" name = "stop-animation-demo-01">Stop</button>
    </div>
`;

outputA.innerHTML += html;

// Select all the radio buttons and attach the listener
const startButtons = outputA.querySelectorAll<HTMLInputElement>('button[name="start-animation-demo-01"]');
const reverseButtons = outputA.querySelectorAll<HTMLInputElement>('button[name="reverse-animation-demo-01"]');
const stopButtons = outputA.querySelectorAll<HTMLInputElement>('button[name="stop-animation-demo-01"]');
let timeoutHandler: ReturnType<typeof setTimeout> | undefined; //no value 
let timeOut = 1000*60; //1*10 second
let intervalHandler: ReturnType<typeof setInterval> | undefined; //no value 
const delayMilliseconds = 1000*1; 


//user clicks the start button...
startButtons.forEach(button => {
    button.addEventListener('click', function(){

        console.log("Start button clicked");
        bicycleMoveRight = true;
        bicycleMoveLeft = false;
        if (!bicycleAnimationIsUnderway) {
            bicycleAnimationIsUnderway = true;

            //begin the animation using the animation handler
            //  myHandler = requestAnimationFrame( functionName )
            //this initiates a single call to the function reference
            bicycleAnimation = requestAnimationFrame(bicycleAnimatePacMan);
        }

    });
});


//user clicks the start button...
reverseButtons.forEach(button => {
    button.addEventListener('click', function(){

        console.log("Reverse button clicked");
        bicycleMoveRight =false;
        bicycleMoveLeft = true;

        if (!bicycleAnimationIsUnderway) {
            bicycleAnimationIsUnderway = true;

            //begin the animation using the animation handler
            //  myHandler = requestAnimationFrame( functionName )
            //this initiates a single call to the function reference
            bicycleAnimation = requestAnimationFrame(bicycleAnimatePacMan);
        }

    });
});


//user clicks the stop button...
stopButtons.forEach(button => {
    button.addEventListener('click', function(){

        //script could now stop the timer...
        clearTimeout(timeoutHandler);
        //to clear an interval (stop it running)
        //use the interval handler with clearInterval()
        clearInterval(intervalHandler);

        console.log("Stop button clicked");
        //stop an animation using the animation handler
        //  cancelAnimationFrame(myHandler);
        if (typeof bicycleAnimation === 'number') {
            cancelAnimationFrame(bicycleAnimation);
        bicycleAnimation = undefined;
    }
    bicycleAnimationIsUnderway = false;

    });

});


//the function that is called with 
//each new frame of the animation
function bicycleAnimatePacMan(){

    //apply handler when invoking timer code
    timeoutHandler = setTimeout( function(){}, timeOut);
    //start an interval,
    //run the function with each interval
    intervalHandler = setInterval( function(){}, delayMilliseconds );

    const productImage1 = document.getElementById('product-image-1') as HTMLImageElement | null;
    let path:string ="";
  
    if (!outputA) {
        return;
    }

    if(bicycleMoveRight === true){
        console.log("bicycleAnimatePacMan called - moving right");
        imageIndex++
        path=getBikeImages(imageIndex);
        console.log("path: " + path);
        if (productImage1) productImage1.src = path;
        if(imageIndex >= totalImages){
            imageIndex=0;
        }
    }

    if(bicycleMoveLeft === true){
        console.log("bicycleAnimatePacMan called - moving left");
        imageIndex--
        path=getBikeImages(imageIndex);
        console.log("path: " + path);
        if (productImage1) productImage1.src = path;
        if(imageIndex <= 0){
            imageIndex=totalImages;
        }
    }
    //request the next frame in the animation
    bicycleAnimation = requestAnimationFrame(bicycleAnimatePacMan);
}

//***********************************************************************************
//STAGE - 2 , Pacman Animation
//***********************************************************************************
const pacManStaticSrc   = './images/pac-man-static.gif';
const pacManMoveSrc     = './images/pac-man-fast.gif';
const pacManMoveFastSrc     = './images/pac-man-fast.gif';
const pacManMoveSlowSrc     = './images/pac-man-slow.gif';
let pacManAnimation: number | undefined;
//track the status of the animation
let horizontalPosition = 0;
let verticalPosition = 0;
let maxHorizontalPosition = 90;
let maxVerticalPosition = 90;

html = "";
html += 
`<div class="demo-box request-animation-frame-demo request-animation-frame-demo-01">

    <div class="demo-box-col demo-box-col-01">
      <div class="pac-man-container">
        <img src="${pacManStaticSrc}" alt="Pac Man" id="pac-man" class="pac-man">
      </div>
    </div>
    <div class="demo-box-col demo-box-col-02">
        <h3></h3>
        <button id="btn-up" name = "btn-up">W</button>
        <button id="btn-left" name = "btn-left">A</button>
        <button id="btn-right" name = "btn-right">D</button>
        <button id="btn-down" name = "btn-down">S</button>
        <button id="btn-pause" name = "btn-pause">X</button>
    </div>
</div>
`;

outputB.innerHTML += html;

const upButtons = outputB.querySelectorAll<HTMLInputElement>('button[name="btn-up"]');
const leftButtons = outputB.querySelectorAll<HTMLInputElement>('button[name="btn-left"]');
const rightButtons = outputB.querySelectorAll<HTMLInputElement>('button[name="btn-right"]');
const downButtons = outputB.querySelectorAll<HTMLInputElement>('button[name="btn-down"]');
const pauseButtons = outputB.querySelectorAll<HTMLInputElement>('button[name="btn-pause"]');
const pacManImageInHTML = document.getElementById('pac-man')  as HTMLImageElement | null;

leftButtons.forEach(button => {
    button.addEventListener('click', function(){
 
        console.log("left button clicked");
       
        moveLeft = true;
        moveRight = false;
        moveUp = false;
        moveDown = false;
        pauseAnimation = false;
        
        if (!animationIsUnderway) {
            animationIsUnderway = true;

            if (pacManImageInHTML) {
                pacManImageInHTML.src = pacManMoveSrc;
            }


            //begin the animation using the animation handler
            //  myHandler = requestAnimationFrame( functionName )
            //this initiates a single call to the function reference
            pacManAnimation = requestAnimationFrame(AnimatePacMan);
        }

    });
});

rightButtons.forEach(button => {
    button.addEventListener('click', function(){

        console.log("right button clicked");

        moveLeft = false;
        moveRight = true;
        moveUp = false;
        moveDown = false;
        pauseAnimation = false;

        if (!animationIsUnderway) {
            animationIsUnderway = true;

            if (pacManImageInHTML) {
                pacManImageInHTML.src = pacManMoveSrc;
            }

            //begin the animation using the animation handler
            //  myHandler = requestAnimationFrame( functionName )
            //this initiates a single call to the function reference
            pacManAnimation = requestAnimationFrame(AnimatePacMan);
        }

    });
});


//user clicks the start button...
upButtons.forEach(button => {
    button.addEventListener('click', function(){

        console.log("up button clicked");

        moveLeft = false;
        moveRight = false;
        moveUp = true;
        moveDown = false;
        pauseAnimation = false;

        if (!animationIsUnderway) {
            animationIsUnderway = true;

            if (pacManImageInHTML) {
                pacManImageInHTML.src = pacManMoveSrc;
            }

            //begin the animation using the animation handler
            //  myHandler = requestAnimationFrame( functionName )
            //this initiates a single call to the function reference
            pacManAnimation = requestAnimationFrame(AnimatePacMan);
        }

    });
});

downButtons.forEach(button => {
    button.addEventListener('click', function(){

        console.log("down button clicked");

        moveLeft = false;
        moveRight = false;
        moveUp = false;
        moveDown = true;
        pauseAnimation = false;

        if (!animationIsUnderway) {
            animationIsUnderway = true;

            if (pacManImageInHTML) {
                pacManImageInHTML.src = pacManMoveSrc;
            }

            //begin the animation using the animation handler
            //  myHandler = requestAnimationFrame( functionName )
            //this initiates a single call to the function reference
            pacManAnimation = requestAnimationFrame(AnimatePacMan);
        }

    });
});

//user clicks the stop button...
pauseButtons.forEach(button => {
    button.addEventListener('click', function(){

        console.log("pause button clicked");

        moveLeft = false;
        moveRight = false;
        moveUp = false;
        moveDown = false;
        pauseAnimation = true;

        //script could now stop the timer...
        //clearTimeout(timeoutHandler);
        //to clear an interval (stop it running)
        //use the interval handler with clearInterval()
        //clearInterval(intervalHandler);

        //stop an animation using the animation handler
        //  cancelAnimationFrame(myHandler);
        if (typeof pacManAnimation === 'number') {
            cancelAnimationFrame(pacManAnimation);
        pacManAnimation = undefined;

        if (pacManImageInHTML) {
                pacManImageInHTML.src = pacManStaticSrc;
        }

    }

    animationIsUnderway = false;

    });

});

//the function that is called with 
//each new frame of the animation
function AnimatePacMan(){

    //apply handler when invoking timer code
    //timeoutHandler = setTimeout( function(){}, timeOut);
    //start an interval,
    //run the function with each interval
    //intervalHandler = setInterval( function(){}, delayMilliseconds );

    if (!pacManImageInHTML) {
        return;
    }

    if(moveRight === true){
        console.log("animatePacMan called - moving right");
        horizontalPosition++
        if (pacManImageInHTML) pacManImageInHTML.style.transform = 'scaleX(1)';
        if(horizontalPosition >=maxHorizontalPosition){
            moveRight = false;
            moveLeft = true;
            if (pacManImageInHTML) pacManImageInHTML.style.transform = 'scaleX(-1)';
        }
    }

    if(moveLeft === true){
        console.log("animatePacMan called - moving left");
        horizontalPosition--

        if (pacManImageInHTML) pacManImageInHTML.style.transform = 'scaleX(-1)';
        if(horizontalPosition <= 0){
            moveLeft = false;
            moveRight = true;
            if (pacManImageInHTML) pacManImageInHTML.style.transform = 'scaleX(1)';
        }
    }

    if(moveDown== true){

        console.log("animatePacMan called - moving down");
        verticalPosition++
        /*
        The following code is obtained from Google Gemini
        The query to obtain the code from Google Gemini is:
        Q: we have a pacmanimage face right when it move to the right when running the code below. 
        how do we turn the image face up when the image is moving up in the java script? 
        "if (pacManImageInHTML) pacManImageInHTML.style.transform = 'scaleX(-1)';"
        ----------------------------------------------------------------------------------------------------
        */
        if (pacManImageInHTML) pacManImageInHTML.style.transform = 'rotate(90deg)';
        /* ---------------------------------------------------------------------------------------------------*/

        if(verticalPosition >=maxVerticalPosition){
            //position=1;
            moveUp = true;
            moveDown = false;
            if (pacManImageInHTML) pacManImageInHTML.style.transform = 'rotate(-90deg)';
        }
    }

    if(moveUp== true){
        
        console.log("animatePacMan called - moving up");
        verticalPosition--
        /*
        The following code is obtained from Google Gemini
        The query to obtain the code from Google Gemini is:
        Q: we have a pacmanimage face right when it move to the right when running the code below. 
        how do we turn the image face up when the image is moving up in the java script? 
        "if (pacManImageInHTML) pacManImageInHTML.style.transform = 'scaleX(-1)';"
        ----------------------------------------------------------------------------------------------------
        */
        if (pacManImageInHTML) pacManImageInHTML.style.transform = 'rotate(-90deg)';
        /* ---------------------------------------------------------------------------------------------------*/

        if(verticalPosition <= 0){
            moveDown = true;
            moveUp = false;
            if (pacManImageInHTML) pacManImageInHTML.style.transform = 'rotate(90deg)';
        }
    }

    if(pauseAnimation=== true){
        console.log("pauseAnimation called - stop moving");
        if (pacManImageInHTML) pacManImageInHTML.src = pacManStaticSrc;
    }

    if (pacManImageInHTML) {
        pacManImageInHTML.style.left = `${horizontalPosition}%`;
        pacManImageInHTML.style.top = `${verticalPosition}%`;
    }

    //request the next frame in the animation
    pacManAnimation = requestAnimationFrame(AnimatePacMan);

}

/*
The following code is obtained from Google Gemini
The query to obtain the code from Google Gemini is:
Q: in javascript, how do we capture the key pressed event like "D", "W", "A", "S" and "X", 
and add the event listener for the key mentioned above?
----------------------------------------------------------------------------------------------------
*/

window.addEventListener('keydown', (event) => {
  
  // 2. Convert the key to uppercase to handle both 'w' and 'W'
  const keyPressed = event.key.toUpperCase();
  let isValidKey = ['W', 'A', 'S', 'D', 'X'].includes(keyPressed);
  let isValidStopKey = ['X'].includes(keyPressed);

  if (!isValidKey) {
    return; // Ignore keys that are not W, A, S, D, or X
  }

  if (isValidKey) {
    moveLeft = false;
    moveRight = false;
    moveUp = false;
    moveDown = false;
    pauseAnimation = false;
  }
  // 3. Use a switch statement or if/else to handle the specific keys
  switch (keyPressed) {
    case 'W':
        console.log('Moving Up (W)');
        moveUp = true;
        break;
    case 'A':
        console.log('Moving Left (A)');
        moveLeft = true;
          break;
    case 'S':
        console.log('Moving Down (S)');
        moveDown = true;
        break;
    case 'D':
       console.log('Moving Right (D)');
        moveRight = true;
        break;
    case 'X':
        console.log('Action / Stop (X)');
        pauseAnimation = true;
        isValidStopKey= true;
        break;
    default:
        // A key was pressed, but not one we care about
        //break;
  }

    if (isValidKey) {
   
        if (!animationIsUnderway) {
            animationIsUnderway = true;

            if (pacManImageInHTML) {
                pacManImageInHTML.src = pacManMoveSrc;
            }

            //begin the animation using the animation handler
            //  myHandler = requestAnimationFrame( functionName )
            //this initiates a single call to the function reference
            pacManAnimation = requestAnimationFrame(AnimatePacMan);
        }

    }

  if (isValidStopKey) {

    if (typeof pacManAnimation === 'number') {
        cancelAnimationFrame(pacManAnimation);
        pacManAnimation = undefined;
    }

    if (pacManImageInHTML) {
        pacManImageInHTML.src = pacManStaticSrc;
    }   
    //return; // Stop further processing if it's a stop key
}



});

/* ----------------------------------------------------------------------------------------------------*/

function getBikeImages(index:number):string {

	let path1:string = "bike-";
	let path2:string = index.toString()
	let path3:string = ".jpg";
	return pathToImages+path1+path2+path3;
}

