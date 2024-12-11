let timer;
let startTime;
let isGreen = false;

document.getElementById('start-button').addEventListener('click', startTrafficLight);

function startTrafficLight() {
    resetTrafficLight();
    turnOnRedRows();
}

function resetTrafficLight() {
    clearTimeout(timer);
    document.querySelectorAll('.light').forEach(light => {
        light.style.opacity = '0.3'; // Spegne tutte le luci
    });
    document.getElementById('result').textContent = '';
    isGreen = false;
}

function turnOnRedRows() {
    let delay = 0; // ritardo iniziale
    for (let i = 1; i <= 4; i++) { // ciclo per 4 righe
        delay += Math.floor(Math.random() * 1000) + 500; // random timer tra 5s e 1,5s
        setTimeout(() => {
            // accende tutte le luci rosse della riga 
            document.querySelectorAll(`.row-${i} .red`).forEach(light => {
                light.style.opacity = '1';
            });
        }, delay);
    }
    let greenDelay = Math.floor(Math.random() * 4000) + 1000; // Ritardo casuale tra 1s e 5s
    setTimeout(turnOnGreenLights, delay + greenDelay); // Ritardo totale per accendere le luci verdi
}

function turnOnGreenLights() {
    // accende tutte le luci verdi
    document.querySelectorAll('.green').forEach(light => {
        light.style.opacity = '1';
    });
}


document.querySelectorAll('.green').forEach(greenLight => {
    greenLight.addEventListener('click', function () {
        if (isGreen) {
            const reactionTime = (Date.now() - startTime) / 1000; // tempo di reazione in secondi
            document.getElementById('result').textContent = `Reaction time: ${reactionTime.toFixed(3)} seconds`;
            resetTrafficLight();
        } else {
            document.getElementById('result').textContent = 'False start!';
            resetTrafficLight();
        }
    });
});
