const RED_COLOR_OPTION = "red-button";
const GREEN_COLOR_OPTION = "green-button";
const BLUE_COLOR_OPTION = "blue-button";
const YELLOW_COLOR_OPTION = "yellow-button";

const COLOR_OPTIONS_ARRAY = [
    RED_COLOR_OPTION, 
    GREEN_COLOR_OPTION, 
    BLUE_COLOR_OPTION, 
    YELLOW_COLOR_OPTION
];

let ARRAY_COLOR_STEPS_LIMIT = 2;

let colorArray = [];
let userSteps = 0;
let userCanPlay = false;

//Funciones que ejecuten los distintos mecanismos que necesitamos
async function startGame(){
   await makeRandomColorArray();
   await showToUserColorArray();
}

function continueGame(){
    userSteps = 0;
    userCanPlay = false;
    hideFeedback();
    ARRAY_COLOR_STEPS_LIMIT = ARRAY_COLOR_STEPS_LIMIT+1;
    startGame();
}

function restartGame(){
    userSteps = 0;
    userCanPlay = false;
    hideFeedback();
    ARRAY_COLOR_STEPS_LIMIT = 2;
    startGame();
}

//Crea el array de colores aleatorios
function makeRandomColorArray(){
    colorArray = [];
    for(let i = 0; i < ARRAY_COLOR_STEPS_LIMIT; i++){
        const colorNumber = Math.floor(Math.random() * 4);
        const colorSelected = COLOR_OPTIONS_ARRAY[colorNumber];
        colorArray.push(colorSelected);
    }
}

function showToUserColorArray(){
    const fullopacityClass = 'fullopacity';
    const gameControlsElementId = "game-controls-element";
    const gameControlsElement = document.getElementById(gameControlsElementId);

    for(let i = 0; i < colorArray.length; i++){
        const callback= () => {
            //hago destello en el elto actual
            const elementID = colorArray[i];
            const elementSelected = document.getElementById(elementID);
            elementSelected.classList.add(fullopacityClass);
            //al elto que ilumino, lo apago en 1 segundo
            setTimeout(() => {
                elementSelected.classList.remove(fullopacityClass);
            
                if(i === colorArray.length-1){
                    showYourTurn();
                    userCanPlay = true;
                    gameControlsElement.style.pointerEvents = "all";
                }
            }, 1000);
        }
        const time = i * 2000; //1 segundo entre cada elto
        setTimeout(callback, time);
    }
}

function checkUserStep(elementId){
    if(colorArray[userSteps] === elementId){
        if(userSteps < colorArray.length-1){
            showCanContinueFeedback();
        }
        else{
            showSuccessFeedback();
            setGameToContinue();
        }
        userSteps++;
    }
    else{
        //falló
        showErrorFeedback();
        setGameToRestart();
    }
}

function hideFeedback(){
    const MESSAGE_TO_USER_ELEMENT_ID = "message-to-user";
    const messageToUserElement = document.getElementById(MESSAGE_TO_USER_ELEMENT_ID);

    messageToUserElement.textContent = "";
}

function showYourTurn(){
    const MESSAGE_TO_USER_ELEMENT_ID = "message-to-user";
    const messageToUserElement = document.getElementById(MESSAGE_TO_USER_ELEMENT_ID);

    messageToUserElement.textContent = "Tu turno";
}

function showSuccessFeedback(){
    const MESSAGE_TO_USER_ELEMENT_ID = "message-to-user";
    const messageToUserElement = document.getElementById(MESSAGE_TO_USER_ELEMENT_ID);

    messageToUserElement.textContent = "Ganaste";
}

function showCanContinueFeedback(){
    const MESSAGE_TO_USER_ELEMENT_ID = "message-to-user";
    const messageToUserElement = document.getElementById(MESSAGE_TO_USER_ELEMENT_ID);

    messageToUserElement.textContent = "Correcto, podés continuar ...";
}

function showErrorFeedback(){
    const MESSAGE_TO_USER_ELEMENT_ID = "message-to-user";
    const messageToUserElement = document.getElementById(MESSAGE_TO_USER_ELEMENT_ID);

    messageToUserElement.textContent = "Perdiste";
}

function setGameToRestart(){
    const gameControlsElementId = "game-controls-element";
    const startGameButtonElementId = "start-game";

    const startGameButtonElement = document.getElementById(startGameButtonElementId);
    const gameControlsElement = document.getElementById(gameControlsElementId);

    gameControlsElement.style.pointerEvents = "none";
    showElement(startGameButtonElement);
    startGameButtonElement.textContent = "Reiniciar";
    
    startGameButtonElement.onclick = function() {
        restartGame();
    }
}

function setGameToContinue(){
    const gameControlsElementId = "game-controls-element";
    const startGameButtonElementId = "start-game";

    const startGameButtonElement = document.getElementById(startGameButtonElementId);
    const gameControlsElement = document.getElementById(gameControlsElementId);

    gameControlsElement.style.pointerEvents = "none";
    showElement(startGameButtonElement);
    startGameButtonElement.textContent = "Siguiente nivel";
    
    startGameButtonElement.onclick = function() {
        continueGame();
    }
}

function showElement(element){
    element.style.display="block";
}

function hideElement(element){
    element.style.display="none";
}

function activateClickedStyles(element){
    const CLICKED_CLASS = 'clicked';
    element.classList.add(CLICKED_CLASS);
    setTimeout(() => {
        element.classList.remove(CLICKED_CLASS);
    }, 1000);
}

function setColorButtonEventListeners(){
    for(let i = 0; i < COLOR_OPTIONS_ARRAY.length; i++){
        const buttonElementId = COLOR_OPTIONS_ARRAY[i];
        const colorElement = document.getElementById(buttonElementId);
        colorElement.addEventListener('click', () => {
            if(userCanPlay){
                checkUserStep(buttonElementId);
                activateClickedStyles(colorElement);
            }
            else{
                console.log("El usuario aún no puede jugar");
            }
        })
    }
}

//funcion sonido al boton comenzar
/*function startSound(){
    let boton = document.getElementById("start-game")

    boton.addEventListener("click", () => {
      let etiquetaAudio = document.createElement("audio")
      etiquetaAudio.setAttribute("src", "./boing.mp3")
      etiquetaAudio.play()
    })
}*/

//funcion para reproducir sonido
function showToUserColorArraySound(){
}

function main(){
    const startGameButton = document.getElementById('start-game');
    startGameButton.style.pointerEvents = "all";
    startGameButton.addEventListener('click', () => {
        startGame();
        //ocultamos el boton de start
        hideElement(startGameButton);
    })
    //Definir eventos para escuchar las interacciones del user
    setColorButtonEventListeners();
    
}

main();