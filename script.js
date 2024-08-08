//Se obtienen los elementos del DOM que se usarán
const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;
//Se definen las partes del cuerpo del dibujo
const bodyParts = [
    [4,2,1,1], //Cabeza
    [4,3,1,2], //Cuerpo
    [3,5,1,1], //Pierna izquierda
    [5,5,1,1], //Pierna derecha
    [3,3,1,1], //Brazo izquierdo
    [5,3,1,1], //Brazo derecho
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;
//Se añade una letra a la lista de letras usadas
const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}
//Se dibuja una parte del cuerpo del ahorcado
const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};
//Maneja una letra incorrecta
const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame();
}
//Se finaliza el juego
const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
}
// Maneja una letra correcta
const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGame();
}
//Se procesa la entrada de una letra
const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};
//Evento de teclado para capturar la entrada del jugado
const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};
//Se dibuja la palabra seleccionada con letras ocultas
const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};
//Se selecciona una palabra aleatoria de la lista
const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};
//Se dibuja la estructura del ahoracado
const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d99439';
    ctx.fillRect(0, 7, 4, 1); //Base
    ctx.fillRect(1, 0, 1, 8); //Poste
    ctx.fillRect(2, 0, 3, 1); //Brazo superior
    ctx.fillRect(4, 1, 1, 1); //Cuerda
};
//Se inicia el juego
const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
    
};
//Se agrega un evento al boton de inicio para que comienze el juego
startButton.addEventListener('click', startGame);

let startTime, endTime;

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
    startTime = new Date(); // Empieza el tiempo
};

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
    endTime = new Date(); // Termina el tiempo
    const tiempo = Math.floor((endTime - startTime) / 1000);
    const puntos = hits * 10 - mistakes * 5; // Ajusta la fórmula de puntuación como desees
    saveScore(tiempo, puntos); // Guarda la puntuación
};
