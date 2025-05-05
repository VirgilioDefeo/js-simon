const numberContainer = document.getElementById('number-container');
const timerElement = document.getElementById('timer');
const inputContainer = document.getElementById('input-container');
const submitBtn = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');

let randomNumbers = [];

// Genera 5 numeri casuali tra 1 e 99
function generateNumbers() {
  while (randomNumbers.length < 5) {
    const n = Math.floor(Math.random() * 99) + 1;
    if (!randomNumbers.includes(n)) {
      randomNumbers.push(n);
    }
  }
  numberContainer.innerHTML = randomNumbers.map(n => `<span class="number">${n}</span>`).join('');
}

function startTimer(seconds) {
  let remaining = seconds;
  timerElement.textContent = `Tempo rimanente: ${remaining}s`;
  const interval = setInterval(() => {
    remaining--;
    timerElement.textContent = `Tempo rimanente: ${remaining}s`;
    if (remaining <= 0) {
      clearInterval(interval);
      hideNumbersAndShowInputs();
    }
  }, 1000);
}

function hideNumbersAndShowInputs() {
  numberContainer.classList.add('hidden');
  timerElement.classList.add('hidden');
  inputContainer.classList.remove('hidden');
  submitBtn.classList.remove('hidden');

  for (let i = 0; i < 5; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Numero ${i + 1}`;
    inputContainer.appendChild(input);
  }
}

function validateInputs(inputs) {
    let isValid = true;
  
    inputs.forEach(input => {
      const value = input.value.trim();
      const number = Number(value);
  
      // Verifica se è un numero intero positivo e non NaN
      if (!Number.isInteger(number) || number < 0) {
        input.classList.add('invalid');
        isValid = false;
      } else {
        input.classList.remove('invalid');
      }
    });
  
    return isValid;
  }
  
submitBtn.addEventListener('click', () => {
  const inputs = Array.from(inputContainer.querySelectorAll('input'));
  const isValid = validateInputs(inputs);
  if (!isValid) {
    resultElement.textContent = 'Per favore inserisci solo numeri validi.';
    return;
  }

  const guessedNumbers = inputs.map(i => parseInt(i.value));
  const correct = guessedNumbers.filter(n => randomNumbers.includes(n));
  const uniqueCorrect = [...new Set(correct)];

  resultElement.textContent = `Hai indovinato ${uniqueCorrect.length} numeri: ${uniqueCorrect.join(', ')}`;
  submitBtn.disabled = true;
});

// Avvio
generateNumbers();
startTimer(30);