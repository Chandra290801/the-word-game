// Set up the word of the day and Amazon gift card code
const words = ['apple', 'banana', 'car', 'dog', 'elephant', 'fish', 'grape', 'hat'];
const winningWord = words[Math.floor(Math.random() * words.length)];
const amazonGiftCardCode = 'AMZ-GIFT-12345';  // Replace this with your actual gift card code

// Time settings (4:00 PM to 9:00 PM)
const gameStartTime = 16;  // Game starts at 16:00 (4:00 PM)
const gameEndTime = 24;    // Game ends at 24:00 (12:00 AM)

// Cuss words array
const cussWords = ["Damn!", "Hell!", "Crap!", "Freak!", "Blast it!"];

// Elements from HTML
const clue = document.getElementById('clue');
const guessBtn = document.getElementById('guess-btn');
const result = document.getElementById('result');
const wordInput = document.getElementById('word-input');
const rewardSection = document.getElementById('reward');
const giftCardCodeElement = document.getElementById('gift-card-code');
const timingMessage = document.getElementById('timing-message');
const clock = document.getElementById('clock');
const gameBody = document.getElementById('game-body');

// Function to update the real-time clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `Current Time: ${hours}:${minutes}:${seconds}`;
    
    // Check if it's game time (between 4:00 PM and 9:00 PM)
    checkGameTime(now);
}

// Function to check if the current time is within the allowed game time
function checkGameTime(now) {
    const currentHour = now.getHours();

    // If it's game time, enable the input field and button
    if (currentHour >= gameStartTime && currentHour < gameEndTime) {
        wordInput.disabled = false;
        guessBtn.disabled = false;
        clue.textContent = `Clue: The word has ${winningWord.length} letters.`;
        timingMessage.textContent = '';  // Clear any timing message
    } else {
        wordInput.disabled = true;
        guessBtn.disabled = true;
        timingMessage.textContent = "Sorry, the game can only be played between 4:00 PM and 12:00 AM.";
    }
}

// Initialize the clock and check game time every second
setInterval(updateClock, 1000);

// Function to flash red background
function flashRed() {
    gameBody.classList.add('wrong-guess');
    setTimeout(() => {
        gameBody.classList.remove('wrong-guess');
    }, 500);  // Remove the red background after 0.5 seconds
}

// Function to speak a cuss word using the Web Speech API
function speakCussWord() {
    const randomCuss = cussWords[Math.floor(Math.random() * cussWords.length)];
    const utterance = new SpeechSynthesisUtterance(randomCuss);
    window.speechSynthesis.speak(utterance);
}

// Event listener for guess button
guessBtn.addEventListener('click', function () {
    const input = wordInput.value.trim().toLowerCase();

    if (input === '') return;  // Ignore empty input

    if (input === winningWord) {
        result.textContent = `Congratulations! '${input}' is the correct word. You won the game!`;
        result.style.color = 'green';
        wordInput.disabled = true;
        guessBtn.disabled = true;

        // Show the reward section with the Amazon gift card code
        rewardSection.style.display = 'block';
        giftCardCodeElement.textContent = amazonGiftCardCode;
    } else {
        result.textContent = `'${input}' is not the correct word. Keep trying!`;
        result.style.color = 'red';

        // Flash red screen and utter a cuss word
        flashRed();
        speakCussWord();
    }

    // Clear input field for the next guess
    wordInput.value = '';
});
