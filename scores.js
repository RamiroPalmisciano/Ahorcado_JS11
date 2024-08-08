const showScoresButton = document.getElementById('showScoresButton');
const scoresContainer = document.getElementById('scoresContainer');
const playerNameInput = document.getElementById('playerName');

showScoresButton.addEventListener('click', showScores);

async function showScores() {
    const response = await fetch('http://localhost:3000/getscores');
    const scores = await response.json();
    scoresContainer.innerHTML = '<h2>Tabla de Posiciones</h2>';
    scores.forEach(score => {
        scoresContainer.innerHTML += `<p>${score.nombre}: ${score.puntos} puntos, ${score.tiempo} segundos, ${score.fecha}</p>`;
    });
}

async function saveScore(tiempo, puntos) {
    const nombre = playerNameInput.value || 'Anonimo';
    const response = await fetch('http://localhost:3000/addscore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tiempo, puntos, nombre })
    });
    const data = await response.text();
    console.log(data);
}
